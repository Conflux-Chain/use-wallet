import { createContext, useContext } from 'react';

export const ModeContext = createContext<'dark' | 'light'>('dark');

const useMode = () => useContext(ModeContext);

export default useMode;