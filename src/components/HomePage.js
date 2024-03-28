import { Table, Container, Paper, Box, Pagination, TextField, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, CircularProgress } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"

const HomePage = () => {

    const [tags, setTags] = useState([]);
    const [sortBy, setSortBy] = useState({
        column: 'Name',
        direction: 'asc'
    });
    const [rows, setRows] = useState(5);
    const [pagination, setPagination] = useState(1);
    const [maxCount, setMaxCount] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
        fetchTags();
    }, [rows])

    useEffect(() => {
        const sortedTags = [...tags].sort((a, b) => {
            if (sortBy.column === 'name') {
                return sortBy.direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else {
                return sortBy.direction === 'asc' ? a.count - b.count : b.count - a.count;
            }
        });
        setTags(sortedTags);
    }, [sortBy])

    const handleSort = (name) => {
        setSortBy({
            column: name,
            direction: sortBy.column === name && sortBy.direction === 'asc' ? 'desc' : 'asc'
        })
    }

    return (
        <>
            <Container maxWidth="md" sx={{ marginTop: 5 }}>
                <Box>
                    <TextField
                        id="outlined-basic"
                        label="Rows per page"
                        variant="outlined"
                        type="number"
                        value={rows}
                        onChange={(e) => setRows(e.target.value)}
                        sx={{ marginBottom: 5 }}
                    />
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minHeight: "200px" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy.column === 'name'}
                                        direction={sortBy.direction}
                                        onClick={() => handleSort('name')}>
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy.column === 'count'}
                                        direction={sortBy.direction}
                                        onClick={() => handleSort('count')}>
                                        Count
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={2} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tags.map((tag, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{tag.name}</TableCell>
                                        <TableCell>{tag.count}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Pagination sx={{ width: '100%', marginBottom: 2, marginTop: 2, display: 'flex', justifyContent: 'center' }} count={maxCount} onChange={(e, value) => setPagination(value)} variant="outlined" color="primary" />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </TableContainer>
            </Container >

        </>
    )
}

export default HomePage;