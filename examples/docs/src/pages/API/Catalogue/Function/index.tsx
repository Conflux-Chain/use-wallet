import React from 'react';
import Connect from './Connect';
import SendTransaction from './SendTransaction';
import AddChain from './AddChain';
import SwitchChain from './SwitchChain';
import WatchAsset from './WatchAsset';
import PersonalSign from './PersonalSign';
import TypedSign from './TypedSign';

const Function: React.FC = () => {
    return (
        <>
            <Connect />
            <SendTransaction />
            <AddChain />
            <SwitchChain />
            <WatchAsset />
            <PersonalSign />
            <TypedSign />
        </>
    );
}

export default Function;