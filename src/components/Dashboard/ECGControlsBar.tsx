'use client';

import React from 'react';

interface ECGControlsBarProps {
  time?: string;
  hr?: number;
}

const ECGControlsBar = ({ time = '21:09:50', hr = 78 }: ECGControlsBarProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '8px 16px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e5e7eb',
      width: '100%',
      height: '52px' // Fixed height for the bar
    }}>
      <div style={{ fontSize: '14px', color: '#374151', display: 'flex', gap: '8px' }}>
        <span>Time: <span style={{ fontWeight: 700 }}>{time}</span></span>
        <span>•</span>
        <span>HR: <span style={{ fontWeight: 700 }}>{hr}bpm</span></span>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* F1/F2 Buttons */}
        <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb', height: '36px' }}>
          <button style={{ 
            backgroundColor: '#fed7aa', 
            color: '#92400e', 
            padding: '0 16px', 
            fontSize: '12px', 
            fontWeight: 700,
            border: 'none',
            height: '36px',
            cursor: 'pointer'
          }}>F1</button>
          <button style={{ 
            backgroundColor: '#f3f4f6', 
            color: '#6b7280', 
            padding: '0 16px', 
            fontSize: '12px', 
            fontWeight: 700,
            borderLeft: '1px solid #e5e7eb',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            height: '36px',
            cursor: 'pointer'
          }}>F2</button>
        </div>

        {/* Ruler/Caliper Buttons */}
        <div style={{ display: 'flex', gap: '2px', backgroundColor: '#f3f4f6', padding: '2px', borderRadius: '4px', border: '1px solid #e5e7eb', height: '36px', alignItems: 'center' }}>
          {[
            // Mouse Pointer Icon
            <svg key="pointer" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>,
            // Ruler Icon
            <svg key="ruler" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 7.5 2 2"/></svg>,
            // Vertical Ruler
            <svg key="vruler" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="18" x="8" y="3" rx="1"/><path d="M8 8h4"/><path d="M8 12h4"/><path d="M8 16h4"/></svg>,
            // Caliper/Measurement
            <svg key="caliper" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-5h4l-2-2h4"/><path d="M4 20v-5h4l-2-2h4"/><path d="M4 5V3h16v2"/><path d="M4 8V6h16v2"/><path d="M4 11V9h16v2"/></svg>,
            // Annotation
            <svg key="annotation" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          ].map((icon, idx) => (
            <button key={idx} style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: idx === 0 ? '#fed7aa' : 'transparent', 
              color: idx === 0 ? '#92400e' : '#6b7280',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}>{icon}</button>
          ))}
        </div>

        {/* Action Buttons */}
        <button style={{ 
          height: '36px',
          padding: '0 16px', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '4px', 
          fontSize: '12px', 
          fontWeight: 600,
          color: '#374151',
          border: '1px solid #e5e7eb',
          cursor: 'pointer'
        }}>Segmentation</button>
        
        <button style={{ 
          height: '36px',
          padding: '0 16px', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '4px', 
          fontSize: '12px', 
          fontWeight: 600,
          color: '#374151',
          border: '1px solid #e5e7eb',
          cursor: 'pointer'
        }}>Add report</button>
      </div>
    </div>
  );
};

export default ECGControlsBar;
