import { create } from 'zustand';

interface EditStore {
  editMode: boolean;
  selectedComponent: string | null;
  toggleEditMode: () => void;
  setSelectedComponent: (id: string | null) => void;
}

export const useEditStore = create<EditStore>((set) => ({
  editMode: false,
  selectedComponent: null,
  toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
  setSelectedComponent: (id) => set({ selectedComponent: id }),
}));