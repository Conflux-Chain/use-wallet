import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomScrollbar from 'custom-react-scrollbar';
import GuidePage from '@pages/Guide';
import APIPage from '@pages/API';
import DemoPage from '@pages/Demo';
import Navbar from '@pages/Navbar';
import { LocaleContext } from '@hooks/useI18n';
import { ModeContext } from '@hooks/useMode';

export const routes = [{
    path: '/',
    element: GuidePage,
    key: "Guide"
}, {
    path: '/api',
    element: APIPage,
    key: "API"
}, {
    path: '/demo',
    element: DemoPage,
    key: "Demo"
}] as const;

const AppRouter = () => {
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const last = localStorage.getItem('mode') as 'light' || 'light';
        if (last === 'light' || last === 'dark') return last;
        return 'light';
    });

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    const handleSwitchMode = useCallback(() => {
        setMode((pre) => {
            const mode = pre === 'light' ? 'dark' : 'light';
            localStorage.setItem('mode', mode);
            return mode;
        });
    }, []);


    const [locale, setLocal] = useState<'zh' | 'en'>(() => {
        const last = localStorage.getItem('locale') as 'en' | 'zh';
        if (last === 'en' || last === 'zh') return last;
        return (navigator.language.includes('zh') ? 'zh' : 'en')
    });
    const handleSwitchLocale = useCallback(() => setLocal(preLocale => {
        const locale = preLocale === 'zh' ? 'en' : 'zh';
        localStorage.setItem('locale', locale);
        return locale;
    }), []);

    return (
        <ModeContext.Provider value={mode}>
            <LocaleContext.Provider value={locale}>
                <Router>
                    <Navbar handleSwitchLocale={handleSwitchLocale} handleSwitchMode={handleSwitchMode} />
                    <CustomScrollbar contentClassName='scroll-content'>
                        <Routes>
                            {routes.map(route =>
                                <Route key={route.path} path={route.path} element={<route.element />} />
                            )}
                        </Routes>
                    </CustomScrollbar>
                </Router>
            </LocaleContext.Provider>
        </ModeContext.Provider>
    );
}

export default AppRouter;