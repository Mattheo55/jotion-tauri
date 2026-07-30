import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SettingsButtonProps {
    children: ReactNode;
    icon: LucideIcon;
    active?: boolean;
    onPress: () => void;
}

export default function SettingsButton({children, icon: Icon, active, onPress}: SettingsButtonProps) {
  return (
    <button onClick={onPress} className={clsx("py-1 px-4 rounded-lg flex flex-row items-center gap-4 w-full cursor-pointer", active ? "bg-white/5" : "hover:bg-white/5")}>
        <Icon size={15}/>
        <p>{children}</p>
    </button>
  )
}
