import clsx from "clsx";
import { ReactNode } from "react";
import Divider from "../Divider";

interface SettingsInputLayoutProps {
    title: string;
    descritpion?: string;
    children: ReactNode;
    boldTitle?: boolean
}

export default function SettingsInputLayout({title, descritpion, children, boldTitle = true}: SettingsInputLayoutProps) {
  return (
    <div>
        <Divider/>
        <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-col">
                <p className={clsx(boldTitle && "font-bold")}>{title}</p>
                <p className="text-[#E7E7E580]">{descritpion}</p>
            </div>
            {children}
        </div>
    </div>
  )
}
