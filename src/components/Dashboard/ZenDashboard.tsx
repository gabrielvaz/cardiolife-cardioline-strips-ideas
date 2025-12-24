'use client';

import React from 'react';

const ZenDashboard = () => {
  // V8: Realistic Light Mode Clinical Dashboard
  // Clean, professional, high-contrast light theme suitable for clinical review.

  return (
    <div style={{ 
      height: '100%', 
      backgroundColor: '#f3f4f6', // Light Gray Background
      color: '#1f2937', 
      borderRadius: '8px', 
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gap: '24px',
      padding: '24px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Top Section: Key Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) 1.5fr', gap: '16px' }}>
          
             {/* Metric Cards - White with subtle shadow */}
             <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 600 }}>Avg Rate</span>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#2563eb' }}>68 <span style={{fontSize: '12px', color: '#9ca3af', fontWeight: 400}}>bpm</span></div>
             </div>
             <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 600 }}>Max Rate</span>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#ef4444' }}>112 <span style={{fontSize: '12px', color: '#9ca3af', fontWeight: 400}}>bpm</span></div>
             </div>
             <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 600 }}>Min Rate</span>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>45 <span style={{fontSize: '12px', color: '#9ca3af', fontWeight: 400}}>bpm</span></div>
             </div>
             <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6b7280', fontWeight: 600 }}>Total Beats</span>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#374151' }}>102k</div>
             </div>

          {/* Quick Rhythm Strip Preview */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '0', overflow: 'hidden', display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 8, left: 12, fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Current Rhythm • Lead II</div>
                <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none">
                    <path 
                        d="M0 40 L10 40 L15 25 L20 65 L25 40 L50 40 L55 25 L60 65 L65 40 L100 40 L105 25 L110 65 L115 40 L150 40"
                        stroke="#2563eb" 
                        strokeWidth="1.5" 
                        fill="none" 
                    />
                </svg>
          </div>
      </div>

      {/* Main Content: Split View (Table + Detailed List) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', overflow: 'hidden' }}>
        
        {/* Left: Critical Events List (Detailed) */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>Clinical Events Review</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', fontSize: '12px', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white', color: '#374151', cursor: 'pointer' }}>Filter</button>
                    <button style={{ padding: '6px 12px', fontSize: '12px', border: 'none', borderRadius: '6px', background: '#2563eb', color: 'white', cursor: 'pointer' }}>Export PDF</button>
                </div>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f9fafb', color: '#6b7280', position: 'sticky', top: 0 }}>
                        <tr>
                            <th style={{ padding: '12px 24px', fontWeight: 600 }}>Time</th>
                            <th style={{ padding: '12px 24px', fontWeight: 600 }}>Classification</th>
                            <th style={{ padding: '12px 24px', fontWeight: 600 }}>Details</th>
                            <th style={{ padding: '12px 24px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '12px 24px', fontWeight: 600 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { time: '02:14:22', type: 'Ventricular Tachycardia', detail: '18 beats, 160bpm', sev: 'Critical' },
                            { time: '04:30:10', type: 'Pause', detail: '3.2s duration', sev: 'Critical' },
                            { time: '08:15:00', type: 'SVT', detail: '45s duration', sev: 'Warning' },
                            { time: '14:22:11', type: 'Pause', detail: '2.1s duration', sev: 'Warning' },
                            { time: '19:45:33', type: 'Bradycardia', detail: 'Avg 38bpm for 2min', sev: 'Review' },
                            { time: '21:10:05', type: 'AFib', detail: 'Onset detected', sev: 'Review' },
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', color: '#374151' }}>
                                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{row.time}</td>
                                <td style={{ padding: '16px 24px', fontWeight: 600 }}>{row.type}</td>
                                <td style={{ padding: '16px 24px', color: '#6b7280' }}>{row.detail}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        borderRadius: '12px', 
                                        fontSize: '11px', 
                                        fontWeight: 700,
                                        backgroundColor: row.sev === 'Critical' ? '#fee2e2' : row.sev === 'Warning' ? '#fef3c7' : '#e0f2fe',
                                        color: row.sev === 'Critical' ? '#991b1b' : row.sev === 'Warning' ? '#92400e' : '#075985'
                                    }}>
                                        {row.sev}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ color: '#2563eb', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Review &gt;</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Right: Summary List */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
             <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>Daily Statistics</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#4b5563' }}>Recording Duration</span>
                        <span style={{ fontWeight: 600 }}>24h 00m</span>
                    </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#4b5563' }}>Artifacts</span>
                        <span style={{ fontWeight: 600 }}>&lt; 1%</span>
                    </div>
                </div>
             </div>

             <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>AFib Burden</h4>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#374151' }}>12% <span style={{fontSize: '13px', color: '#6b7280', fontWeight: 400}}>of total time</span></div>
                <div style={{ height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ width: '12%', height: '100%', backgroundColor: '#8b5cf6' }} />
                </div>
             </div>
             
             <div style={{ flex: 1 }}></div>

              <button style={{ 
                  width: '100%', padding: '12px', backgroundColor: '#111827', color: 'white', 
                  border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' 
              }}>
                  Generate Final Report
              </button>
        </div>

      </div>

    </div>
  );
};

export default ZenDashboard;
