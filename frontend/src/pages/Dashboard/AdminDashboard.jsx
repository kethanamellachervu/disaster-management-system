import React, { useEffect } from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useAuthStore } from '../../store/useAuthStore';
import KPICard from '../../components/KPICard';
import { Users, AlertTriangle, Activity, LogOut, Shield, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { stats, fetchStats, loading } = useDashboardStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [fetchStats]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emergency-red to-red-700">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">RapidRelief</h1>
              <p className="text-xs text-gray-400">Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-green-50 text-success-green text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-success-green rounded-full animate-pulse"></span>
              Live
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role || 'admin'}</p>
            </div>
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-emergency-red hover:bg-red-50 px-3 py-2 rounded-xl text-sm font-medium transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-500 mt-1">Real-time disaster response metrics</p>
            </div>
            <button
              onClick={() => fetchStats()}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:shadow transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </header>

        {/* Loading State */}
        {loading && !stats.totalSurvivors ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="fade-in stagger-1">
                <KPICard 
                  title="Total Survivors" 
                  value={stats.totalSurvivors} 
                  icon={Users}
                  colorClass="border-blue-500" 
                />
              </div>
              <div className="fade-in stagger-2">
                <KPICard 
                  title="Pending Requests" 
                  value={stats.pendingRequests} 
                  icon={Activity}
                  colorClass="border-warning-amber" 
                />
              </div>
              <div className="fade-in stagger-3">
                <KPICard 
                  title="Critical Shortages" 
                  value={stats.criticalShortages} 
                  icon={AlertTriangle}
                  colorClass="border-emergency-red" 
                />
              </div>
              <div className="fade-in stagger-4">
                <KPICard 
                  title="Shelter Capacity" 
                  value={stats.shelterOccupancy} 
                  icon={Activity}
                  colorClass="border-success-green" 
                />
              </div>
            </div>

            {/* Empty State / Placeholder for future charts */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-gray-300 mb-3">
                <Activity className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Activity Feed Coming Soon</h3>
              <p className="text-sm text-gray-400">Real-time logs, charts, and resource allocation data will appear here.</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
