import { create } from 'zustand';
import api from '../services/api';

export const useDashboardStore = create((set) => ({
  stats: {
    totalSurvivors: 0,
    availableResources: 0,
    pendingRequests: 0,
    criticalShortages: 0,
    shelterOccupancy: '0 / 0'
  },
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/dashboard/stats');
      set({ stats: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));
