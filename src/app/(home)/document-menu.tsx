
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel";

import {DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

interface DocumentMenuProps {
	documentId: Id<"documents">;
	title: string;
	onNewTab: (id: Id<"documents">) => void;
};

export const DocumentMenu = ({documentId, title, onNewTab}: DocumentMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger> {/* otherwise `hydration error`  because dropdownMenuTrigger itself is a button*/}
				<Button variant="ghost" size="icon" className="rounded-full">
					<MoreVertical className="size-4" />
				</Button>
				
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<RenameDialog documentId={documentId} initialTitle={title}>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
						<FilePenIcon className="size-4 mr-2"/>
						Rename
					</DropdownMenuItem>
				</RenameDialog>
				<RemoveDialog documentId={documentId}>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
						<TrashIcon className="size-4 mr-2"/>
						Remove
					</DropdownMenuItem>
				</RemoveDialog>
				<DropdownMenuItem onClick={() => onNewTab(documentId)}>
					<span className="flex items-center">
					<ExternalLinkIcon className="mr-2 size-4" />
					Open in a new Tab
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}