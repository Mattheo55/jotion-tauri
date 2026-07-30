import { SettingsInterface } from "@/interface/settingsInterface";
import { getSettings } from "@/service/SettingsService";
import { useEffect, useState } from "react";
import About from "./About";
import GeneralSettingsSection from "./GeneralSettingsSection";
import SettingsSidebar from "./SettingsSidebar";
import Shortcut from "./Shortcut";

export const SETTINGS_SECTIONS = {
  general: GeneralSettingsSection,
  about: About,
  shortcut: Shortcut
} as const;

export type SettingsSection = keyof typeof SETTINGS_SECTIONS;

export default function Settings() {
  const [settings, setSettings] = useState<SettingsInterface | null>(null);
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");

  const ActiveSection = SETTINGS_SECTIONS[activeSection];

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleUpdate = (category: keyof SettingsInterface, key: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    });
  };

  if(!settings) return;

  return (
    <div className="flex flex-row flex-1">
      <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection}/>
      <div className="flex flex-1">
        <ActiveSection settings={settings} updateSettings={handleUpdate}/>
      </div>
    </div>
  )
}
