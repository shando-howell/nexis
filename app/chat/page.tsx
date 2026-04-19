"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { SendHorizonal, Loader2 } from "lucide-react";
import { AIResponse } from "@/components/AIResponse";

export default function Chat() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("Ask Nexis a question based on your provided web pages.");
    const [isLoading, setIsLoading] = useState(false);
    const ask = useAction(api.rag.answerQuestion);

    const handleAsk = async () => {
        setIsLoading(true);
        setAnswer("")
        const res = await ask({ question });

        if (res) {
            setIsLoading(false);
            setAnswer(res);
            setQuestion("");
        }
    };

    return (
        <main className="flex flex-col h-[calc(100vh-theme(spacing.14))]">
            {/* Answers */}
            <section className="flex-1 overflow-y-auto p-2 md:p-0">
                <div className="flex items-center justify-center">
                    {isLoading && <Loader2 className="size-10 animate-spin text-muted-foreground"/>}
                </div>
                <div className="p-2 text-2xl">
                    <AIResponse content={answer} />
                </div>
            </section>

            {/* Input */}
            <footer className="border-t p-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-4xl mx-auto relative">
                    <div className="relative flex items-center">
                        <input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="flex-1 py-2 px-4 rounded-2xl border focus:ouline-none pr-12 bg-gray-50 placeholder:text-gray-500"
                            placeholder="Ask a question..."
                        />

                        <button 
                            onClick={handleAsk}
                            className="absolute right-1.5 rounded-xl h-9 w-9 p-0 flex items-center justify-center transition-all bg-indigo-600/80 text-white">
                            <SendHorizonal />
                        </button>
                    </div>
                </div>
            </footer>
        </main>
    )
}