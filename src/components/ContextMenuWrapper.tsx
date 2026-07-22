import { ReactNode } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Archive, Edit, PackageOpen, Sparkle, Trash, View } from "lucide-react";

interface ContextMenuWrapperProps {
    children: ReactNode;

    onRename?: () => void;
    onDelete?: () => void;
    onView?: () => void;
    onOpen?: () => void;
    onCorrect?: () => void;
    onArchive?: () => void;

    isArchived?: boolean;
}

export default function ContextMenuWrapper({
    children, 
    onRename, 
    onDelete, 
    onView, 
    onOpen, 
    onCorrect,
    onArchive,

    isArchived
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
                {onArchive && <ContextMenuItem onClick={onArchive}><Archive/> {isArchived ? "Retirer des archives" : "Archiver"}</ContextMenuItem>}
                {onDelete && <ContextMenuItem onClick={onDelete} variant='destructive'><Trash/> Supprimer</ContextMenuItem>}
            </ContextMenuGroup>
        </ContextMenuContent>
    </ContextMenu>
  )
}
