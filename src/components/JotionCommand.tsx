import { useConfirm } from "@/provider/ConfirmerProvider";
import {
    Command,
    CommandDialog,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Calendar1, CommandIcon, File, Trash } from "lucide-react";
import { useDeleteNoteInTrash, useNotes } from "@/hooks/useNote";
import ButtonSidebar from "./ButtonSidebar";
import { useState } from "react";
import { useNoteStore } from "@/store/noteStore";
import { Note } from "@/db/schema";

export default function JotionCommand() {
    const [open, setOpen] = useState<boolean>(false);

    const confirmer = useConfirm();

    const setSelectedNote = useNoteStore((state) => state.setSelectedNote)

    const { mutate: deleteNoteInTrash } = useDeleteNoteInTrash();
    const {data: notes = []} = useNotes();

    const handleDeleteNoteInTrash = async () => {
        const isConfirm = await confirmer({
            title: "Vider la corbeille",
            description:
                "Toutes les notes dans la corbeille seront définitivement perdu",
        });

        if (isConfirm) {
            deleteNoteInTrash();
            setOpen(false);
        }
    };

    const handleChangeNote = (n: Note) => {
        setSelectedNote(n);
        setOpen(false);
    }

    return (
        <>
            <ButtonSidebar icon={CommandIcon} onPress={() => setOpen(true)}>
                Commande
            </ButtonSidebar>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput placeholder="Taper une commande ou une recherche" />
                    <CommandList>
                        <CommandGroup heading="Commandes">
                            <CommandItem><Calendar1 /> Calendrier</CommandItem>
                            <CommandItem onSelect={handleDeleteNoteInTrash}><Trash /> Vider la Corbeille</CommandItem>
                        </CommandGroup>
                        <CommandGroup heading="Notes">
                            {
                                notes.map(n => (
                                    <CommandItem key={n.id} value={`${n.name} ${n.id}`} onSelect={() => handleChangeNote(n)}><File /> {n.name}</CommandItem>
                                )) 
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
