import React from 'react';
import HomePage from '../components/HomePage';
import TagProvider from '../providers/TagsProvider';

export const Default = () => (
    <TagProvider>
        <HomePage />
    </TagProvider>
);

export default {
    title: 'Components/HomePage',
    component: HomePage,
};
