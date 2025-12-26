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
        {/* Playback Controls */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            // Fast Backward
            <svg key="rewind" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>,
            // Step Backward
            <svg key="back" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
            // Play
            <svg key="play" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
            // Step Forward
            <svg key="next" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
            // Fast Forward
            <svg key="forward" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>,
          ].map((icon, idx) => (
            <button key={idx} style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: '#eff6ff', 
              color: '#1f2937',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
            >{icon}</button>
          ))}
        </div>

        {/* Close Button */}
        <button style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#eff6ff', 
            color: '#1f2937',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            marginRight: '12px',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#fee2e2'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* F1/F2 Buttons */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { label: 'F1', active: true },
            { label: 'F2', active: false }
          ].map((btn, idx) => (
            <button key={idx} style={{ 
              backgroundColor: btn.active ? '#dbeafe' : '#eff6ff', 
              color: btn.active ? '#1e40af' : '#1f2937', 
              padding: '0 16px', 
              fontSize: '12px', 
              fontWeight: 700,
              borderRadius: '8px',
              border: 'none',
              height: '40px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = btn.active ? '#dbeafe' : '#eff6ff'}
            >{btn.label}</button>
          ))}
        </div>

        {/* Editing Tools */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
          {[
            // Mouse Pointer Icon
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>, active: true },
            // Ruler Icon
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 7.5 2 2"/></svg>, active: false },
            // Vertical Ruler
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="18" x="8" y="3" rx="1"/><path d="M8 8h4"/><path d="M8 12h4"/><path d="M8 16h4"/></svg>, active: false },
            // Caliper/Measurement
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-5h4l-2-2h4"/><path d="M4 20v-5h4l-2-2h4"/><path d="M4 5V3h16v2"/><path d="M4 8V6h16v2"/><path d="M4 11V9h16v2"/></svg>, active: false },
            // Annotation
            { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, active: false }
          ].map((tool, idx) => (
            <button key={idx} style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: tool.active ? '#dbeafe' : '#eff6ff', 
              color: tool.active ? '#1e40af' : '#1f2937',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = tool.active ? '#dbeafe' : '#eff6ff'}
            >{tool.icon}</button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
          {['Segmentation', 'Add report'].map((label, idx) => (
            <button key={idx} style={{ 
              height: '40px',
              padding: '0 16px', 
              backgroundColor: '#eff6ff', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: 600,
              color: '#1f2937',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#eff6ff'}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ECGControlsBar;
