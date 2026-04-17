import React from 'react';

const colorMap = {
  'border-blue-500': {
    border: 'border-blue-500',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    glow: 'shadow-blue-500/10',
  },
  'border-warning-amber': {
    border: 'border-warning-amber',
    text: 'text-warning-amber',
    bg: 'bg-amber-50',
    glow: 'shadow-amber-500/10',
  },
  'border-emergency-red': {
    border: 'border-emergency-red',
    text: 'text-emergency-red',
    bg: 'bg-red-50',
    glow: 'shadow-red-500/10',
  },
  'border-success-green': {
    border: 'border-success-green',
    text: 'text-success-green',
    bg: 'bg-green-50',
    glow: 'shadow-green-500/10',
  },
};

const KPICard = ({ title, value, icon: Icon, colorClass }) => {
  const colors = colorMap[colorClass] || colorMap['border-blue-500'];

  return (
    <div className={`kpi-card bg-white rounded-2xl p-6 shadow-sm border-l-4 ${colors.border} ${colors.glow} hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value ?? '—'}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;
