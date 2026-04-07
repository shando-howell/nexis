"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export default function WebIngest() {
    const [urls, setUrls] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const processUrls = useAction(api.ingest.processUrls);

    const handleIngest = async () => {
        setIsLoading(true);

        // Split the text area input into an array of trimmed URLs
        const urlArray = urls.split("\n").map(u => u.trim()).filter(u => u !== "");

        try {
            await processUrls({ urls: urlArray });
            toast.success("Webpage added to AI knowledgebase!");
            setUrls("");
        } catch (e) {
            toast.error("Error: " + (e as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 flex flex-col flex-1 items-center justify-center h-full">
            <div className="p-4 border rounded-xl shadow-sm bg-white">
                <h1 className="text-2xl font-bold">Add page to knowledge base</h1>
                <textarea
                    className="w-full p-2 rounded-md h-32 mb-4 text-indigo-600"
                    placeholder="Add URL..."
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                />

                <button 
                    onClick={handleIngest}
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                    {isLoading ? "Processing Page..." : "Add Page"}
                </button>
            </div>
        </div>
    )
}