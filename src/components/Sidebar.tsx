import { useConfirm } from "@/provider/ConfirmerProvider";
import { useNavigationStore } from "@/store/navigationStore";
import { Archive, Calendar1, FolderPlus, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Notebook } from "../db/schema";
import { useCreateNote } from "../hooks/useNote";
import { useCreateNotebook, useDeleteNotebook, useNotebooks, useUpdateNotebook } from "../hooks/useNotebook";
import { useNotebookStore } from "../store/notebookStore";
import { useNoteStore } from "../store/noteStore";
import ButtonSidebar from "./ButtonSidebar";
import ContextMenuWrapper from "./ContextMenuWrapper";
import JotionCommand from "./JotionCommand";
import NotebookButton from "./NotebookButton";
import SettingDialog from "./SettingDialog";
import TitleMenuButtons from "./TitleMenuButtons";

export default function Sidebar() {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [renamingId, setRenamingId] = useState<number | null>(null);

    const { data: notebooks = [] } = useNotebooks();
    const { mutate } = useCreateNotebook();
    const { mutate: createNote } = useCreateNote();
    const { mutate: updateNotebook } = useUpdateNotebook();
    const {mutate: deleteNotebook} = useDeleteNotebook();

    const selectedNotebook = useNotebookStore((state) => state.selectedNotebook)
    const setSelectedNotbook = useNotebookStore((state) => state.setSelecedNotebook);
    const setNavigationMode = useNavigationStore((state) => state.setSelectedMode);
    const viewMode = useNavigationStore((state) => state.viewMode);

    const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

    const confirm = useConfirm();

    const handleConfirmNotebookCreate = (name: string) => {
        setIsCreating(false);
        mutate({ name: name.trim() })
    }

    const handleConfirmRenaiming = async (newName: string) => {
        updateNotebook({ id: renamingId!, name: newName });
        const currentNotebook = notebooks.find(n => n.id === renamingId);
        if (currentNotebook) {
            setSelectedNotbook({ ...currentNotebook, name: newName });
            setSelectedNote(null);
        }
        setRenamingId(null);
    }

    const heandleCreateNote = () => {
        if (!selectedNotebook) return;
        createNote({
            notebook_id: selectedNotebook.id,
            name: "Sans titre",
            content: "",
        })
    }

    const handleDeleteNotebook = async (id: number) => {
        const isComfirm = await confirm({
            title: "Supprimer un carnet",
            description: "Voulez vous vraimant supprimer ce carnet ?"
        });

        if(isComfirm) {
            deleteNotebook(id);
            if(selectedNotebook && selectedNotebook.id === id) {
                setSelectedNotbook(null);
                setSelectedNote(null);
            }
        }
    }

    const handleChangeNotebook = (n: Notebook) => {
        if (n.id === selectedNotebook?.id) return;

        setSelectedNote(null);
        setSelectedNotbook(n);
        setNavigationMode('notebook')
    }

    const handleShowArchive = () => {
        setNavigationMode("archive");
        setSelectedNotbook(null);
        setSelectedNote(null);
    }

    const handleShowCalendar = () => {
        setNavigationMode('calendar');
        setSelectedNotbook(null);
        setSelectedNote(null);
    }

    const handleShowTrash = () => {
        setNavigationMode('trash');
        setSelectedNotbook(null);
        setSelectedNote(null);
    }

    return (
        <div className='bg-[#181818] w-65' data-tauri-drag-region>
            <div className="flex items-center justify-between p-5" data-tauri-drag-region>
                <p className='text-white font-bold text-xl select-none' data-tauri-drag-region>Jotion</p>
                <TitleMenuButtons />
            </div>

            <div className="p-5">
                <button onClick={heandleCreateNote} disabled={!selectedNotebook} className="text-white bg-[#242424] w-full justify-center rounded flex gap-2 py-2 font-bold cursor-pointer"><Plus color="#fff" />Nouvelle note</button>
            </div>

            <div className="my-5">
                <SettingDialog/>
                <ButtonSidebar active={viewMode === "archive"} icon={Archive} onPress={handleShowArchive}>Archive</ButtonSidebar>
                <ButtonSidebar active={viewMode === "trash"} icon={Trash} onPress={handleShowTrash}>Corbeille</ButtonSidebar>
                <ButtonSidebar active={viewMode === "calendar"} onPress={handleShowCalendar} icon={Calendar1}>Calendrier</ButtonSidebar>
                <JotionCommand/>
            </div>

            <div className="mt-2">
                <div className="flex justify-between px-5">
                    <p className="text-[#A3A3A3] font-bold select-none">Carnet</p>
                    <button className="cursor-pointer" onClick={() => setIsCreating(true)}><FolderPlus color={"#A3A3A3"} /></button>
                </div>
                <div className="flex flex-col mt-2 flex-1">
                    {isCreating && <NotebookButton notebook={{ id: 0, name: "Nouvelle note" }} renaming onRenaming={handleConfirmNotebookCreate} onBlur={() => setIsCreating(false)} />}
                    {
                        notebooks.map(n => (
                            <ContextMenuWrapper
                                key={n.id}
                                onRename={() => setRenamingId(n.id)}
                                onDelete={() => handleDeleteNotebook(n.id)}
                            >
                                <NotebookButton notebook={n} onPress={() => handleChangeNotebook(n)} onRenaming={(newName) => handleConfirmRenaiming(newName)} onBlur={() => setRenamingId(null)} active={n.id === selectedNotebook?.id} renaming={renamingId === n.id} />
                            </ContextMenuWrapper>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
