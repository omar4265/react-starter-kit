import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveApplication = mutation({
  args: {
    goal: v.string(),
    location: v.string(),
    workStyle: v.string(),
    experienceLevel: v.string(),
    startupPreference: v.string(),
    teamVibe: v.string(),
    targetCountries: v.array(v.string()),
    cvFileUrl: v.optional(v.string()),
    cvOptimization: v.string(),
    jobTitles: v.array(v.string()),
    companyCount: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const now = Date.now();

    // Check if user already has an application
    const existingApplication = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingApplication) {
      // Update existing application
      return await ctx.db.patch(existingApplication._id, {
        ...args,
        updatedAt: now,
      });
    } else {
      // Create new application
      return await ctx.db.insert("applications", {
        userId,
        ...args,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

export const getApplication = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const userId = identity.subject;
    return await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
  },
});

export const updateApplicationStatus = mutation({
  args: {
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const application = await ctx.db
      .query("applications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!application) {
      throw new Error("Application not found");
    }

    return await ctx.db.patch(application._id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
}); 