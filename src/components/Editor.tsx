import { AlertBlock, insertAlert } from "@/block/AlertBlock";
import { insertNoteLink, NoteLinkBlock } from "@/block/NoteLinkBlock";
import { useNotebookById } from "@/hooks/useNotebook";
import { useNavigationStore } from "@/store/navigationStore";
import { useNotebookStore } from "@/store/notebookStore";
import { BlockNoteEditor, BlockNoteSchema, createCodeBlockSpec, filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { fr } from "@blocknote/core/locales";
import { BlockNoteView, darkDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { DefaultReactSuggestionItem, getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { convertFileSrc } from '@tauri-apps/api/core';
import { appDataDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, writeFile } from '@tauri-apps/plugin-fs';
import { Archive, Trash } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useUpdateNote } from "../hooks/useNote";
import { useNoteStore } from "../store/noteStore";
import { createHighlighter } from "./shiki.bundle";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function Editor() {
    const [name, setName] = useState<string>("");
    const selectedNote = useNoteStore((state) => state.selectedNote);
    const selectedNotebook = useNotebookStore((state) => state.selectedNotebook);
    const setSelectedNotebook = useNotebookStore((state) => state.setSelecedNotebook);
    const setSelectNavigation = useNavigationStore((state) => state.setSelectedMode)
    const { mutate } = useUpdateNote();
    const {data: notebook} = useNotebookById(selectedNote?.notebook_id);

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
                alert: AlertBlock(),
                noteLink: NoteLinkBlock(),
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
                        yaml: { name: "Yaml", aliases: ['yaml'] },
                        json: { name: "JSON", aliases: ['json'] },
                    },
                    createHighlighter: () => createHighlighter({themes: ["dark-plus"], langs: []})
                })
            }
        })
    });

    const getCustomSlashMenuItems = (
        editor: BlockNoteEditor,
        ): DefaultReactSuggestionItem[] => [
            ...getDefaultReactSlashMenuItems(editor),
            insertAlert(editor),
            insertNoteLink(editor),
        ];      

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

    const handleChangeNotebook = () => {
        if(!notebook) return;
        setSelectNavigation('notebook');
        setSelectedNotebook(notebook);
    }

    return (
        <>
            <div className="py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-100 break-all">
                <div className="flex px-5 gap-2 items-center pl-10">
                    {selectedNote.archive && <Badge><Archive/> Archivé</Badge>}
                    {selectedNote.trash && <Badge variant={"destructive"}><Trash/> Corbeille</Badge>}
                    {selectedNote.notebook_id !== selectedNotebook?.id && !selectedNote.trash && !selectedNote.archive &&
                        (<Button onClick={handleChangeNotebook}>{notebook?.name}</Button>)
                    }
                    <input
                        className="text-white w-full text-2xl font-bold"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleEventKey}
                    />
                </div>

                <div className="mt-5">
                    <BlockNoteView editor={editor} theme={jotionTheme} onChange={handleSaveContent} slashMenu={false}>
                        <SuggestionMenuController triggerCharacter="/" getItems={async (query) => filterSuggestionItems(getCustomSlashMenuItems(editor as any), query)}/>
                    </BlockNoteView>
                </div>
            </div>
        </>
    );
}
