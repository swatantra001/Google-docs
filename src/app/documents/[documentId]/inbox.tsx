"use client"

import { ClientSideSuspense } from "@liveblocks/react"
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import { BellIcon } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const InboxMenu = () => {

	const { inboxNotifications: notifications } = useInboxNotifications();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="ghost" className="relative" size="icon">
						<BellIcon className="size-4" />
						{notifications.length > 0 && (
							<span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
								{notifications.length}
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-auto">
					{notifications.length > 0 ? (
						<InboxNotificationList>
							{notifications.map((notification) => (
								<InboxNotification key={notification.id} inboxNotification={notification} />
							))}
						</InboxNotificationList>
					) : (
						<div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
							No notifications
						</div>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Separator orientation="vertical" className="h-6"/>
		</>
	)
}

export const Inbox = () => {
	return (
		<ClientSideSuspense fallback={
			<>
				<Button variant="ghost" disabled className="relative" size="icon">
					<BellIcon className="size-4" />
				</Button>
				<Separator orientation="vertical" className="h-6" />
			</>
		}>
			<InboxMenu />
		</ClientSideSuspense>
	)
}