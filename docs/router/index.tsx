import { useState, useCallback, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomScrollbar from 'custom-react-scrollbar';
import GuidePage from '@pages/Guide';
import DemoPage from '@pages/Demo';
import APIPage from '@pages/API';
import BasicAPI from '@pages/API/Catalogue/Basic';
import FunctionAPI from '@pages/API/Catalogue/Function';
import HooksAPI from '@pages/API/Catalogue/Hooks';
import UtilsAPI from '@pages/API/Catalogue/Utils';
import OthersAPI from '@pages/API/Catalogue/Others';
import Navbar from '@pages/Navbar';
import { LocaleContext } from '@hooks/useI18n';
import { ModeContext } from '@hooks/useMode';

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
                            <Route key='Guide' path='/' element={<GuidePage />} />
                            <Route key='API' path='api' element={<APIPage />}>
                                <Route index element={<BasicAPI />}  />
                                <Route key='basic' path='basic' element={<BasicAPI />}  />
                                <Route key='function' path='function' element={<FunctionAPI />} />
                                <Route key='hooks' path='hooks' element={<HooksAPI />} />
                                <Route key='utils' path='utils' element={<UtilsAPI />} />
                                <Route key='others' path='others' element={<OthersAPI />} />
                            </Route>
                            <Route key='Demo' path='demo' element={<DemoPage />} />
                            <Route path="*" element={<Navigate to="/"/>} />
                        </Routes>
                    </CustomScrollbar>
                </Router>
            </LocaleContext.Provider>
        </ModeContext.Provider>
    );
}

export default AppRouter;