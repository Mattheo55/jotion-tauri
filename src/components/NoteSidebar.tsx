import { useNotesByNotebook } from "../hooks/useNote";
import { useNotebookStore } from "../store/notebookStore"
import { useNoteStore } from "../store/noteStore";
import NoteButton from "./NoteButton";

export default function NoteSidebar() {
  const selectedNotebook = useNotebookStore((state) => state.selectedNotebook);

  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote)

  const {data = []} = useNotesByNotebook(selectedNotebook?.id!);
  

  return (
    <div className='h-full w-70 bg-[#1C1C1C] p-5'>
        <p className='text-white text-2xl'>{selectedNotebook ? selectedNotebook.name : "Séléctionner une note"}</p>
        <div className="mt-5 gap-4 flex flex-col">
          {
            data.map(n => (
              <NoteButton key={n.id} note={n} onPress={() => setSelectedNote(n)} active={n.id === selectedNote?.id}/>
            ))
          }
        </div>
    </div>
  )
}
