import { useNotesByNotebook } from "@/hooks/useNote";
import { useNotebookStore } from "@/store/notebookStore";
import { useNoteStore } from "@/store/noteStore";
import { BlockNoteEditor } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Link } from "lucide-react";

export const NoteLinkBlock = createReactBlockSpec({
    type: "noteLink",
    propSchema: {
        note: {default: ""},
        noteTitle: {default: ""}
    },
    content: "none",   
}, {
    render: (props) => {
        const selectedNotebook = useNotebookStore((state) => state.selectedNotebook);
        const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

        const {note, noteTitle} = props.block.props;

        const {data = []} = useNotesByNotebook(selectedNotebook?.id!)

        const handleChangeProps = (value: number) => {
            const selected = data.find(n => n.id === value);
            if(selected) {
                props.editor.updateBlock(props.block, {
                    props: {
                        note: String(selected.id),
                        noteTitle: (selected.name)
                    }
                })
            }
        }

        if(!note) {
            return (
                <div>
                    <select onChange={(e) => handleChangeProps(Number(e.target.value))}>
                        <option>-- Séléctionner une note</option>
                        {
                            data.map(n => (
                                <option key={n.id} value={n.id}>{n.name}</option>
                            ))
                        }
                    </select>
                </div>
            )
        }

        return (
            <div onClick={() => setSelectedNote(data.find(n => n.id === Number(note))!)} className="flex gap-2 cursor-pointer">
                <Link/>
                <p>{noteTitle}</p>
            </div>
        )
    }
})

export const insertNoteLink = (editor: BlockNoteEditor) => ({
    title: "Lien vers une note",
    subtext: "Ajouter un lien vers une note",
    group: "Jotion",
    icon: <Link/>,
    onItemClick: () => editor.insertBlocks([{type: "noteLink" as any}], editor.getTextCursorPosition().block)
})