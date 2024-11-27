import { create } from 'zustand';
import type { ComponentSpec } from '../services/api';

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: ComponentSpec | null;
  isDefault: boolean;
}

interface LayoutStore {
  components: LayoutItem[];
  selectedComponentId: string | null;
  setSelectedComponentId: (id: string | null) => void;
  setComponents: (components: LayoutItem[]) => void;
  addComponent: () => void;
  updateComponentContent: (id: string, component: ComponentSpec) => void;
  undo: () => void;
  history: LayoutItem[][];
}

const DEFAULT_COMPONENT: ComponentSpec = {
  type: 'div',
  props: {
    className: 'h-full w-full flex items-center justify-center text-gray-500',
  },
  children: ['Click to edit this component']
};

const createDefaultLayoutItem = (index: number): LayoutItem => ({
  i: `component-${index}`,
  x: (index * 2) % 12,
  y: Math.floor(index / 6) * 2,
  w: 3,
  h: 2,
  component: DEFAULT_COMPONENT,
  isDefault: true,
});

const INITIAL_COMPONENTS = [
  createDefaultLayoutItem(0),
  createDefaultLayoutItem(1),
  createDefaultLayoutItem(2),
];

export const useLayoutStore = create<LayoutStore>((set) => ({
  components: INITIAL_COMPONENTS,
  selectedComponentId: null,
  history: [],

  setSelectedComponentId: (id) => set({ selectedComponentId: id }),

  setComponents: (components) => {
    set((state) => ({
      components,
      history: [...state.history, state.components],
    }));
  },

  addComponent: () => {
    set((state) => {
      const newComponent = createDefaultLayoutItem(state.components.length);
      return {
        components: [...state.components, newComponent],
        history: [...state.history, state.components],
      };
    });
  },

  updateComponentContent: (id, component) => {
    set((state) => ({
      components: state.components.map((item) =>
        item.i === id ? { ...item, component, isDefault: false } : item
      ),
      selectedComponentId: null,
      history: [...state.history, state.components],
    }));
  },

  undo: () => {
    set((state) => {
      if (state.history.length === 0) return state;
      const newHistory = [...state.history];
      const previousState = newHistory.pop();
      return {
        components: previousState || [],
        history: newHistory,
        selectedComponentId: null,
      };
    });
  },
}));