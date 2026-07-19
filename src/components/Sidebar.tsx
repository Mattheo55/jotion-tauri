import { FolderPlus, Plus } from "lucide-react";
import { useCreateNotebook, useNotebooks } from "../hooks/useNotebook";
import NotebookButton from "./NotebookButton";
import { useState } from "react";
import { useNotebookStore } from "../store/notebookStore";
import { useCreateNote } from "../hooks/useNote";
import { useNoteStore } from "../store/noteStore";
import { Notebook } from "../db/schema";

export default function Sidebar() {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const { data: notebooks = [] } = useNotebooks();
    const { mutate } = useCreateNotebook();
    const {mutate: createNote} = useCreateNote();

    const selectedNotebook = useNotebookStore((state) => state.selectedNotebook)
    const setSelectedNotbook = useNotebookStore((state) => state.setSelecedNote);

    const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

    const handleConfirmNotebookCreate = (name: string) => {
        setIsCreating(false);
        mutate({ name: name.trim() })
    }

    const heandleCreateNote = () => {
        if(!selectedNotebook) return;
        createNote({
            notebook_id: selectedNotebook.id,
            name: "Sans titre",
            content: "",
        })
    }

    const handleChangeNotebook = (n: Notebook) => {
        if(n.id === selectedNotebook?.id) return;

        setSelectedNote(null);
        setSelectedNotbook(n);
    }

    return (
        <div className='bg-[#181818] w-70' data-tauri-drag-region>
            <div className='p-5'><p className='text-white font-bold text-3xl select-none'>Jotion</p></div>

            <div className="p-5">
                <button onClick={heandleCreateNote} className="text-white bg-[#242424] w-full justify-center rounded flex gap-2 py-2 font-bold cursor-pointer"><Plus color="#fff" />{selectedNotebook ? "Nouvelle note" : "Nouveau carnet"}</button>
            </div>

            <div className="mt-2">
                <div className="flex justify-between px-5">
                    <p className="text-[#A3A3A3] font-bold select-none">Carnet</p>
                    <button className="cursor-pointer" onClick={() => setIsCreating(true)}><FolderPlus color={"#A3A3A3"} /></button>
                </div>
                <div className="flex flex-col mt-2">
                    {isCreating && <NotebookButton notebook={{ id: 0, name: "Nouvelle note" }} renaming onRenaming={handleConfirmNotebookCreate} onBlur={() => setIsCreating(false)} />}
                    {
                        notebooks.map(n => (
                            <NotebookButton key={n.id} notebook={n} onPress={() => handleChangeNotebook(n)} active={n.id === selectedNotebook?.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
