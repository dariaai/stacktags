import React, { useContext, useEffect } from 'react';
import { TagContext } from '../providers/TagsProvider';
import TagsProvider from '../providers/TagsProvider';
import TagsTable from '../components/TagsTable';

export default {
    title: 'Components/HomePage/Sorting',
    component: TagsTable,
};

const SortByCountAscending = () => {
    const { handleSort } = useContext(TagContext);

    useEffect(() => {
        handleSort('popular', 'asc');
        // handleSort('popular');
    }, []);

    return (
        <TagsTable />
    );
};

export const SortingCountAscending = () => (
    <TagsProvider>
        <SortByCountAscending />
    </TagsProvider>
);

