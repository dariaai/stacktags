import { Table, Container, Paper, Box, Pagination, TextField, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, CircularProgress } from "@mui/material"
import { useContext, useEffect } from "react"
import { TagContext } from "../providers/TagsProvider";

const TagsTable = () => {
    const { tags,
        sortBy,
        rows,
        setRows,
        pagination,
        setPagination,
        maxCount,
        loading,
        handleSort } = useContext(TagContext);

    const tableHeaders = {
        firstColumn: 'Name',
        secondColumn: 'Count'
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
                                        onClick={() => handleSort('name', sortBy.direction === 'asc' ? 'desc' : 'asc')}>
                                        {tableHeaders.firstColumn}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy.column === 'popular'}
                                        direction={sortBy.direction}
                                        onClick={() => handleSort('popular', sortBy.direction === 'asc' ? 'desc' : 'asc')}>
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
                                    <Pagination sx={{ width: '100%', marginBottom: 2, marginTop: 2, display: 'flex', justifyContent: 'center' }} count={maxCount} onChange={(e, value) => setPagination(value)} page={pagination} variant="outlined" color="primary" />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container >
        </>
    )
}

export default TagsTable;