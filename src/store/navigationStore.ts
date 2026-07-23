import { create } from "zustand";

export type ViewMode = 'notebook' | 'archive' | 'calendar'

interface NavigationState {
    viewMode: ViewMode;
    setSelectedMode: (mode: ViewMode) => void;
} 

export const useNavigationStore = create<NavigationState>((set) => ({
    viewMode: 'notebook',
    setSelectedMode: (mode: ViewMode) => set({viewMode: mode}),
}))