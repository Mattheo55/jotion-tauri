import { Command, Globe, Info } from "lucide-react";
import { SettingsSection } from "./Settings";
import SettingsButton from "./SettingsButton";

interface SettingsSidebarProps {
    activeSection: SettingsSection;
    setActiveSection: (section: SettingsSection) => void;
}

export default function SettingsSidebar({activeSection, setActiveSection}: SettingsSidebarProps) {
  return (
    <aside className="bg-[#191919] w-70 h-full p-5 border-r-2 border-r-white/10">
        <p className="font-bold">Paramètres</p>

        <div className="flex flex-col mt-5 gap-2">
            <SettingsButton active={activeSection === "general"} onPress={() => setActiveSection("general")} icon={Globe}>Général</SettingsButton>
            <SettingsButton active={activeSection === "shortcut"} onPress={() => setActiveSection("shortcut")} icon={Command}>Raccourcis</SettingsButton>
            <SettingsButton active={activeSection === "about"} onPress={() => setActiveSection("about")} icon={Info}>A propos</SettingsButton>
        </div>
    </aside>
  )
}
