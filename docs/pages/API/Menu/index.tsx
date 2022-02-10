import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'clsx';
import { throttle } from 'lodash-es';
import useMode from '@hooks/useMode';

const menu = ['basic', 'hooks',  'function', 'utils', 'others'] as const;

const Menu: React.FC = () => {
    const mode = useMode();
    const { pathname } = useLocation();
    const currentCataloguePath = pathname.split('/')[2] || 'basic';

    return (
        <>
            <div className="mt-6 flex justify-center items-end gap-5 h-10">
                {menu.map((cataloguePath) => (
                    <Link
                        className={cx(
                            'relative text-center transition-colors px-3 ml-4 capitalize',
                            mode === 'light' ? 'h-full flex justify-center items-center' : 'h-10 leading-10 rounded-md',
                            currentCataloguePath !== cataloguePath && 'hover:text-text1 cursor-pointer',
                            currentCataloguePath === cataloguePath ? 'pointer-events-none text-text1' : 'text-text2',
                            currentCataloguePath === cataloguePath && mode === 'dark' && 'bg-[#4b5563]',
                            currentCataloguePath !== cataloguePath && mode === 'dark' && 'hover:bg-[#374151]',
                        )}
                        to={cataloguePath}
                        key={cataloguePath}
                    >
                        {cataloguePath}
                        {mode === 'light' && (
                            <span
                                className={cx(
                                    'absolute w-full left-0 bottom-0 h-1 rounded-sm bg-primary opacity-0 transition-opacity',
                                    currentCataloguePath === cataloguePath && 'opacity-100',
                                )}
                            />
                        )}
                    </Link>
                ))}
            </div>
            <SideSectionBar currentCataloguePath={currentCataloguePath} />
        </>
    );
};

const SideSectionBar: React.FC<{ currentCataloguePath: string; }> = memo(({ currentCataloguePath }) => {
    const [sections, setSections] = useState<Array<HTMLHeadingElement>>([]);
    const [currentSection, setCurrentSection] = useState('');
    const currentCatalogue = menu.find((cataloguePath) => cataloguePath === currentCataloguePath);
    const scrollJudgeRef = useRef<Array<{ top: number; name: string; cannotReach?: true }>>([]);
    const scrollElRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (!scrollElRef.current) scrollElRef.current = document.querySelector('.scroll-content')?.parentNode as HTMLDivElement;
        const scrollEl = scrollElRef.current;
        scrollEl.scrollTo({ top: 0 });
        if (!currentCatalogue || !scrollEl) return;
        const sections = Array.from(document.querySelectorAll('h3'));
        setSections(sections);

        setCurrentSection(sections[0].textContent ?? '');

        let maxScrollDistance = scrollEl.scrollHeight - scrollEl.clientHeight;
        let canReachLast = true;
        const getScrollJudge = () => {
            scrollJudgeRef.current = sections.map((section) => ({ top: section.offsetTop - 128, name: section.textContent! }));
            maxScrollDistance = scrollEl.scrollHeight - scrollEl.clientHeight;
            canReachLast =
                scrollJudgeRef.current.length >= 2 && maxScrollDistance > scrollJudgeRef.current[scrollJudgeRef.current.length - 2].top;
            if (!canReachLast) {
                scrollJudgeRef.current[scrollJudgeRef.current.length - 2].cannotReach = true;
            }
        };
        window.addEventListener('resize', getScrollJudge);
        getScrollJudge();

        const handleScroll = throttle(() => {
            if (!canReachLast && Math.abs(scrollEl.scrollTop - maxScrollDistance) <= 4) {
                setCurrentSection(sections[sections.length - 1].textContent!);
                return;
            }
            const currentSection = scrollJudgeRef.current.find((section) => section.top >= scrollEl.scrollTop);
            if (!currentSection) return;
            setCurrentSection(currentSection.name);
        }, 24);

        scrollEl.addEventListener('scroll', handleScroll);
        return () => {
            scrollEl.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', getScrollJudge);
        };
    }, [currentCatalogue]);

    const handleClickSection = useCallback<React.MouseEventHandler>((evt) => {
        const sectionIndex = scrollJudgeRef.current.findIndex((section) => section.name === (evt.target as HTMLAnchorElement).textContent!);
        if (sectionIndex === -1 || !scrollElRef.current) return;
        const section = scrollJudgeRef.current[sectionIndex];
        scrollElRef.current.scrollTo({
            top:
                sectionIndex === 0
                    ? 0
                    : section.cannotReach
                    ? scrollElRef.current.scrollHeight - scrollElRef.current.clientHeight - 40
                    : section.top,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className="fixed flex-col hidden xl:flex left-[50%] top-[33.5%] translate-x-[600px] translate-y-[-50%]">
            {sections?.map((section) => (
                <a
                    className={cx('h-8 cursor-pointer transition-colors', currentSection === section.textContent ? 'text-primary' : 'text-text2')}
                    key={section.textContent}
                    onClick={handleClickSection}
                >
                    {section.textContent}
                </a>
            ))}
        </div>
    );
});

export default Menu;
