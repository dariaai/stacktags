import React, { useContext, useEffect } from 'react';
import { TagContext } from '../providers/TagsProvider';
import TagsProvider from '../providers/TagsProvider';
import TagsTable from '../components/TagsTable';

export default {
    title: 'Components/HomePage/Sorting',
    component: TagsTable,
};

const SortByCountDescending = () => {
    const { handleSort } = useContext(TagContext);

    useEffect(() => {
        handleSort('popular', 'desc');
    }, []);

    return (
        <TagsTable />
    );
};

export const SortingCountDescending = () => (
    <TagsProvider>
        <SortByCountDescending />
    </TagsProvider>
);

