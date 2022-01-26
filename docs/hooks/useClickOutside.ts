import { useRef, useEffect, type MutableRefObject } from 'react';

const useClickOutside = <T extends Element | SVGSVGElement = any>(callback: Function) => {
    const domRef = useRef<T>(null!);
    useEffect(() => {
        const el = domRef.current;
        if (!el) return;

        const handler = (evt: MouseEvent) => {
            const triggerEle = evt.target as HTMLElement;
            if (!triggerEle) return;
            if (triggerEle.id === 'locale' || triggerEle.id === 'mode') return;
            if (el.contains(triggerEle)) return;
            callback?.();
        }

        document.addEventListener('click', handler, true);

        return () => document.removeEventListener('click', handler, true);
    }, [callback]);

    return domRef;
}

export default useClickOutside;