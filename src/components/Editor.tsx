import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNoteStore } from "../store/noteStore";
import { useUpdateNote } from "../hooks/useNote";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, darkDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteSchema, createCodeBlockSpec } from "@blocknote/core";
import { createHighlighter } from "./shiki.bundle";
import { fr } from "@blocknote/core/locales";
import { convertFileSrc } from '@tauri-apps/api/core';
import { writeFile, mkdir, exists } from '@tauri-apps/plugin-fs';
import { appDataDir, join } from '@tauri-apps/api/path';

export default function Editor() {
    const [name, setName] = useState<string>("");
    const selectedNote = useNoteStore((state) => state.selectedNote);

    const { mutate } = useUpdateNote();

    async function uploadLocalFile(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const appDataPath = await appDataDir();
        const uploadsDir = await join(appDataPath, 'uploads');

        if (!(await exists(uploadsDir))) {
            await mkdir(uploadsDir, { recursive: true });
        }

        const uniqueFileName = `${Date.now()}-${file.name}`;
        const destinationPath = await join(uploadsDir, uniqueFileName);

        await writeFile(destinationPath, uint8Array);

        return convertFileSrc(destinationPath);
    } catch (error) {
        console.error("Erreur de sauvegarde :", error);
        throw new Error("Impossible d'importer l'image");
    }
}

    const editor = useCreateBlockNote({
        initialContent: selectedNote?.content ? JSON.parse(selectedNote.content) : undefined,
        dictionary: fr,
        uploadFile: uploadLocalFile,
        schema: BlockNoteSchema.create().extend({
            blockSpecs: {
                codeBlock: createCodeBlockSpec({
                    indentLineWithTab: true,
                    defaultLanguage: "typescript",
                    supportedLanguages: {
                        typescript: { name: "TypeScript", aliases: ["ts"] },
                        javascript: { name: "JavaScript", aliases: ["js"] },
                        html: { name: "HTML" },
                        css: { name: "CSS" },
                        python: { name: "Python", aliases: ["py"] },
                        rust: { name: "Rust", aliases: ["rs"] },
                        php: { name: "PHP", aliases: ["php"] },
                    },
                    createHighlighter: () => createHighlighter({themes: ["dark-plus"], langs: []})
                })
            }
        })
    });


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
