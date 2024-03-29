import { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const TagContext = createContext(null);

const TagsProvider = ({ children }) => {

    const [tags, setTags] = useState([]);
    const [sortBy, setSortBy] = useState({
        column: 'name',
        direction: 'asc'
    });
    const [rows, setRows] = useState(5);
    const [pagination, setPagination] = useState(1);
    const [maxCount, setMaxCount] = useState(5);
    const [loading, setLoading] = useState(false);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.stackexchange.com/2.3/tags?page=${pagination}&pagesize=${rows}&order=${sortBy.direction}&sort=${sortBy.column}&site=stackoverflow`);
            const maxPaginationResponse = await axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=!HUWWJ)6LYhiHX71CO`)

            setTags(response.data.items);
            setMaxCount(Math.floor(maxPaginationResponse.data.total / rows));
        } catch (error) {
            alert(`Somerthing went wrong: ${error.response.data.error_message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (name) => {
        setSortBy({
            column: name,
            direction: sortBy.column === name && sortBy.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    useEffect(() => {
        fetchTags()
    }, [sortBy]);

    return (
        <TagContext.Provider value={{
            tags,
            setTags,
            sortBy,
            rows,
            setRows,
            pagination,
            setPagination,
            maxCount,
            loading,
            handleSort,
            fetchTags
        }}>
            {children}
        </TagContext.Provider>
    )
}

export default TagsProvider;