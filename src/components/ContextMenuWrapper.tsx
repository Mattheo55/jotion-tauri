import { Archive, ArchiveRestore, Edit, PackageOpen, Pin, Sparkle, Trash, View } from "lucide-react";
import { ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";

interface ContextMenuWrapperProps {
    children: ReactNode;

    onRename?: () => void;
    onDelete?: () => void;
    onView?: () => void;
    onOpen?: () => void;
    onCorrect?: () => void;
    onArchive?: () => void;
    onRestore?: () => void;
    onPin?: () => void;

    isArchived?: boolean;
    isTrashed?: boolean;
    isPinned?: boolean;
}

export default function ContextMenuWrapper({
    children, 
    onRename, 
    onDelete, 
    onView, 
    onOpen, 
    onCorrect,
    onArchive,
    onRestore,
    onPin,

    isArchived,
    isTrashed,
    isPinned
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
                {onPin && !isArchived && !isTrashed && <ContextMenuItem onClick={onPin}><Pin/> {isPinned ? "Retirer des épingler" : "Epingler"}</ContextMenuItem>}
                {onArchive && <ContextMenuItem onClick={onArchive}><Archive/> {isArchived ? "Retirer des archives" : "Archiver"}</ContextMenuItem>}
                {onRestore && isTrashed && <ContextMenuItem onClick={onRestore}><ArchiveRestore/> Restaurer</ContextMenuItem>}
                {onDelete && <ContextMenuItem onClick={onDelete} variant='destructive'><Trash/> {isTrashed ? "Surpprimer définitivement" : "Supprimer"}</ContextMenuItem>}
            </ContextMenuGroup>
        </ContextMenuContent>
    </ContextMenu>
  )
}
