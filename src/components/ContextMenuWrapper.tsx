import { ReactNode } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Edit, PackageOpen, Sparkle, Trash, View } from "lucide-react";

interface ContextMenuWrapperProps {
    children: ReactNode;

    onRename?: () => void;
    onDelete?: () => void;
    onView?: () => void;
    onOpen?: () => void;
    onCorrect?: () => void;
}

export default function ContextMenuWrapper({
    children, 
    onRename, 
    onDelete, 
    onView, 
    onOpen, 
    onCorrect
}: ContextMenuWrapperProps) {
  return (
    <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
            <ContextMenuGroup>
                {onRename && <ContextMenuItem onClick={onRename}><Edit/> Renommer</ContextMenuItem>}
                {onView && <ContextMenuItem onClick={onView}><View/> Voir</ContextMenuItem>}
                {onOpen && <ContextMenuItem onClick={onOpen}><PackageOpen/> Ouvrir</ContextMenuItem>}
                {onCorrect && <ContextMenuItem onClick={onOpen}><Sparkle/> Corriger</ContextMenuItem>}
                {onDelete && <ContextMenuItem onClick={onDelete} variant='destructive'><Trash/> Supprimer</ContextMenuItem>}
            </ContextMenuGroup>
        </ContextMenuContent>
    </ContextMenu>
  )
}
