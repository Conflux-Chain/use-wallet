import React from 'react';
import BasicUsage from './BasicUsage';
import Function from './Function';
import Hooks from './Hooks';
import Utils from './Utils';
import './index.css';

const ApiDocs: React.FC = () => {
    return (
        <dl className={"docs py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"}>
            <h2>Basic Usage</h2>
            <BasicUsage />

            <h2>Function</h2>
            <Function />

            <h2>Hooks</h2>
            <Hooks />

            <h2>Utils</h2>
            <Utils />
        </dl>
    );
}

export default ApiDocs;