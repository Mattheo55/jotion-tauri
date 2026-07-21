import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNoteStore } from "../store/noteStore";
import { useUpdateNote } from "../hooks/useNote";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

export default function Editor() {
    const [name, setName] = useState<string>("");
    const selectedNote = useNoteStore((state) => state.selectedNote);

    const { mutate } = useUpdateNote();

    const editor = useCreateBlockNote({initialContent: selectedNote?.content ? JSON.parse(selectedNote.content) : undefined});
    const jotionTheme = {...darkDefaultTheme, colors: {...darkDefaultTheme.colors, editor: {background: '#181818'}}};

    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (selectedNote) {
            setName(selectedNote.name);
        }
    }, [selectedNote]);

    if (!selectedNote) return;

    const handleEventKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleChangeNoteName();
        }
    };

    const handleChangeNoteName = () => {
        mutate({ id: selectedNote.id, name: name });
    };

    const handleSaveContent = () => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            const currentContent = editor.document;
            
            mutate({ 
                id: selectedNote.id, 
                content: JSON.stringify(currentContent) 
            });
            
            console.log("Sauvegarde BlockNote réussie !");
        }, 1000);
    };

    return (
        <div className="p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-100">
            <input
                className="text-white w-full text-2xl font-bold"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleEventKey}
            />

            <div className="mt-5">
                <BlockNoteView editor={editor} theme={jotionTheme} onChange={handleSaveContent} />
            </div>
        </div>
    );
}
