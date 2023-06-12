import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `<code>useChainId</code> returns the network ID in the current wallet. <code>useChainID</code> will only have a return value if the wallet is authorized to connect, i.e. status is <code>'active'</code>, otherwise it returns <code>undefined</code>.`,
    },
    zh: {
        step1: `<code>useChainId</code> 返回当前钱包中的网络ID。只有当钱包已授权连接，即 status 为 <code>'active'</code> 时，<code>useChainID</code> 才会有返回值，否则返回 <code>undefined</code>。`,
    },
} as const;

const UseChainId: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>useChainId</h3>
            <h4>declare:</h4>
            <Code language="ts">{code}</Code>
            <h4>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, {}) }} />{' '}
        </section>
    );
};

const code = `declare const useChainId: () => string | undefined;`;

export default UseChainId;
