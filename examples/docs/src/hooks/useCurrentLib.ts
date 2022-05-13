import { useLocation } from 'react-router-dom';

export type Lib = 'react' | 'vue3' | 'svelte';

const useCurrentLib = () => {
    const { pathname } = useLocation();
    return pathname.split('/')[2] as Lib || 'react';
}

export default useCurrentLib;