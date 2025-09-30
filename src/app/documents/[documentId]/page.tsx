import { Editor } from "./editor";
import { Navbar } from "./Navbar";
import { Toolbar } from "./Toolbar";


interface DocumentIdPageProps {
	params: Promise<{ documentId: string }>;
};

const documentIdPage = async ({ params }: DocumentIdPageProps) => {
	// const awaitedParams = await params;
	// const documentId = awaitedParams.documentId;
	const {documentId} = await params;

  return (
	<div className="min-h-screen bg-[#fafbfd]">
		<div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
			<Navbar />
			<Toolbar />
		</div>
		<div className="pt-[114px] print:pt-0">
			<Editor />
		</div>
	</div>
  )
}

export default documentIdPage
