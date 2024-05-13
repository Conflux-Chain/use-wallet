import React from 'react';
import CompleteDetect from './CompleteDetectApi';
import Provider from './ProviderApi';

const Others: React.FC = () => {
    return (
        <>
            <CompleteDetect />
            <Provider />
        </>
    );
}

export default Others;