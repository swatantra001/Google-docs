// "use client";

// import { ReactNode, useEffect, useMemo, useState } from "react";
// import {
//   LiveblocksProvider,
//   RoomProvider,
//   ClientSideSuspense,
// } from "@liveblocks/react/suspense";
// import { LiveObject } from "@liveblocks/client"; // Import LiveObject

// import { useParams } from "next/navigation";
// import { FullscreenLoader } from "@/components/fullscreen-loader";
// import { getUsers, getDocuments } from "./action";
// import { toast } from "sonner";
// import { Id } from "../../../../convex/_generated/dataModel";
// import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";


// type User = {id: string; name: string; avatar: string;};

// export function Room({ children }: { children: ReactNode }) {
//     const params = useParams();

// 	const [users, setUsers] = useState<User[]>([]);

// 	const fetchUsers = useMemo( 
// 		() => async () => {
// 			try {
// 				const list = await getUsers();
// 				setUsers(list);
// 			} catch {
// 				toast.error("Failed to fecth users...");
// 			}
// 		}, []
// 	 )

// 	 useEffect( () => {
// 		fetchUsers();
// 	 }, [fetchUsers])


//   return (
//     <LiveblocksProvider
//         throttle={16}
//         //authEndpoint="/api/liveblocks-auth"                   ->> was giving error when using "Inbox notification" component
// 		authEndpoint={async () => {
// 			const endPoint = "/api/liveblocks-auth";
// 			const room = params.documentId as string;

// 			const response = await fetch(endPoint, {
// 				method: "POST",
// 				body: JSON.stringify({ room }),
// 			})

// 			return await response.json();
// 		}}
// 		resolveUsers={async ({ userIds }) => {
// 			console.log({userIds})
// 			return userIds.map(
// 				(userId) => users.find((user) => user.id === userId) ?? undefined
// 			)
// 		}}
// 		resolveMentionSuggestions={({ text }) => {
// 			let filteredUsers = users;

// 			//console.log({users})

// 			if(text) {
// 				filteredUsers = users.filter((user) => 
// 				user.name.toLowerCase().includes(text.toLowerCase()))
// 			}
// 			return filteredUsers.map((user) => user.id);
// 		}}
// 		resolveRoomsInfo={async ({roomIds}) => {
// 			const documents = await getDocuments(roomIds as Id<"documents">[])
// 			return documents.map((document) => {
// 				return {
// 					id: document.id,
// 					name: document.name
// 				}
// 			})
// 		}}

//     >
//       <RoomProvider 
//         id={params.documentId as string}
//         // Add initialPresence and initialStorage for collaboration
//         initialPresence={{
//           cursor: null,
//         }}
//         initialStorage={{
//           // The Tiptap editor content will be synced to this LiveObject
//           //document: new LiveObject(),
// 		  leftMargin: LEFT_MARGIN_DEFAULT,
// 		  rightMargin: RIGHT_MARGIN_DEFAULT
//         }}
//       >
//         <ClientSideSuspense fallback={<FullscreenLoader label="Room Loading..."/>}>
//           {children}
//         </ClientSideSuspense>
//       </RoomProvider>
//     </LiveblocksProvider>
//   );
// }








/* ............................GEMINI VERSION ...............................*/








// "use client";

// import { ReactNode, useMemo } from "react";
// import {
//   LiveblocksProvider,
//   RoomProvider,
//   ClientSideSuspense,
// } from "@liveblocks/react/suspense";
// import { LiveObject } from "@liveblocks/client";

// import { useParams } from "next/navigation";
// import { FullscreenLoader } from "@/components/fullscreen-loader";
// import { getUsers, getDocuments } from "./action";
// import { Id } from "../../../../convex/_generated/dataModel";
// import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

// export function Room({ children }: { children: ReactNode }) {
//     const params = useParams();

//     // This pattern correctly fetches users for mentions without a race condition.
//     const allUsers = useMemo(() => {
//         return getUsers();
//     }, []);

//     return (
//         <LiveblocksProvider
//             throttle={16}
//             authEndpoint={async () => {
//                 const endPoint = "/api/liveblocks-auth";
//                 const room = params.documentId as string;

//                 const response = await fetch(endPoint, {
//                     method: "POST",
//                     body: JSON.stringify({ room }),
//                 });

//                 return await response.json();
//             }}
//             resolveUsers={async ({ userIds }) => {
//                 const users = await allUsers; // Await the promise from useMemo
                
//                 return userIds.map(async (userId) => {
//                     const user = users.find((u) => u.id === userId);

//                     if (!user) {
//                         return undefined;
//                     }

//                     // Generate a deterministic color for the user
//                     const nameToNumber = user.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
//                     const hue = Math.abs(nameToNumber) % 360;
//                     const color = `hsl(${hue}, 80%, 60%)`;

//                     // Return data in the shape that matches UserMeta
//                     return {
//                         id: user.id,
//                         info: {
//                             name: user.name,
//                             avatar: user.avatar,
//                             color: color,
//                         }
//                     };
//                 });
//             }}
//             resolveMentionSuggestions={async ({ text }) => {
//                 const users = await allUsers;
//                 let filteredUsers = users;

//                 if(text) {
//                     filteredUsers = users.filter((user) => 
//                     user.name.toLowerCase().includes(text.toLowerCase()))
//                 }
//                 return filteredUsers.map((user) => user.id);
//             }}
//             resolveRoomsInfo={async ({roomIds}) => {
//                 const documents = await getDocuments(roomIds as Id<"documents">[]);
//                 return documents.map((document) => ({
//                     id: document.id,
//                     name: document.name,
//                 }));
//             }}
//         >
//             <RoomProvider 
//                 id={params.documentId as string}
//                 initialPresence={{
//                     cursor: null,
//                 }}
//                 initialStorage={{
//                     // FIX: This line is REQUIRED for live-sharing to work.
//                     //document: new LiveObject(),
//                     leftMargin: LEFT_MARGIN_DEFAULT,
//                     rightMargin: RIGHT_MARGIN_DEFAULT
//                 }}
//             >
//                 <ClientSideSuspense fallback={<FullscreenLoader label="Room Loading..."/>}>
//                     {children}
//                 </ClientSideSuspense>
//             </RoomProvider>
//         </LiveblocksProvider>
//     );
// }










/*          ..................CHAT-GPT.................................................................                     */




"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { getUsers, getDocuments } from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users once when component mounts
  useEffect(() => {
    (async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Failed to fetch users...");
      }
    })();
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endPoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endPoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveUsers={async ({ userIds }) => {
        // return userIds.map(
        //   (userId) => users.find((user) => user.id === userId) ?? undefined
        // );


		return userIds.map( (userId) => {
			const user = users.find((u) => u.id === userId);

			if (!user) {
				return undefined;
			}

			// Generate a deterministic color for the user
			const nameToNumber = user.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
			const hue = Math.abs(nameToNumber) % 360;
			const color = `hsl(${hue}, 80%, 60%)`;

			// Return data in the shape that matches UserMeta
			return {
				id: user.id,
				
				name: user.name,
				avatar: user.avatar,
				color: color,
			
			};
		});
      }}
      resolveMentionSuggestions={async ({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialPresence={{
          cursor: null,
        }}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Room Loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
