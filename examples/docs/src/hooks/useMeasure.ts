import { debounce, throttle } from 'lodash-es';
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    x: number;
    y: number;
}

interface Option {
    wait?: number;
    type?: 'throttle' | 'debounce' | 'none';
    callback?: () => void;
}

const defaultOption = {
    wait: 333,
    type: 'debounce'
}

export default function useMeasure<T extends Element | SVGSVGElement = any>(ref: MutableRefObject<T>, option?: Option): Rect;
export default function useMeasure<T extends Element | SVGSVGElement = any>(option?: Option): readonly [MutableRefObject<T>, Rect];
export default function useMeasure<T extends Element | SVGSVGElement = any>(...args: any) {
    const hasParamRef = args?.[0] && 'current' in args?.[0];
    let option: Option | undefined;
    if (hasParamRef) option = args?.[1];
    else option = args?.[0];
    const { wait, type, callback } = { ...defaultOption, ...option };
    const targetRef = hasParamRef ? args[0] : useRef<T>(null!)
    const [rect, setRect] = useState(() => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0 }))
    
    const observerFunc = useCallback(() => {
        if (!targetRef.current) return;
        const domRect = targetRef.current.getBoundingClientRect();
        setRect({
            left: domRect.left,
            top: domRect.top,
            right: domRect.right,
            bottom: domRect.bottom,
            width: domRect.width,
            height: domRect.height,
            x: domRect.x,
            y: domRect.y,
        });
        callback?.();
    }, []);
    let execFunc = useRef<(() => void) | null>(null);

    let ro: ResizeObserver | null = null;
    const clearRo = useCallback(() => {
        if (execFunc.current) window.removeEventListener('resize', execFunc.current);
        if (!ro) return;
        ro.disconnect();
        ro = null;
    }, []);



    useEffect(() => {
        if (!targetRef.current) return clearRo;

        execFunc.current = observerFunc;
        if (type === 'throttle' && wait >= 4) execFunc.current = throttle(execFunc.current, wait);
        else if (type === 'debounce' && wait >= 4) execFunc.current = debounce(execFunc.current, wait);
        window.addEventListener('resize', execFunc.current);
        ro = new ResizeObserver(execFunc.current);
        ro.observe(targetRef.current);
        return clearRo
    }, [targetRef.current]);

    if (hasParamRef) return rect;
    return [targetRef, rect] as const;
}