import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI();

export const answerQuestion = action({
    args: { question: v.string()},
    handler: async (ctx, {question}) => {
        // 1. Embed the user's question
        const embeddingRes = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: question,
        });

        const vector = embeddingRes.data[0].embedding;

        // 2. Search Convex for similar text chunks
        const results = await ctx.vectorSearch("documents", "by_embedding", {
            vector,
            limit: 3
        });

        // TO FIX
        // 3. Fetch the actual text for those matches
        const chunks = await Promise.all(
            results.map((r) => ctx.runQuery(api.documents.getDocument, {documentId: r._id}))
        )
        const context: string = chunks.map((c) => c?.content).join("\n\n");

        // 4. Generate the final answer with GPT
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {role: "system", content: "Answer the question using ONLY the provided context."},
                {role: "user", content: `Context: ${context} \n\n Question: ${question}`},
            ],
        });

        return completion.choices[0].message.content;
    },
});