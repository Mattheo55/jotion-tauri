import { Pin } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Note } from "../db/schema";

interface NoteButtonProps {
    note: Note,
    onPress: () => void;
    active?: boolean;
}

export default function NoteButton({note, onPress, active}: NoteButtonProps) {
  return (
    <button className={twMerge("flex flex-col p-5 rounded cursor-pointer w-full text-start gap-2", active ? "bg-[#333333]" : "bg-[#232323] hover:bg-[#333333]")} onClick={onPress}>
        <div className="flex gap-2 items-center">
          {note.pinned && !note.trash && !note.archive && <Pin size={18}/>}
          <p className="text-white font-bold truncate">{note.name}</p>
        </div>
        <p className="text-sm text-gray-500">{note.created_at.toLocaleDateString('fr-FR')}</p>
    </button>
  )
}