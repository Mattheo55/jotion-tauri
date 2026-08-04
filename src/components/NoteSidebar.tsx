import { Note } from "@/db/schema";
import { useConfirm } from "@/provider/ConfirmerProvider";
import { useNavigationStore } from "@/store/navigationStore";
import clsx from "clsx";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { useDeleteNote, useNoteByView, useUpdateNote } from "../hooks/useNote";
import { useNotebookStore } from "../store/notebookStore";
import { useNoteStore } from "../store/noteStore";
import ContextMenuWrapper from "./ContextMenuWrapper";
import NoteButton from "./NoteButton";

export default function NoteSidebar() {
  const isNoteSidebarOpen = useNavigationStore((state) => state.isNoteSidebarOpen);
  const toggleSidebarOpen = useNavigationStore((state) => state.toggleNoteSidebarOpen)

  const viewMode = useNavigationStore((state) => state.viewMode);
  const selectedNotebook = useNotebookStore((state) => state.selectedNotebook);

  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

  const { data: notes = [] } = useNoteByView(viewMode, selectedNotebook?.id);

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
    if (note.trash === false) {
      updateNote({ id: note.id, trash: true })
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
    updateNote({ id: id, trash: false });
    setSelectedNote(null);
  }

  const handleArchiveNote = (note: Note) => {
    if (selectedNote && selectedNote.id === note.id) {
      setSelectedNote(null);
    }

    updateNote({ id: note.id, archive: !note.archive });
  }

  const handlePinNote = (note: Note) => {
    updateNote({ id: note.id, pinned: !note.pinned })
  }


  return (
    <div className="relative h-full">
      <button className="absolute top-5 -right-8 z-10" onClick={toggleSidebarOpen}>{isNoteSidebarOpen ? <SidebarClose /> : <SidebarOpen />}</button>
      <div className={clsx('h-full bg-[#1C1C1C] overflow-y-hidden transition-all flex flex-col', isNoteSidebarOpen ? "w-70" : "w-0")}>

        <p className='text-white text-2xl p-5'>{sidebarTitle}</p>
        <div className="gap-4 flex flex-col flex-1 px-5 pb-5 overflow-y-auto">
          {
            notes.map(n => (
              <ContextMenuWrapper
                key={n.id}
                onDelete={() => handleDelete(n)}
                onArchive={() => handleArchiveNote(n)}
                onRestore={() => handleRestoreNote(n.id)}
                onPin={() => handlePinNote(n)}

                isArchived={n.archive}
                isTrashed={n.trash}
                isPinned={n.pinned}
              >
                <NoteButton note={n} onPress={() => setSelectedNote(n)} active={n.id === selectedNote?.id} />
              </ContextMenuWrapper>
            ))
          }
        </div>
      </div>
    </div>
  )
}
