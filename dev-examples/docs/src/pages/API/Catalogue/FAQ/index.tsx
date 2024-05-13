import React from 'react';
import FluentHostMetaMask from './FluentHostMetaMask';
import FluentAndMetaMask from './FluentAndMetaMask';
import OnlyFluent from './OnlyFluent';

const FAQ: React.FC = () => {
    return (
        <>
            <FluentHostMetaMask />
            <FluentAndMetaMask />
            <OnlyFluent />
        </>
    );
};

export default FAQ;
