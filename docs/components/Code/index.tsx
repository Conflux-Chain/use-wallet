import type React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism, dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import useMode from '@hooks/useMode';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('ts', ts);

const Code: React.FC<React.HTMLAttributes<HTMLDivElement> & { language?: 'tsx' | 'ts'; }> = ({ children, language = 'tsx', ...props }) => {
    const mode = useMode();
    
    return (
        <div  {...props}>
            <SyntaxHighlighter language={language} style={mode === 'dark' ? dark : prism}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}

export default Code;