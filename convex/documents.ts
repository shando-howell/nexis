import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const insertChunk = internalMutation({
  args: {
    fileName: v.string(),
    content: v.string(), 
    embedding: v.array(v.float64())
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("documents", {
        fileName: args.fileName,
        content: args.content,
        embedding: args.embedding
    })
    return null;
  },
});

export const getDocument = query({
    args: {
        documentId: v.id("documents")
    },
    handler: async (ctx, args) => {
        const document = await ctx.db.get(args.documentId);

        return document;
    }
})