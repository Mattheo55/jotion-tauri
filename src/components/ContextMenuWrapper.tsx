import { ReactNode } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Delete, Edit, PackageOpen, View } from "lucide-react";

interface ContextMenuWrapperProps {
    children: ReactNode;

    onRename?: () => void;
    onDelete?: () => void;
    onView?: () => void;
    onOpen?: () => void;
}

export default function ContextMenuWrapper({children, onRename, onDelete, onView, onOpen}: ContextMenuWrapperProps) {
  return (
    <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
            <ContextMenuGroup>
                {onRename && <ContextMenuItem onClick={onRename}><Edit/> Renommé</ContextMenuItem>}
                {onView && <ContextMenuItem onClick={onView}><View/> Voir</ContextMenuItem>}
                {onOpen && <ContextMenuItem onClick={onOpen}><PackageOpen/> Ouvrir</ContextMenuItem>}
                {onDelete && <ContextMenuItem onClick={onDelete} variant='destructive'><Delete/> Supprimé</ContextMenuItem>}
            </ContextMenuGroup>
        </ContextMenuContent>
    </ContextMenu>
  )
}
