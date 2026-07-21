import { useConfirm } from "@/provider/ConfirmerProvider";
import { useDeleteNote, useNotesByNotebook } from "../hooks/useNote";
import { useNotebookStore } from "../store/notebookStore"
import { useNoteStore } from "../store/noteStore";
import ContextMenuWrapper from "./ContextMenuWrapper";
import NoteButton from "./NoteButton";
import { Note } from "@/db/schema";
import { not } from "drizzle-orm";

export default function NoteSidebar() {
  const selectedNotebook = useNotebookStore((state) => state.selectedNotebook);

  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote)

  const {data = []} = useNotesByNotebook(selectedNotebook?.id!);

  const {mutate: deleteNote} = useDeleteNote();

  const confirm = useConfirm();

  const handleDelete = async (note: Note) => {
    const isConfirm = await confirm({
      title: `Supprimée ${note.name}`,
      description: 'Ouais',
    });

    if(isConfirm) {
      if(selectedNote && selectedNote.id === note.id) setSelectedNote(null);
      deleteNote(note.id);
    }
  }

  return (
    <div className='h-full w-70 bg-[#1C1C1C] p-5'>
        <p className='text-white text-2xl'>{selectedNotebook ? selectedNotebook.name : "Séléctionner une note"}</p>
        <div className="mt-5 gap-4 flex flex-col">
          {
            data.map(n => (
              <ContextMenuWrapper key={n.id} onDelete={() => handleDelete(n)} onCorrect={() => {}}>
                <NoteButton note={n} onPress={() => setSelectedNote(n)} active={n.id === selectedNote?.id}/>
              </ContextMenuWrapper>
            ))
          }
        </div>
    </div>
  )
}
