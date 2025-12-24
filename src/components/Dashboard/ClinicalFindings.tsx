'use client';

import React from 'react';

const ClinicalFindings = () => {
  const findings = [
    { type: 'critical', title: 'Ventricular Tachycardia', count: 4, time: '02:14:22', details: 'Max rate 180bpm, sustained for 12s on ch1.' },
    { type: 'critical', title: 'Significant Pauses', count: 12, time: '04:30:10', details: 'Longest pause 3.2s. Nocturnal occurrence.' },
    { type: 'warning', title: 'Atrial Fibrillation', count: '14%', time: 'Intermittent', details: 'Burden increased during sleep.' },
    { type: 'info', title: 'Supraventricular Ectopy', count: 2450, time: 'All day', details: 'Isolated events, rare couplets.' },
    { type: 'info', title: 'ST Elevation', count: 0, time: '-', details: 'No significant ST deviation detected.' },
  ];

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#374151', margin: 0 }}>Clinical Narrative Strategy</h3>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>Prioritized by clinical relevance</p>
      </div>

      <div style={{ flex: 1, padding: '16px' }}>
        {findings.map((item, idx) => (
          <div key={idx} style={{ 
            marginBottom: '16px', 
            padding: '16px', 
            borderRadius: '8px', 
            border: `1px solid ${item.type === 'critical' ? '#fee2e2' : item.type === 'warning' ? '#ffedd5' : '#e5e7eb'}`,
            backgroundColor: item.type === 'critical' ? '#fef2f2' : item.type === 'warning' ? '#fff7ed' : '#f9fafb',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: item.type === 'critical' ? '#991b1b' : '#374151' }}>{item.title}</h4>
              <span style={{ 
                backgroundColor: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '11px', 
                fontWeight: 700, 
                border: '1px solid #e5e7eb',
                color: '#6b7280'
              }}>{item.count} events</span>
            </div>
            
            <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>
              {item.details}
            </p>
            
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{ 
                padding: '6px 12px', 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '4px', 
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Go to worst event ({item.time}) →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalFindings;
