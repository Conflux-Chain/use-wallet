import React from 'react';
import ApiDocs from './Catalogue';
import Menu from './Menu';

const ApiPage: React.FC = () => {
    return (
        <>
            <Menu />
            <ApiDocs />
        </>
    );
};

export default ApiPage;
