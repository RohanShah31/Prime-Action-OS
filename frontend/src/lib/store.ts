import { create } from 'zustand';
import api from './api';

export interface Action {
  id: number;
  action_code: string;
  action_name: string;
  category: string;
  description: string;
  expected_benefit: number;
  implementation_cost: number | null;
  confidence_score: number;
  priority_score: number | null;
  status: string;
  created_at: string | null;
}

interface ActionStore {
  actions: Action[];
  isLoading: boolean;
  setActions: (actions: Action[]) => void;
  updateActionStatus: (id: number, status: string) => Promise<void>;
  fetchActions: () => Promise<void>;
}

export const useActionStore = create<ActionStore>((set, get) => ({
  actions: [],
  isLoading: false,
  setActions: (actions) => set({ actions }),
  
  updateActionStatus: async (id, status) => {
    // Optimistic update
    const previousActions = get().actions;
    set({ actions: previousActions.map(a => a.id === id ? { ...a, status } : a) });
    
    try {
      await api.patch(`/api/actions/${id}/status`, { status });
    } catch (error) {
      // Revert on failure
      set({ actions: previousActions });
      console.error("Failed to update action status", error);
    }
  },
  
  fetchActions: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/api/actions/all');
      set({ actions: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch actions", error);
      set({ isLoading: false });
    }
  }
}));
