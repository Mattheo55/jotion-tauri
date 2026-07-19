import { Folder, FolderOpen } from "lucide-react";
import { Notebook } from "../db/schema";
import { KeyboardEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface NotebookButtonProps {
    onPress?: () => void;
    onRenaming?: (n: string) => void;
    onBlur?: () => void;
    renaming?: boolean;
    active?: boolean;
    notebook: Notebook;
} 

export default function NotebookButton({notebook, renaming, onPress, active, onRenaming, onBlur}: NotebookButtonProps) {
    const [name, setName] = useState<string>(notebook.name);

    useEffect(() => {
        setName(notebook.name)
    }, [notebook.name]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && onRenaming) {
            onRenaming(name);
        }
    }

  return (
    <button className={twMerge("flex gap-2 py-2 px-5 cursor-pointer", active ? "bg-gray-400/5": "hover:bg-gray-400/5")} onClick={onPress}>
        {active ? <FolderOpen color={"#fff"}/> : <Folder color={"#A3A3A3"}/>}
        {renaming ? <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className="text-white" onKeyDown={handleKeyDown} onBlur={onBlur}/> : <p className={active ? "text-white" : "text-[#A3A3A3]"}>{notebook.name}</p>}
    </button>
  )
}
