import type React from 'react';
import cx from 'clsx';
import useMode from '@hooks/useMode';
import Highlight, { defaultProps } from "prism-react-renderer";
import light from "prism-react-renderer/themes/nightOwlLight";
import dark from "prism-react-renderer/themes/nightOwl";
import './index.css';

const Code: React.FC<React.HTMLAttributes<HTMLDivElement> & { language?: 'tsx' | 'ts'; }> = ({ children, language = 'tsx', className, ...props }) => {
    const mode = useMode();
    
    return (
        <div className={cx(className, 'prism-' + mode)} {...props}>
            <Highlight {...defaultProps} theme={mode === 'dark' ? dark : light} code={children as string} language={language === 'ts' ? 'typescript' : language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                    ))}
                </pre>
                )}
            </Highlight>
        </div>
    );
}

export default Code;