import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,	
});

const COLORS = ["#E57373", "#9575CD", "#4FC3F7", "#81C784", "#FFF176", "#FF8A65", "#F06292", "#7986CB"];

export async function POST(req: Request) {

	const { sessionClaims } = await auth();

	if(!sessionClaims) {
		return new Response("Unauthorized", {status: 401});
	}

	const user = await currentUser();

	if(!user) {
		return new Response("Unauthorized", {status: 401});
	}

	const { room } = await req.json();
	const document = await convex.query(api.documents.getById, {id: room})

	if(!document) {
		return new Response("Room not found", {status: 404});
	}

	const isOwner = document.ownerId === user.id;
	const isOrganizationMember = document.organizationId && document.organizationId === sessionClaims?.o?.id;
	
	// console.log({room});
	// console.log({document})
	// console.log({sessionClaims})
	// console.log({
    //     "Document's Org ID": document.organizationId,
    //     "User's Session Org ID": sessionClaims?.o?.id,
    //     "Is Member?": isOrganizationMember
    // });
	// console.log({user})
	
	if(!isOwner && !isOrganizationMember) {
		return new Response("Unauthorized", {status: 401});
	}

	//const userColor = COLORS[Math.floor(Math.random() * COLORS.length)];

	const name = user.fullName?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
	const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
	const hue = Math.abs(nameToNumber) % 360;
	const color = `hsl(${hue}, 80%, 60%)`;

	const session = liveblocks.prepareSession(user.id, {
		userInfo: {
			name: user.fullName?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
			avatar: user.imageUrl,
			color: color
		}
	})
	session.allow(room, session.FULL_ACCESS);

	const { body, status } = await session.authorize();
	
	return new Response(body, { status });
}


// import { Liveblocks } from "@liveblocks/node";
// import { ConvexHttpClient } from "convex/browser";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { api } from "../../../../convex/_generated/api";

// const liveblocks = new Liveblocks({
//     secret: process.env.LIVEBLOCKS_SECRET_KEY!,	
// });

// const COLORS = ["#E57373", "#9575CD", "#4FC3F7", "#81C784", "#FFF176", "#FF8A65", "#F06292", "#7986CB"];

// export async function POST(req: Request) {
//     // 1. Create a new Convex client for each request. This is critical.
//     const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

//     const authorization = await auth();
//     const user = await currentUser();

//     if(!authorization || !user) {
//         return new Response("Unauthorized", {status: 401});
//     }

//     // 2. Get the token required to make an authenticated request.
//     const token = await authorization.getToken({ template: "convex" });

//     if (!token) {
//         return new Response("Unauthorized: Convex token not available", { status: 401 });
//     }

//     // 3. Authenticate the Convex client with the user's token.
//     convex.setAuth(token);

//     const { room } = await req.json();
//     // 4. This query is now authenticated and will work correctly.
//     const document = await convex.query(api.documents.getById, {id: room});

//     if(!document) {
//         return new Response("Room not found", {status: 404});
//     }

//     const isOwner = document.ownerId === user.id;
//     const isOrganizationMember = document.organizationId && document.organizationId === authorization.sessionClaims?.o?.id;
    
//     if(!isOwner && !isOrganizationMember) {
//         return new Response("Unauthorized", {status: 401});
//     }

//     const userColor = COLORS[Math.floor(Math.random() * COLORS.length)];

//     const session = liveblocks.prepareSession(user.id, {
//         userInfo: {
//             name: user.fullName?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
//             avatar: user.imageUrl,
//             color: userColor, // Added color back for cursors
//         }
//     })
//     session.allow(room, session.FULL_ACCESS);

//     const { body, status } = await session.authorize();
    
//     return new Response(body, { status });
// }
