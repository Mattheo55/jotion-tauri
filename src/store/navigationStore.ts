import { create } from "zustand";

export type ViewMode = 'notebook' | 'archive' | 'calendar' | 'trash'

interface NavigationState {
    viewMode: ViewMode;
    setSelectedMode: (mode: ViewMode) => void;
    isNoteSidebarOpen: boolean,
    toggleNoteSidebarOpen: () => void;
} 

export const useNavigationStore = create<NavigationState>((set) => ({
    viewMode: 'notebook',
    setSelectedMode: (mode: ViewMode) => set({viewMode: mode, isNoteSidebarOpen: true}),
    isNoteSidebarOpen: true,
    toggleNoteSidebarOpen: () => set((state) => ({isNoteSidebarOpen: !state.isNoteSidebarOpen}))
}))