import { ReactNode } from "react";

interface SettingPageLayoutProps {
    children?: ReactNode;
    title?: string;
    description?: string;
}

export default function SettingsPageLayout({children, title, description}: SettingPageLayoutProps) {
  return (
    <div className='bg-[#151515] px-20 py-10 w-full'>
        <div className="flex flex-col mb-10">
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-[#E7E7E580]">{description}</p>
        </div>

        <div className="mt-10 h-full">
            {children}
        </div>
    </div>
  )
}
