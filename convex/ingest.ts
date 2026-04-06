import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { internal } from "./_generated/api";

const openai = new OpenAI();

export const ingest = action({
    args: {text: v.string()},
    handler: async (ctx, {text}) => {
        // 1. Generate Embedding
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
        });
        const embedding = response.data[0].embedding;

        // Save embeddings to the DB
        await ctx.runMutation(internal.documents.insertDocument, {
            content: text,
            embedding
        })
    },
});