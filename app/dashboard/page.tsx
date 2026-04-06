"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

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
            alert("Websites ingested!");
            setUrls("");
        } catch (e) {
            alert("Error: " + (e as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 flex flex-col flex-1 items-center justify-center h-full">
            <div className="p-4 border rounded-xl shadow-sm bg-white">
                <h1 className="text-2xl font-bold text-indigo-600">Add URLs to AI Knowledge Base</h1>
                <textarea
                    className="w-full p-2 border rounded-md h-32 mb-4 text-indigo-600"
                    placeholder="Add a URL..."
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                />

                <button 
                    onClick={handleIngest}
                    disabled={isLoading}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover: bg-indigo-700 disabled:opacity-50"
                >
                    {isLoading ? "Crawling..." : "Add URL"}
                </button>
            </div>
        </div>
    )
}