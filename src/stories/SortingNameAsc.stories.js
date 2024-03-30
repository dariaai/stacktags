import React, { useContext, useEffect } from 'react';
import { TagContext } from '../providers/TagsProvider';
import TagsProvider from '../providers/TagsProvider';
import TagsTable from '../components/TagsTable';

export default {
    title: 'Components/HomePage/Sorting',
    component: TagsTable,
};

const SortByNameAscending = () => {
    const { handleSort } = useContext(TagContext);

    useEffect(() => {
        handleSort('name', 'asc');
    }, []);

    return (
        <TagsTable />
    );
};

export const SortingNameAscending = () => (
    <TagsProvider>
        <SortByNameAscending />
    </TagsProvider>
);

