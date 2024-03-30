import React, { useContext, useEffect } from 'react';
import { TagContext } from '../providers/TagsProvider';
import TagsProvider from '../providers/TagsProvider';
import TagsTable from '../components/TagsTable';

export default {
    title: 'Components/HomePage/RowsInput',
    component: TagsTable,
};

const ChangeRowsInput = () => {
    const { setRows } = useContext(TagContext);

    useEffect(() => {
        setRows(1);
    }, []);

    return (
        <TagsTable />
    );
};

export const RowsInput = () => (
    <TagsProvider>
        <ChangeRowsInput />
    </TagsProvider>
);

