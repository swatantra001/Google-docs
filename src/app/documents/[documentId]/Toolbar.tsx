"use client";

import { Separator } from "@/components/ui/separator";

import { BoldIcon, ItalicIcon, ListCollapseIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import {type Level} from '@tiptap/extension-heading'
import {SketchPicker, type ColorResult} from 'react-color'
import { useEditorStore } from '@/store/use-editor-store'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {ChevronDownIcon, HighlighterIcon, ImageIcon, Link2Icon, SearchIcon, UploadIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, ListIcon, ListOrderedIcon} from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";


export const FontFamilyButton = ()=>{
	const { editor } = useEditorStore();

	const fonts = [
		{label: "Arial", value: "Arial"},
		{label: "Times New Roman", value: "Times New Roman"},
		{label: "Courier New", value: "Courier New"},
		{label: "Georgia", value: "Georgia"},
		{label: "Verdana", value: "Verdana"},
	];


	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<span className='truncate'>
								{editor?.getAttributes("textStyle").fontFamily || "Arial"}
							</span>
							<ChevronDownIcon className="size-4 ml-2 shrink-0" />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent side="bottom">
					<span>Font</span>
				</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{fonts.map((font)=> (
					<DropdownMenuItem
						key={font.value}
						onClick={()=> editor?.chain().focus().setFontFamily(font.value).run()}
						className ={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 cursor-pointer",
							editor?.getAttributes("textStyle").fontFamily === font.value && "bg-neutral-200/80"
						)}
						style={{fontFamily: font.value}}
					>
						<span className='text-sm' style={{fontFamily: font.value}}>{font.label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const HeadingLevelButton = ()=>{
	const { editor } = useEditorStore();

	const headings = [
		{label: "Normal text", value: 0, fontSize: "16px"},
		{label: "Heading 1", value: 1, fontSize: "32px"},
		{label: "Heading 2", value: 2, fontSize: "24px"},
		{label: "Heading 3", value: 3, fontSize: "20px"},
		{label: "Heading 4", value: 4, fontSize: "18px"},
		{label: "Heading 5", value: 5, fontSize: "16px"},
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= 5; level++) {
			if (editor?.isActive("heading", { level: level })) {
				return `Heading ${level}`;
			}
		}
		return "Normal text";
	}

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<span className='truncate'>
								{getCurrentHeading()}
							</span>
							<ChevronDownIcon className="size-4 ml-2 shrink-0" />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent side="top" sideOffset={5}>Heading</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{headings.map((heading)=> (
					<DropdownMenuItem
						key={heading.value}
						onClick={
							()=>{
								if(heading.value === 0){
									editor?.chain().focus().setParagraph().run();
								}else{
									editor?.chain().focus().toggleHeading({level: heading.value as Level}).run();
								}
							}
						}
						className ={cn(
							"flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 cursor-pointer",
							(heading.value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level: heading.value}) && "bg-neutral-200/80"
						)}
						//style={{fontSize: heading.fontSize, fontWeight: heading.value === 0 ? "normal" : "bold"}}
						style={{fontSize: heading.fontSize}}
					>
						<span className='text-sm' style={{fontSize: heading.fontSize, }}>{heading.label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const TextColorButton = () => {
	const { editor } = useEditorStore();

	const value = editor?.getAttributes("textStyle").color || "#000000";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	}

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<span className='text-xs'>A</span>
							<div className='h-0.5 w-full' style={{backgroundColor: value}}/>
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent side="top" sideOffset={5}>Text color</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-0'>
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const HighlightColorButton = () => {
	const { editor } = useEditorStore();
	
	const value = editor?.getAttributes("highlight").color || "#ffffff";	

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({color: color.hex}).run();
	}

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<HighlighterIcon className='size-4' />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent side="top" sideOffset={5}>Highlight</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-0'>
				<SketchPicker color={value} onChange={onChange} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const LinkButton = () => {
	const { editor } = useEditorStore();
	const [value, setValue] = useState(editor?.getAttributes("link").href || "");

	const onChange = (href: string)=>{
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	}

	// return (
	// 	<Tooltip>
	// 		<TooltipTrigger asChild>
	// 			<DropdownMenu onOpenChange={(open) =>{
	// 				if(open){
	// 					setValue(editor?.getAttributes("link").href || "")
	// 					}
	// 				}}>

	// 				<DropdownMenuTrigger asChild>
	// 					<button
	// 						className={cn(
	// 							"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
	// 						)}>
	// 						<Link2Icon className='size-4' />
	// 					</button>
	// 				</DropdownMenuTrigger>
	// 				<DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
	// 					<Input placeholder='https://example.com' value={value} onChange={(e) => setValue(e.target.value)}/>
	// 					<Button onClick={()=> onChange(value)}>
	// 						Apply
	// 					</Button>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		</TooltipTrigger>
	// 		<TooltipContent>
	// 			<p>Insert Link</p>
	// 		</TooltipContent>
	// 	</Tooltip>
	// )

	return (
        // 1. The DropdownMenu component is the main wrapper
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            {/* 2. The Tooltip component goes inside */}
            <Tooltip>
                <TooltipTrigger asChild>
                    {/* 3. Both triggers wrap the final button */}
                    <DropdownMenuTrigger asChild>
                        <button
                            className={cn(
                                "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm",
                                editor?.isActive("link") && "bg-neutral-200/80"
                            )}>
                            <Link2Icon className='size-4' />
                        </button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Insert link</p>
                </TooltipContent>
            </Tooltip>
            
            {/* 4. The Dropdown content remains at the end */}
            <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
                <Input placeholder='https://example.com' value={value} onChange={(e) => setValue(e.target.value)} />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const ImageButton = () => {
	const { editor } = useEditorStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const onChange = (src: string)=>{
		editor?.chain().focus().setImage({ src }).run();
	}

	const onUpload = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if(file){
				const imageUrl = URL.createObjectURL(file);
				onChange(imageUrl);
			}
		}
		input.click();
	}

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl("");
			setIsDialogOpen(false);
		}
	}

	return (
		<>
			<DropdownMenu>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button
								className={cn(
									"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
								)}>
								<ImageIcon className='size-4' />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Insert Image</p>
					</TooltipContent>
				</Tooltip>
				<DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
							<DropdownMenuItem onClick={onUpload}>
								<UploadIcon className='size-4 mr-2'/>
								Upload
							</DropdownMenuItem>
							<DropdownMenuItem onClick={()=> setIsDialogOpen(true)}>
								<SearchIcon className='size-4 mr-2'/>
								Paste Image Url
							</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Paste Image Url</DialogTitle>
					</DialogHeader>
					<Input
						placeholder='Insert image URL'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if(e.key === "Enter"){
								handleImageUrlSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit}>Insert</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}

export const AlignButton = () => {
	const { editor } = useEditorStore();
	
	const alignments = [
		{
			label: "Align Left",
			value: "left",
			icon: AlignLeftIcon
		},
		{
			label: "Align Center",
			value: "center",
			icon: AlignCenterIcon
		},
		{
			label: "Align Right",
			value: "right",
			icon: AlignRightIcon
		},
		{
			label: "Align Justify",
			value: "justify",
			icon: AlignJustifyIcon
		}
	]

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<AlignLeftIcon className='size-4' />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Align</p>
				</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{alignments.map(({label, value, icon: Icon}) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setTextAlign(value).run()}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 cursor-pointer w-full',
							editor?.isActive({textAlign: value}) && "bg-neutral-200/80")}
						>
						<Icon className='size-4'/>
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const ListButton = () => {
	const { editor } = useEditorStore();

	const lists = [
		{
			label: "Bullet list",
			icon: ListIcon,
			isActive: ()=>editor?.isActive("bulletList"),
			onClick: ()=> editor?.chain().focus().toggleBulletList().run(),
		},
		{
			label: "Ordered List",
			icon: ListOrderedIcon,
			isActive: ()=>editor?.isActive("orderedList"),
			onClick: ()=> editor?.chain().focus().toggleOrderedList().run(),
		},
	]

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 min-w-7 shrink-0 mx-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<ListIcon className='size-4' />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>Add lists</p>
				</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{lists.map(({label, icon: Icon, isActive, onClick}) => (
					<button
						key={label}
						onClick={onClick}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 cursor-pointer w-full',
							isActive() && "bg-neutral-200/80")}
						>
						<Icon className='size-4'/>
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const FontSizeButton = () => {
	const { editor } = useEditorStore();

	const currentFontSize = editor?.getAttributes("textStyle").fontSize
	    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
		: "16";

	const [fontSize, setFontSize] = useState(currentFontSize);
	const [inputValue, setInputValue] = useState(fontSize);
	const [isEditing, setIsEditing] = useState(false);

	const updateFontSize = (newSize: string) => {
		const size = parseInt(newSize);
		if(!isNaN(size) && size > 0){
			editor?.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(newSize);
			setInputValue(newSize);
			setIsEditing(false);
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	}
	const handleInputBlur = () => {
		updateFontSize(inputValue)
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter"){
			e.preventDefault();
			updateFontSize(inputValue)
			editor?.commands.focus();
		}
	}
	const increment = () => {
		const newSize = parseInt(fontSize) + 1;
		updateFontSize(newSize.toString());
	}
	const decrement = () => {
		const newSize = parseInt(fontSize)  - 1;
		if(newSize > 0)
			updateFontSize(newSize.toString());
	}

	return (
		<div className="flex items-center gap-x-2">
			<button onClick={decrement} className="h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
				<MinusIcon className="size-4"/>
			</button>
			{isEditing ? (
				<input 
					type="text"
					value={inputValue}
					onChange={(handleInputChange)}
					onBlur= {handleInputBlur}
					onKeyDown = {handleKeyDown}

					className="h-7 w-10 text-sm border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
				/>
			):
			(
				<Tooltip>
					<TooltipTrigger asChild>
				<button
					onClick={() => {
						setIsEditing(true);
						setFontSize(currentFontSize);
					}}
					className="h-7 w-10 text-sm border border-neutral-400 rounded-sm bg-transparent hover:bg-neutral-200/80">
					{currentFontSize}
				</button>
					</TooltipTrigger>
					<TooltipContent side="top" sideOffset={5}>Font Size</TooltipContent>
				</Tooltip>
			)
			}
			<button onClick={increment} className="h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
				<PlusIcon className="size-4"/>
			</button>
		</div>
	)
}

export const LineHeightButton = () => {
	const { editor } = useEditorStore();
	
	const lineHeights = [
		{label: "Default", value: "normal"},
		{label: "Single", value: "1"},
		{label: "1.15", value: "1.15"},
		{label: "1.5", value: "1.5"},
		{label: "Double", value: "2"},
	]
	
	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<button
							className={cn(
								"h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
							)}>
							<ListCollapseIcon className='size-4' />
						</button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent>
					<p>line height</p>
				</TooltipContent>
			</Tooltip>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{lineHeights.map(({label, value}) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setLineHeight(value).run()}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 cursor-pointer w-full',
							editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80")}
						>
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

interface ToolbarButtonProps {
	onClick?: ()=> void;
	isActive?: boolean;
	icon: LucideIcon;
	label: string; // for tool-tip
	shouldDownTooltip?: boolean 
}

const ToolbarButton = ({onClick, isActive, icon: Icon, label, shouldDownTooltip}: ToolbarButtonProps) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
				onClick={onClick}
				className={cn(
					"text-sm h-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
					isActive && "bg-nuetral-200/80"
				)}
				>
					<Icon className="size-4" />
				</button>
			</TooltipTrigger>
			<TooltipContent side={shouldDownTooltip ? "bottom" : "top"} sideOffset={5}>{label}</TooltipContent>
		</Tooltip>
	)
}
export const Toolbar = () => {
	const { editor } = useEditorStore();

	console.log("Toolbar editor: ", editor);

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick?: ()=>void;
		isActive?: boolean;
		shouldDownTooltip?: boolean
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: ()=> editor?.chain().focus().undo().run(),
				shouldDownTooltip: true
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: ()=> editor?.chain().focus().redo().run(),
				isActive: false,
				shouldDownTooltip: true
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: ()=> window.print(),
				shouldDownTooltip: true
			},
			{
				label: "Spell Check",
				icon: SpellCheckIcon,
				onClick: ()=> {
					const current = editor?.view.dom.getAttribute("spellcheck");
					editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
				},
				shouldDownTooltip: true
			}
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				isActive: editor?.isActive("bold"),
				onClick: ()=> editor?.chain().focus().toggleBold().run(),
				//isActive: editor?.isActive("bold") || false,
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				isActive: editor?.isActive("italic"),
				onClick: ()=> editor?.chain().focus().toggleItalic().run(),
				//isActive: editor?.isActive("bold") || false,
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				isActive: editor?.isActive("underline"),
				onClick: ()=> editor?.chain().focus().toggleUnderline().run(),
				//isActive: editor?.isActive("bold") || false,
			}
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: ()=> editor?.chain().focus().addPendingComment().run(),
				isActive: editor?.isActive("liveblocksCommentMark"), // TODO: Enable this functionality
			},
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: ()=> editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: ()=> editor?.chain().focus().unsetAllMarks().run(),
			},
		]
	];


  return (
	<TooltipProvider delayDuration={0}>
		<div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-3 overflow-x-auto">
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item}
				/>
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingLevelButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontSizeButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{
				sections[1].map((item) => (
					<ToolbarButton key={item.label} {...item}/>
				))
			}
			{/* <TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<TextColorButton />
					</TooltipTrigger>
					<TooltipContent>
						<span>Text Color</span>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider> */}
			<TextColorButton />
			
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HighlightColorButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<div className="flex gap-x-1">
				<LinkButton />
				<ImageButton />
				<AlignButton />
				<LineHeightButton />
				<ListButton />
				<div className="flex gap-x-3">
				{
					sections[2].map((item) => (
						<ToolbarButton key={item.label} {...item}/>
					))
				}</div>
			</div>
		</div>
	</TooltipProvider>
  )
}