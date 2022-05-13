import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `useChainId return current networkId in the wallet. useChainId will only return a value if the status is 'active' for an authorized connection.`,
    },
    zh: {
        step1: `useChainId 返回当前钱包中的网络。只有当 status 为 'active' 的已授权连接状态，useChainId 才会有返回值。`,
    },
} as const;

const UseChainId: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>useChainId</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
        </section>
    );
}

const code = `declare const useChainId: () => string | undefined;`

export default UseChainId;