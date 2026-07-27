import { create } from "zustand";

export type ViewMode = 'notebook' | 'archive' | 'calendar' | 'trash'

interface NavigationState {
    viewMode: ViewMode;
    setSelectedMode: (mode: ViewMode) => void;

    isNoteSidebarOpen: boolean,
    toggleNoteSidebarOpen: () => void;

    isCommandDiologOpen: boolean,
    toggleCommandDialogOpen: () => void;
    setCommandDialogOpen: (visibility: boolean) => void;
} 

export const useNavigationStore = create<NavigationState>((set) => ({
    viewMode: 'notebook',
    setSelectedMode: (mode: ViewMode) => set({viewMode: mode, isNoteSidebarOpen: true}),

    isNoteSidebarOpen: true,
    toggleNoteSidebarOpen: () => set((state) => ({isNoteSidebarOpen: !state.isNoteSidebarOpen})),

    isCommandDiologOpen: false,
    toggleCommandDialogOpen: () => set((state) => ({isCommandDiologOpen: !state.isCommandDiologOpen})),
    setCommandDialogOpen: (visibility: boolean) => set({isCommandDiologOpen: visibility}),
}))