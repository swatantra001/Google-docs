
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";


export const get = query({
	args: {paginationOpts: paginationOptsValidator, search: v.optional(v.string())},
	handler: async (ctx, {paginationOpts, search}) => {

		const user = await ctx.auth.getUserIdentity();

		if(!user){
			throw new ConvexError("Unauthorized");
		}
	
		const organizationId = (user.organizationId ?? undefined) as 
			| string
			| undefined;

		// all search docs inside an organization
		if(search && organizationId){

			return await ctx.db
				.query("documents")
				.withSearchIndex("search_title", (q) =>
					q.search("title", search)
					.eq("organizationId", organizationId)
				)
				.paginate(paginationOpts)
		}
		// all docs inside an organization
		if(organizationId){
			return await ctx.db
				.query("documents")
				.withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
				.paginate(paginationOpts);
		}
		
		// personal searched docs
		if(search){
			return await ctx.db
				.query("documents")
				.withSearchIndex("search_title", (q) => q.search("title", search)
														.eq("ownerId", user.subject))
				.paginate(paginationOpts);
		}

		//const tasks = await ctx.db.query("documents").paginate(paginationOpts);
		//return tasks;

		// all personal docs
		return await ctx.db
			.query("documents")
			.withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
			.paginate(paginationOpts)
	}
})

export const getById = query({
	args: {id: v.id("documents")},
	handler: async (ctx, {id}) => {
		const document = await ctx.db.get(id);

		if(!document){
			throw new ConvexError("Document not found");
		}

		return document
	}
})

export const getByIds = query({
	args: {ids: v.array(v.id("documents"))},
	handler: async (ctx, {ids}) => {
		const documents = [];

		for(const id of ids){
			const document = await ctx.db.get(id);
			if(document)
				documents.push({id: document._id, name: document.title})
			else
				documents.push({id: id, name: "[Removed]"})
		}
		return documents;
	}
})


export const create = mutation({
	args: {title: v.optional(v.string()), initialContent: v.optional(v.string()),},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if(!user){
			throw new ConvexError("Unathorized")
		}

		const organizationId = (user.organizationId ?? undefined) as
			| string
			| undefined;
		
			console.log("OrganizationId: ", organizationId);
		const documentId = await ctx.db.insert("documents", {
			title: args.title?? "Untitled document",
			ownerId: user.subject,
			organizationId,
			initialContent: args.initialContent,
		});
		//await ctx.db.patch(documentId, {roomId: documentId});
		return documentId;
	}
})

export const removeById = mutation({
	args: {id: v.id("documents")},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		
		if(!user){
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.get(args.id);
		
		if(!document){
			throw new ConvexError("Document not found");
		}

		const isOwner = document.ownerId === user.subject;
		if(!isOwner){
			throw new ConvexError("Unauthorized");
		}

		return await ctx.db.delete(args.id);
	}
})

export const updateById = mutation({
	args: {id: v.id("documents"), title: v.string()},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if(!user){
			throw new ConvexError("Unauthorized");
		}

		const document = await ctx.db.get(args.id);

		if(!document){
			throw new ConvexError("Document not found");
		}

		const isOwner = document.ownerId === user.subject;
		if(!isOwner){
			throw new ConvexError("Unauthorized");
		}

		return await ctx.db.patch(args.id, {title: args.title});
	}
})