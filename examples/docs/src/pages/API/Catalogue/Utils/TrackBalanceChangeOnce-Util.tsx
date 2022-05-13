import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The trackBalanceChangeOnce function tracks the change in the <strong>current</strong> account balance <strong>once</strong>.`,
        step2: `This tool function can be used to simply and inexactly track whether a transaction has been on-chain or not.`,
    },
    zh: {
        step1: `trackBalanceChangeOnce 函数可以跟踪 <strong>一次</strong> <strong>当前账户</strong> 余额的变化。`,
        step2: `这个工具函数可以用来 简单地、不确切 地跟踪一笔交易是否已经达成。`,
    },
} as const;

const TrackBalanceChangeOnce: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>trackBalanceChangeOnce</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }}/>
            <p>{i18n.step2}</p>
        </section>
    );
}

const code = `declare const trackBalanceChangeOnce: (callback: () => void) => void;`

export default TrackBalanceChangeOnce;