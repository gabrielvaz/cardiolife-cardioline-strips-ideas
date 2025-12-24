import React from 'react';

const DashboardControls = () => {
  const tabs = ['Trends', 'Events', 'Timeline', 'Templates', 'Table', 'Report', 'Annotations'];
  
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>Options:</span>
          <select style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '12px', backgroundColor: 'white' }}>
            <option>Leads: ch1, ch2</option>
          </select>
          <select style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '12px', backgroundColor: 'white' }}>
            <option>Show: 2 min</option>
          </select>
          <select style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '12px', backgroundColor: 'white' }}>
            <option>Gain: 5</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e5e7eb' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            style={{
              padding: '8px 4px',
              fontSize: '14px',
              fontWeight: tab === 'Timeline' ? 700 : 400,
              color: tab === 'Timeline' ? '#111827' : '#6b7280',
              borderBottom: tab === 'Timeline' ? '2px solid #f8973d' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardControls;
