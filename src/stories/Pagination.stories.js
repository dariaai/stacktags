import React, { useContext, useEffect } from 'react';
import { TagContext } from '../providers/TagsProvider';
import TagsProvider from '../providers/TagsProvider';
import TagsTable from '../components/TagsTable';

export default {
    title: 'Components/HomePage/Pagination',
    component: TagsTable,
};

const ChangePagination = () => {
    const { setPagination } = useContext(TagContext);

    useEffect(() => {
        setPagination(2);
    }, []);

    return (
        <TagsTable />
    );
};

export const Pagination = () => (
    <TagsProvider>
        <ChangePagination />
    </TagsProvider>
);

