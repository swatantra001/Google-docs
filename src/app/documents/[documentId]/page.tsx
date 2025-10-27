import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";

import { auth } from "@clerk/nextjs/server"
import { preloadQuery } from "convex/nextjs";

interface DocumentIdPageProps {
	params: Promise<{ documentId: Id<"documents"> }>;
};

const documentIdPage = async ({ params }: DocumentIdPageProps) => {
	// const awaitedParams = await params;
	// const documentId = awaitedParams.documentId;

	const {documentId} = await params;

//   return (
// 	<Room>
// 		<div className="min-h-screen bg-[#fafbfd]">
// 			<div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
// 				<Navbar />
// 				<Toolbar />
// 			</div>
// 			<div className="pt-[114px] print:pt-0">
				
// 					<Editor />
				
// 			</div>
// 		</div>
// 	</Room>
//   )
	const { getToken } = await auth();
	const token = await getToken({ template: "convex" }) ?? undefined;

	if(!token) throw new Error("Unauthorized");

	const preloadedDocument = await preloadQuery(api.documents.getById, {id: documentId}, {token});
	return <Document preloadedDocument={preloadedDocument}/>
}

export default documentIdPage
