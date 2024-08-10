// stores/useCellStore.js
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCellStore = create(
  devtools(
    persist(
      (set) => ({
        cells: Array(1000).fill(""),
        history: [],
        redoStack: [],
        updateCell: (index, value) =>
          set((state) => {
            const cells = [...state.cells];
            cells[index] = value;
            const newHistory = [...state.history, state.cells];
            return { cells, history: newHistory, redoStack: [] };
          }),
        undo: () =>
          set((state) => {
            const history = [...state.history];
            const previous = history.pop();
            if (previous) {
              const redoStack = [state.cells, ...state.redoStack];
              return { cells: previous, history, redoStack };
            }
            return state;
          }),
        redo: () =>
          set((state) => {
            const redoStack = [...state.redoStack];
            const next = redoStack.shift();
            if (next) {
              const history = [...state.history, state.cells];
              return { cells: next, history, redoStack };
            }
            return state;
          }),
      }),
      { name: "cell-store" }
    )
  )
);

export default useCellStore;
