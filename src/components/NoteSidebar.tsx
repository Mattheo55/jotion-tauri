import { useConfirm } from "@/provider/ConfirmerProvider";
import { useDeleteNote, useNoteByView, useUpdateNote } from "../hooks/useNote";
import { useNotebookStore } from "../store/notebookStore"
import { useNoteStore } from "../store/noteStore";
import ContextMenuWrapper from "./ContextMenuWrapper";
import NoteButton from "./NoteButton";
import { Note } from "@/db/schema";
import { useNavigationStore } from "@/store/navigationStore";

export default function NoteSidebar() {
  const viewMode = useNavigationStore((state) => state.viewMode);
  const selectedNotebook = useNotebookStore((state) => state.selectedNotebook);

  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

  const {data: notes = []} = useNoteByView(viewMode, selectedNotebook?.id);

  let sidebarTitle = "";

  switch (viewMode) {
    case 'notebook':
      sidebarTitle = selectedNotebook?.name ?? "Séléctionner une note";
      break;
    case 'archive':
      sidebarTitle = "Archive";
      break;
    case 'trash':
      sidebarTitle = "Corbeille";
      break;
    default:
      sidebarTitle = "Séléctionner une note";
      break;
  }

  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote } = useDeleteNote();

  const confirm = useConfirm();

  const handleDelete = async (note: Note) => {
    if(note.trash === false) {
      updateNote({id: note.id, trash: true})
      setSelectedNote(null);
      return;
    }

    const isConfirm = await confirm({
      title: `Supprimée ${note.name}`,
      description: 'Voulez vous vraimant supprimer définitevement cette note ?',
    });

    if (isConfirm) {
      if (selectedNote && selectedNote.id === note.id) setSelectedNote(null);
      deleteNote(note.id);
    }
  }

  const handleRestoreNote = (id: number) => {
    updateNote({id: id, trash: false});
    setSelectedNote(null);
  }

  const handleArchiveNote = (note: Note) => {
    if(selectedNote && selectedNote.id === note.id) {
      setSelectedNote(null);
    }

    updateNote({id: note.id, archive: !note.archive});
  }


  return (
    <div className='h-full w-70 bg-[#1C1C1C] p-5'>
      <p className='text-white text-2xl'>{sidebarTitle}</p>
      <div className="mt-5 gap-4 flex flex-col">
        {
          notes.map(n => (
            <ContextMenuWrapper 
              key={n.id} 
              onDelete={() => handleDelete(n)} 
              onCorrect={() => { }}
              onArchive={() => handleArchiveNote(n)}
              onRestore={() => handleRestoreNote(n.id)}

              isArchived={n.archive}
              isTrashed={n.trash}
            >
              <NoteButton note={n} onPress={() => setSelectedNote(n)} active={n.id === selectedNote?.id} />
            </ContextMenuWrapper>
          ))
        }
      </div>
    </div>
  )
}
