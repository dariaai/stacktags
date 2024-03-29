import { Table, Container, Paper, Box, Pagination, TextField, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, CircularProgress } from "@mui/material"
import { useContext, useEffect } from "react"
import { TagContext } from "./providers/TagsProvider";

const HomePage = () => {
    const { tags,
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
        fetchTags } = useContext(TagContext);

    const tableHeaders = {
        firstColumn: 'Name',
        secondColumn: 'Count'
    }

    useEffect(() => {
        fetchTags()
    }, [rows, pagination]);

    useEffect(() => {
        setTags(sortedTags);
    }, [sortBy])

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
                                        {tableHeaders.firstColumn}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy.column === 'count'}
                                        direction={sortBy.direction}
                                        onClick={() => handleSort('count')}>
                                        {tableHeaders.secondColumn}
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