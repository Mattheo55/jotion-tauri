import { twMerge } from "tailwind-merge";
import { Note } from "../db/schema"

interface NoteButtonProps {
    note: Note,
    onPress: () => void;
    active?: boolean;
}

export default function NoteButton({note, onPress, active}: NoteButtonProps) {
  return (
    <button className={twMerge("flex flex-col p-5 rounded cursor-pointer w-full text-start gap-2", active ? "bg-[#333333]" : "bg-[#232323] hover:bg-[#333333]")} onClick={onPress}>
        <p className="text-white font-bold truncate">{note.name}</p>
        <p className="text-sm text-gray-500">{note.created_at.toLocaleDateString('fr-FR')}</p>
    </button>
  )
}