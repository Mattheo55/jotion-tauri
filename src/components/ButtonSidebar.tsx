import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ButtonSidebarProps {
    children: string;
    icon: LucideIcon;
    onPress?: () => void;
    active?: boolean;
}

export default function ButtonSidebar({children, icon: Icon, onPress, active}: ButtonSidebarProps) {
  return (
    <button onClick={onPress} className={twMerge("flex gap-2 py-2 px-5 cursor-pointer w-full", active ? "bg-gray-400/5": "hover:bg-gray-400/5")}>
        <Icon color={active ? "#fff": "#A3A3A3"} />
        <p className={active ? "text-white" : "text-[#A3A3A3]"}>{children}</p>
    </button>
  )
}
