"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgebaseList } from "@/components/KnowledgbaseList";

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
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-purple-950">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* Add To Knowledgebase section */}
                    <Card className="relative overflow-hidden border-indigo-800/80 mt-8 shadow-2xl bg-linear-to-br from-blue-950/50 via-purple-950/50 to-pink-950/50 backdrop-blue-sm">
                        <CardHeader className="text-center pb-6 relative">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <CardTitle className="text-3xl font-bold bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Add To Knowledgebase
                                </CardTitle>
                            </div>
                            <CardDescription className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                                Enter a web page you would like to add to your AI knowledgebase.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            className="w-full pl-4 h-14 text-base text-gray-200 border-2 border-indigo-800/80 focus:border-indigo-400 bg-indigo-900/40 backdrop-blur-sm shadow-sm"
                                            placeholder="Enter a web page..."
                                            value={urls}
                                            onChange={(e) => setUrls(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            onClick={handleIngest}
                                            size="lg"
                                            disabled={isLoading || !urls.trim()}
                                            className="h-14 px-6 md:px-8 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600
                                            hover:from-blue-700 hover:via-purple-600 hover:to-pink-700 border-0 shadow-lg 
                                            hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group 
                                            font-semibold w-full md:w-auto text-gray-200 rounded-md disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
                                                    <span className="hidden lg:inline">
                                                        Processing Web Page...
                                                    </span>
                                                </> 
                                            ) : (
                                                <>
                                                    <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                                                    <span className="lg:inline">
                                                        Add Web Page
                                                    </span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Knowledgebase Section */}
                    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-2xl text-gray-200">
                                    AI Knowldgebase
                                </CardTitle>
                            </div>
                            <CardDescription className="text-gray-200">
                                Keep track of the web pages in your AI knowledgebase.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-gray-200">
                            <KnowledgebaseList />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-center text-purple-400 text-2xl">
                <p>Nexis &copy; 2026</p>
            </div>
        </div>
    )
}