import { ReactNode } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";

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
                {onRename && <ContextMenuItem onClick={onRename}>Renommé</ContextMenuItem>}
                {onDelete && <ContextMenuItem onClick={onDelete}>Supprimé</ContextMenuItem>}
                {onView && <ContextMenuItem onClick={onView}>Voire</ContextMenuItem>}
                {onOpen && <ContextMenuItem onClick={onOpen}>Ouvrire</ContextMenuItem>}
            </ContextMenuGroup>
        </ContextMenuContent>
    </ContextMenu>
  )
}
