"use client"

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Globe, ExternalLink } from "lucide-react";
import { RemoveUrlButton } from "@/components/RemoveUrlButton";

export function KnowledgebaseList() {
    const sources = useQuery(api.documents.getKnowledgeBaseSources);

    if (sources === undefined) {
        return (
            <div className="animate-pulse">Loading URLs...</div>
        )
    }

    return (
        <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-200 tracking-wide mb-4">
                Total web pages: ({sources.length})
            </h3>

            {sources.length === 0 ? (
                <p className="text-gray-200 italic text-sm">No webpages added yet.</p>
            ) : (
                <ul className="space-y-2">
                    {sources.map((source) => (
                        <li
                            key={source.url}
                            className="flex items-center justify-between p-3 bg-indigo-900/60 rounded-lg 
                            hover:border-indigo-300 transition-colors shadow-sm"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <Globe size={16} className="text-indigo-200 shrink-0" />
                                <span className="text-sm font-medium truncate text-gray-200">
                                    {source.url}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <a 
                                    href={source.url}
                                    target="_blank"
                                    className="p-1.5 text-gray-400 hover:text-indigo-600"
                                >
                                    <ExternalLink size={16} />
                                </a>
                                <RemoveUrlButton url={source.url}/>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}