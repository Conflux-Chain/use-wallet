import { createContext, useContext } from 'react';

export const LocaleContext = createContext<'en' | 'zh'>('en');
export const useLocale= () => useContext(LocaleContext);

const useI18n = <T extends Record<'en' | 'zh', Record<string, string>>>(transitions: T): T['en' | 'zh'] => {
    const locale = useContext(LocaleContext);
    return transitions[locale];
}

export default useI18n;