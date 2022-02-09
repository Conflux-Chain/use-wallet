import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'clsx';
import Logo from '@assets/logo.svg';
import DarkMode from '@assets/dark-mode.svg';
import LightMode from '@assets/light-mode.svg';
import useI18n, { useLocale } from '@hooks/useI18n';
import useMode from '@hooks/useMode';

interface Props {
    handleSwitchLocale: () => void;
    handleSwitchMode: () => void;
}

const transitions = {
    en: {
        Guide: 'Guide',
        API: 'API',
        Demo: 'Demo',
    },
    zh: {
        Guide: '指引',
        API: '接口',
        Demo: '样例',
    },
} as const;


export const routes = [{
    path: '/home',
    key: "Guide"
}, {
    path: '/api',
    key: "API"
}, {
    path: '/demo',
    key: "Demo"
}] as const;

const Navbar: React.FC<Props> = ({ handleSwitchLocale, handleSwitchMode }) => {
    const mode = useMode();
    const locale = useLocale();
    const i18n = useI18n(transitions);
    const { pathname: _pathname } = useLocation();
    const pathname = _pathname === '/' ? '/home' : _pathname;

    return (
        <nav className={"flex items-center h-16 bg-bg transition-colors shadow-sm z-10"}>
            <div className="container mx-auto px-8 h-full flex items-center justify-between">
                <div className="h-full flex items-center">
                    <img className="w-10 h-10 mr-1 translate-y-[-1px]" src={Logo} alt="logo" />
                    <span className="mr-4 text-xl text-text1 transition-colors whitespace-nowrap">Fluent use-wallet</span>

                    {routes.map((route) => (
                        <Link
                            className={cx(
                                'relative text-center transition-colors',
                                locale === 'zh' ? 'w-18 ml-4' : 'w-20 ml-5',
                                mode === 'light' ? 'h-full flex justify-center items-center' : 'h-10 leading-10 rounded-md',
                                pathname.indexOf(route.path) === -1 && 'hover:text-text1 cursor-pointer',
                                pathname.indexOf(route.path) !== -1 ? 'pointer-events-none text-text1' : 'text-text2',
                                pathname.indexOf(route.path) !== -1 && mode === 'dark' && 'bg-[#4b5563]',
                                pathname.indexOf(route.path) === -1 && mode === 'dark' && 'hover:bg-[#374151]',
                            )}
                            to={route.path}
                            key={route.key}
                        >
                            {i18n[route.key]}
                            {mode === 'light' && <span className={cx('absolute w-full left-0 bottom-0 h-1 rounded-sm bg-primary opacity-0 transition-opacity', pathname.indexOf(route.path) !== -1 && 'opacity-100')} />}
                        </Link>
                    ))}
                </div>

                <div className="flex">
                    <div
                        id="locale"
                        onClick={handleSwitchLocale}
                        className="inline-block w-[24px] h-[24px] cursor-pointer transition-all"
                    >
                        <svg
                            className="pointer-events-none transition-all"
                            fill={mode === 'dark' ? '#c2c6cd' : '#3D3F4C'}
                            viewBox="0 0 1088 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                        >
                            <path d="M729.6 294.4c19.2 57.6 44.8 102.4 89.6 147.2 38.4-38.4 64-89.6 83.2-147.2H729.6zm-422.4 320h166.4l-83.2-224z" />
                            <path d="M947.2 0h-768c-70.4 0-128 57.6-128 128v768c0 70.4 57.6 128 128 128h768c70.4 0 128-57.6 128-128V128c0-70.4-51.2-128-128-128zM633.6 825.6c-12.8 12.8-25.6 12.8-38.4 12.8-6.4 0-19.2 0-25.6-6.4s-12.8 0-12.8-6.4-6.4-12.8-12.8-25.6-6.4-19.2-12.8-32l-25.6-70.4h-224L256 768c-12.8 25.6-19.2 44.8-25.6 57.6-6.4 12.8-19.2 12.8-38.4 12.8-12.8 0-25.6-6.4-38.4-12.8-12.8-12.8-19.2-19.2-19.2-32 0-6.4 0-12.8 6.4-25.6s6.4-19.2 12.8-32l140.8-358.4c6.4-12.8 6.4-25.6 12.8-38.4s12.8-25.6 19.2-32 12.8-19.2 25.6-25.6c12.8-6.4 25.6-6.4 38.4-6.4 12.8 0 25.6 0 38.4 6.4 12.8 6.4 19.2 12.8 25.6 25.6 6.4 6.4 12.8 19.2 19.2 32 6.4 12.8 12.8 25.6 19.2 44.8l140.8 352c12.8 25.6 19.2 44.8 19.2 57.6-6.4 6.4-12.8 19.2-19.2 32zm352-249.6c-70.4-25.6-121.6-57.6-166.4-96-44.8 44.8-102.4 76.8-172.8 96l-19.2-32c70.4-19.2 128-44.8 172.8-89.6-44.8-44.8-83.2-102.4-96-166.4h-64v-25.6h172.8c-12.8-19.2-25.6-44.8-38.4-64l19.2-6.4c12.8 19.2 32 44.8 44.8 70.4h160v32h-64c-19.2 64-51.2 121.6-89.6 160 44.8 38.4 96 70.4 166.4 89.6l-25.6 32z" />
                        </svg>
                    </div>
                    <img
                        id="mode"
                        className="ml-6 w-6 h-6 cursor-pointer"
                        src={mode === 'light' ? DarkMode : LightMode}
                        alt="dark/light mode"
                        onClick={handleSwitchMode}
                    />
                </div>
            </div>
        </nav>
    );
};

export default memo(Navbar);
