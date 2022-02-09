import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'clsx';
import useMode from '@hooks/useMode';

const Menu: React.FC = () => {
    const mode = useMode();
    const { pathname } = useLocation();
    const currentCatalogue = pathname.split('/')[2] || 'basic';

    return (
        <div className="mt-6 flex justify-center items-end gap-5 h-10">
            {menu.map((item) => (
                <Link
                    className={cx(
                        'relative text-center transition-colors px-3 ml-4 capitalize',
                        mode === 'light' ? 'h-full flex justify-center items-center' : 'h-10 leading-10 rounded-md',
                        currentCatalogue !== item.path && 'hover:text-text1 cursor-pointer',
                        currentCatalogue === item.path ? 'pointer-events-none text-text1' : 'text-text2',
                        currentCatalogue === item.path && mode === 'dark' && 'bg-[#4b5563]',
                        currentCatalogue !== item.path && mode === 'dark' && 'hover:bg-[#374151]',
                    )}
                    to={item.path}
                    key={item.path}
                >
                    {item.path}
                    {mode === 'light' && (
                        <span
                            className={cx(
                                'absolute w-full left-0 bottom-0 h-1 rounded-sm bg-primary opacity-0 transition-opacity',
                                currentCatalogue === item.path && 'opacity-100',
                            )}
                        />
                    )}
                </Link>
            ))}
        </div>
    );
};

const menu = [
    {
        path: 'basic',
        children: [
            {
                name: null,
                anchor: '1',
            },
        ],
    },
    {
        path: 'function',
        children: [
            {
                name: 'connect',
                anchor: '1',
            },
            {
                name: 'sendTransaction',
                anchor: '1',
            },
            {
                name: 'addChain',
                anchor: '1',
            },
            {
                name: 'switchChain',
                anchor: '1',
            },
            {
                name: 'watchAsset',
                anchor: '1',
            },
            {
                name: 'personalSign',
                anchor: '1',
            },
            {
                name: 'typedSign',
                anchor: '1',
            },
        ],
    },
    {
        path: 'hooks',
        children: [
            {
                name: 'useStatus',
                anchor: '1',
            },
            {
                name: 'useAccount',
                anchor: '1',
            },
            {
                name: 'useChainId',
                anchor: '1',
            },
            {
                name: 'useBalance',
                anchor: '1',
            },
        ],
    },
    {
        path: 'utils',
        children: [
            {
                name: 'Unit',
                anchor: '1',
            },
            {
                name: 'trackBalanceChangeOnce',
                anchor: '1',
            },
        ],
    },
    {
        path: 'others',
        children: [
            {
                name: 'completeDetect',
                anchor: '1',
            },
            {
                name: 'provider',
                anchor: '1',
            },
        ],
    },
] as const;

export default Menu;
