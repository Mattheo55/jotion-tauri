import { Note } from "@/db/schema";
import { useDeleteNoteInTrash, useNotes } from "@/hooks/useNote";
import { useConfirm } from "@/provider/ConfirmerProvider";
import { useNavigationStore } from "@/store/navigationStore";
import { useNotebookStore } from "@/store/notebookStore";
import { useNoteStore } from "@/store/noteStore";
import { Calendar1, CommandIcon, File, Trash } from "lucide-react";
import { useState } from "react";
import ButtonSidebar from "./ButtonSidebar";
import {
    Command,
    CommandDialog,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { toast } from "./ui/toast";

export default function JotionCommand() {
    const [open, setOpen] = useState<boolean>(false);

    const confirmer = useConfirm();

    const setSelectedNote = useNoteStore((state) => state.setSelectedNote);
    const setSelectedNotebook = useNotebookStore((state) => state.setSelecedNotebook);
    const setSelectedNotebookById = useNotebookStore((state) => state.setSelecedNotebookById);
    const setSelectedMode = useNavigationStore((state) => state.setSelectedMode);

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
            toast.add({type: 'success', title: "Corbeille vider avec succès"})
            setOpen(false);
        }
    };

    const handleChangeNote = (n: Note) => {
        setSelectedNote(n);
        setSelectedMode('notebook');
        setSelectedNotebookById(n.notebook_id);
        setOpen(false);
    }

    const handleSelectCalendar = () => {
        setSelectedMode('calendar');
        setSelectedNotebook(null);
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
                            <CommandItem onSelect={handleSelectCalendar}><Calendar1 /> Calendrier</CommandItem>
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
