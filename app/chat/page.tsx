"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function Chat() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const ask = useAction(api.rag.answerQuestion);

    const handleAsk = async () => {
        const res = await ask({ question });

        if (res) {
            setAnswer(res);
        }
    };

    return (
        <div className="p-8">
            <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border p-2 min-w-96"
                placeholder="Ask something..."
            />

            <button onClick={handleAsk} className="bg-blue-500 text-white p-2 ml-2">
                Ask a question.
            </button>
            <div className="mt-4 border-white p-2">{answer}</div>
        </div>
    )
}