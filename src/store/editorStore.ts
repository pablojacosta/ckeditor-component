import { create } from "zustand";

interface IUseEditorStore {
  storeShowEditor: boolean;
  setShowEditor: (show: boolean) => void;
}

export const useEditorStore = create<IUseEditorStore>()((set) => ({
  storeShowEditor: true,
  setShowEditor: (show: boolean) =>
    set((state) => ({
      ...state,
      storeShowEditor: show,
    })),
}));
