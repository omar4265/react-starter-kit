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
    try {
      const identity = await ctx.auth.getUserIdentity();
      console.log("getApplication: identity", identity ? "exists" : "null");
      
      if (!identity) {
        console.log("getApplication: no identity, returning null");
        return null;
      }

      const userId = identity.subject;
      console.log("getApplication: userId", userId);
      
      if (!userId) {
        console.log("getApplication: no userId, returning null");
        return null;
      }

      const result = await ctx.db
        .query("applications")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .first();
      
      console.log("getApplication: result", result ? "found" : "not found");
      
      if (result) {
        console.log("getApplication: application data", {
          id: result._id,
          userId: result.userId,
          goal: result.goal,
          status: result.status
        });
      }
      
      return result;
    } catch (error) {
      console.error("getApplication error:", error);
      // Return null instead of throwing to prevent client crashes
      return null;
    }
  },
});

export const updateApplicationStatus = mutation({
  args: {
    status: v.string(),
    _id: v.id("applications"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Allow admin to update any, user to update their own
    const isAdmin = identity.email === "omarabuhassan4265@gmail.com";
    if (!isAdmin && identity.subject !== args.userId) {
      throw new Error("Not authorized");
    }
    const application = await ctx.db.get(args._id);
    if (!application) {
      throw new Error("Application not found");
    }
    return await ctx.db.patch(args._id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const getAllApplications = query({
  args: {},
  handler: async (ctx) => {
    // Only allow if the user is admin (email check should be done on frontend)
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.email !== "omarabuhassan4265@gmail.com") {
      return [];
    }
    // Fetch all applications
    return await ctx.db.query("applications").collect();
  },
});

export const createDummyApplication = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    const now = Date.now();

    // Create a dummy application for testing
    const dummyApplication = {
      userId,
      goal: "Find remote software engineering opportunities",
      location: "San Francisco, CA",
      workStyle: "Remote",
      experienceLevel: "Mid-level (3-5 years)",
      startupPreference: "Early-stage startups",
      teamVibe: "Collaborative and fast-paced",
      targetCountries: ["United States", "Canada", "United Kingdom"],
      cvFileUrl: "https://example.com/cv.pdf",
      cvOptimization: "AI-optimized for tech roles",
      jobTitles: ["Software Engineer", "Full Stack Developer", "React Developer"],
      companyCount: "50-100 companies",
      status: "submitted",
      createdAt: now,
      updatedAt: now,
    };

    console.log("Creating dummy application for user:", userId);
    
    const result = await ctx.db.insert("applications", dummyApplication);
    console.log("Dummy application created with ID:", result);
    
    return result;
  },
}); 