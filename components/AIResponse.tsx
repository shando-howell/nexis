/* eslint-disable */

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

const CopyButton = ({ text }: { text: string}) => {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={copy}
            className="absolute right-2 top-2 p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-600 
            text-white transition-all opacity-0 group-hover:opacity-100"
            title="Copy code"
        >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
    );
};

export function AIResponse({ content }: { content: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/,'');

                    return !inline && match ? (
                        <div className="relative group my-4">
                            <div className="absolute left-4 top-2 text-xs text-gray-400 uppercase font-mono pointer-events-none">
                                {match[1]}
                            </div>
                            <CopyButton text={codeString} />
                                <SyntaxHighlighter
                                    style={dark}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-lg mt-0 pt-8"
                                    {...props}
                                >
                                    {codeString}
                                </SyntaxHighlighter>
                        </div>
                    ) : (
                        <code className="bg-gray-200 dark:bg-gray-200 rounded px-1 py-0.5 font-mono text-sm" {...props}>
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