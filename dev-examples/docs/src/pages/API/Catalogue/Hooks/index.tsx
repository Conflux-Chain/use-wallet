import React from 'react';
import UseStatus from './UseStatus';
import UseAccount from './UseAccount';
import UseChainId from './UseChainId';
import UseBalance from './UseBalance';

const Hooks: React.FC = () => {
    return (
        <>
            <UseStatus />
            <UseAccount />
            <UseChainId />
            <UseBalance />
        </>
    );
}

export default Hooks;