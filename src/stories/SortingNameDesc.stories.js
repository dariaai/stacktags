import React, { useContext, useEffect } from 'react';
import { TagContext } from '../providers/TagsProvider';
import TagsProvider from '../providers/TagsProvider';
import TagsTable from '../components/TagsTable';

export default {
    title: 'Components/HomePage/Sorting',
    component: TagsTable,
};

const SortByNameDescending = () => {
    const { handleSort } = useContext(TagContext);

    useEffect(() => {
        handleSort('name', 'desc');
    }, []);

    return (
        <TagsTable />
    );
};

export const SortingNameDescending = () => (
    <TagsProvider>
        <SortByNameDescending />
    </TagsProvider>
);

