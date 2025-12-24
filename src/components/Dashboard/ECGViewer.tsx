'use client';

import React from 'react';
import { useVariant } from '@/context/VariantContext';
import ECGControlsBar from './ECGControlsBar';

const ECGViewer = () => {
  const { activeVariant } = useVariant();
  const channels = ['ch 1', 'ch 2', 'ch 3'];
  
  const isExpert = activeVariant === 4;
  const isReview = activeVariant === 5;

  // Helper to generate a dummy ECG path
  const generateECGPath = (width: number, height: number, seed: number) => {
    let path = `M 0 ${height / 2}`;
    const segments = isExpert ? 30 : 20; // More density in Expert mode
    const segmentWidth = width / segments;
    
    for (let i = 1; i <= segments; i++) {
        const x = i * segmentWidth;
        const midX = x - segmentWidth / 2;
        // P-wave
        path += ` L ${midX - 10} ${height / 2 - 2}`;
        path += ` Q ${midX - 5} ${height / 2 - 8}, ${midX} ${height / 2 - 2}`;
        // QRS complex
        const qrsHeight = 30 + (Math.sin(i + seed) * 15);
        path += ` L ${midX + 2} ${height / 2 + 5}`;
        path += ` L ${midX + 5} ${height / 2 - qrsHeight}`;
        path += ` L ${midX + 10} ${height / 2 + 10}`;
        path += ` L ${midX + 12} ${height / 2}`;
        // T-wave
        path += ` Q ${midX + 25} ${height / 2 - 12}, ${midX + 40} ${height / 2}`;
        path += ` L ${x} ${height / 2}`;
    }
    return path;
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <ECGControlsBar />

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', color: '#111827' }}>
            Strips: <span style={{ fontWeight: 700 }}>V1, V2, V3</span> • Scale: <span style={{ fontWeight: 700 }}>25mm/s • 10mm/mV</span>
            </div>
            
            {(isExpert || isReview) && (
              <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#3b82f6', backgroundColor: '#eff6ff', padding: '4px 12px', borderRadius: '4px' }}>Expert Tools Active</span>
              </div>
            )}
        </div>

        <div style={{ position: 'relative', border: '1px solid #f1f5f9', cursor: (isExpert || isReview) ? 'crosshair' : 'default' }}>
            {/* Caliper Simulation Overlay for Expert Mode */}
            {isExpert && (
                <div style={{ position: 'absolute', top: '100px', left: '200px', width: '120px', height: '400px', borderLeft: '2px solid #3b82f6', borderRight: '2px solid #3b82f6', zIndex: 10, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '50%', width: '100%', borderBottom: '1px dashed #3b82f6' }} />
                    <div style={{ backgroundColor: '#3b82f6', color: 'white', position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                        840ms (71 bpm)
                    </div>
                </div>
            )}

            <svg width="100%" height="600" style={{ display: 'block' }}>
            <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="url(#smallGrid)"/>
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#fee2e2" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {channels.map((ch, idx) => (
                <g key={ch} transform={`translate(0, ${idx * 180 + 120})`}>
                <text x="10" y="-80" style={{ fontSize: '11px', fontWeight: 800, fill: '#6b7280', textTransform: 'uppercase' }}>{ch}</text>
                
                {/* Markers */}
                {[150, 450, 750, 1050].map((x, mIdx) => (
                    <g key={mIdx} transform={`translate(${x}, -80)`}>
                        <rect x="-8" y="-12" width="16" height="16" rx="2" fill={mIdx === 2 ? '#fee2e2' : '#f0fdf4'} />
                        <text textAnchor="middle" y="0" style={{ fontSize: '10px', fontWeight: 800, fill: mIdx === 2 ? '#dc2626' : '#16a34a' }}>
                            {mIdx === 2 ? 'V' : 'N'}
                        </text>
                    </g>
                ))}

                <path 
                    d={generateECGPath(1200, 160, idx)} 
                    fill="none" 
                    stroke={idx === 0 ? '#111827' : idx === 1 ? '#1e40af' : '#6b7280'} 
                    strokeWidth="1.5"
                    style={{ opacity: 0.9 }}
                />
                </g>
            ))}
            </svg>
        </div>
        
        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '11px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
                <span>Filter: 0.05 - 150 Hz</span>
                <span>Notch: 60 Hz</span>
            </div>
            <span>Expert Mode Active</span>
        </div>
      </div>
    </div>
  );
};

export default ECGViewer;
