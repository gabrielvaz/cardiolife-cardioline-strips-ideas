'use client';

import React from 'react';

const MiniTimeline = () => {
  // Generate dummy event data for density visualization
  const events = Array.from({ length: 100 }, (_, i) => ({
    x: (i / 100) * 100,
    type: Math.random() > 0.8 ? 'pause' : Math.random() > 0.6 ? 'arrhythmia' : 'normal',
    intensity: Math.random()
  }));

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
      padding: '12px 20px',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', margin: 0 }}>Density Timeline (24h)</h4>
        <div style={{ display: 'flex', gap: '12px', fontSize: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#ef4444' }} /> Pauses</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#f59e0b' }} /> Arrhythmias</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#e2e8f0' }} /> Normal</span>
        </div>
      </div>

      
      <div style={{ position: 'relative', height: '40px', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {/* Event density bars */}
        <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', gap: '1px' }}>
          {events.map((e, idx) => (
            <div 
              key={idx} 
              style={{ 
                flex: 1, 
                height: `${e.intensity * 100}%`, 
                backgroundColor: e.type === 'pause' ? '#ef4444' : e.type === 'arrhythmia' ? '#f59e0b' : '#e2e8f0',
                borderRadius: '1px'
              }} 
            />
          ))}
        </div>

        {/* Brush Selector */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: '25%', 
          width: '15%', 
          height: '100%', 
          backgroundColor: 'rgba(59, 130, 246, 0.15)', 
          borderLeft: '2px solid #3b82f6', 
          borderRight: '2px solid #3b82f6',
          cursor: 'grab'
        }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#3b82f6', width: '20px', height: '6px', borderRadius: '3px' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '10px', color: '#9ca3af' }}>
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
  );
};

export default MiniTimeline;
