import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `useAccount returns the account currently in the wallet. useAccount will only return a value if the status is 'active' for an authorized connection.`,
    },
    zh: {
        step1: `useAccount 返回当前钱包中的账户。只有当 status 为 'active' 的已授权连接状态，useAccount 才会有返回值。`,
    },
} as const;

const UseAccount: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>useAccount</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
        </section>
    );
}

const code = `declare const useAccount: () => string | undefined;`

export default UseAccount;