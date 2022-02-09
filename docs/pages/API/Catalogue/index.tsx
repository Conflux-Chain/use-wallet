import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import './index.css';

const ApiDocs: React.FC = () => {
    const { pathname } = useLocation();
    const currentCatalogue = pathname.split('/')[2] || 'basic';

    return (
        <div className={"docs py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"}>
            <h2 className='capitalize text-center'>{currentCatalogue}</h2>
            <Outlet />
        </div>
    );
}

export default ApiDocs;