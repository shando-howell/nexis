"use node"

import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { internal } from "./_generated/api";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import FirecrawlApp from "@mendable/firecrawl-js";

const openai = new OpenAI();
const firecrawl = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

export const processUrls = action({
    args: {urls: v.array(v.string())},
    handler: async (ctx, {urls}) => {

        for (const url of urls) {
            // 1. Scrape the URL and get clean Markdown
            const scrapeResult = await firecrawl.scrape(url, { formats: ["markdown"]});

            if (!scrapeResult) continue;
            const content = scrapeResult.markdown;

            // 3. Chunking the text
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
    
            const chunks = await splitter.splitText(String(content));
            for (const chunk of chunks) {
                // Generate embedding for each chunk
                const embeddingRes = await openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: chunk,
                });
    
                // Save embedding chunks to the DB
                await ctx.runMutation(internal.documents.insertChunk, {
                    fileName: url,
                    content: chunk,
                    embedding: embeddingRes.data[0].embedding
                });
            }
        }

        return {success: true, message: `${urls.length} sites ingested.`};
    },
});