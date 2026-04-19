/* eslint-disable */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function AIResponse({ content }: { content: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={dark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/,'')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="bg-gray-200 dark:bg-gray-200 rounded px-1" {...props}>
                            { children }
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    )
}