import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        fileName: v.string(),
        content: v.string(),
        embedding: v.array(v.float64()),
        metadata: v.optional(v.any())
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536, // Standard for OpenAI text-embedding-3-small
    }),
});