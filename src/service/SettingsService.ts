import { LazyStore } from "@tauri-apps/plugin-store";
import { defaultSettings, type SettingsInterface } from "@/interface/settingsInterface";

const store = new LazyStore("settings.json");

export async function getSettings(): Promise<SettingsInterface> {
  const saved = await store.get('settings');
  return { ...defaultSettings, ...(saved || {}) };
}

export async function saveSettings(settings: SettingsInterface) {
  await store.set('settings', settings);
  await store.save();
}