import { createContext, useState } from 'react';
import axios from "axios";

export const TagContext = createContext(null);

const TagsProvider = ({ children }) => {

    const [tags, setTags] = useState([]);
    const [sortBy, setSortBy] = useState({
        column: 'Name',
        direction: 'asc'
    });
    const [rows, setRows] = useState(5);
    const [pagination, setPagination] = useState(1);
    const [maxCount, setMaxCount] = useState(5);
    const [loading, setLoading] = useState(false);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.stackexchange.com/2.3/tags?page=${pagination}&pagesize=${rows}&site=stackoverflow`);
            const maxPaginationResponse = await axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=!HUWWJ)6LYhiHX71CO`)

            setTags(response.data.items);
            setMaxCount(Math.floor(maxPaginationResponse.data.total / rows));
        } catch (error) {
            alert(`Somerthing went wrong: ${error.response.data.error_message}`);
        } finally {
            setLoading(false);
        }
    };

    const sortedTags = [...tags].sort((a, b) => {
        if (sortBy.column === 'name') {
            return sortBy.direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
            return sortBy.direction === 'asc' ? a.count - b.count : b.count - a.count;
        }
    });

    const handleSort = (name) => {
        setSortBy({
            column: name,
            direction: sortBy.column === name && sortBy.direction === 'asc' ? 'desc' : 'asc'
        })
    }
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
            sortedTags,
            fetchTags
        }}>
            {children}
        </TagContext.Provider>
    )
}

export default TagsProvider;