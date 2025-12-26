'use client';

import React, { useState } from 'react';
import { useVariant } from '@/context/VariantContext';

// Helper for date formatting
const formatDateUS = (dateStr: string) => {
    // Input: YYYY-MM-DD, Output: MM-DD-YYYY
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[1]}-${parts[2]}-${parts[0]}`;
};

const HRTable = () => {
    const { activeVariant } = useVariant();
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [selectedGridIndex, setSelectedGridIndex] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Generate 24 hours of data
    const generateTableData = () => {
      const data = [];
      const startDate = new Date(2025, 9, 29, 8, 0, 0); 
      
      for (let i = 0; i < 24; i++) {
        const currentHour = new Date(startDate.getTime() + i * 60 * 60 * 1000);
        const year = currentHour.getFullYear();
        const month = String(currentHour.getMonth() + 1).padStart(2, '0');
        const day = String(currentHour.getDate()).padStart(2, '0');
        const hours = String(currentHour.getHours()).padStart(2, '0');
        const minutes = String(currentHour.getMinutes()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        const hourStr = `${hours}:${minutes}`;
        
        data.push({
          fullDate: dateStr,
          fullTime: hourStr,
          hours: `${dateStr} ${hourStr}`,
          beats: (1500 + Math.random() * 1000).toFixed(0),
          mean: Math.floor(60 + Math.random() * 20),
          min: Math.floor(40 + Math.random() * 10),
          max: Math.floor(90 + Math.random() * 60),
          pauses: Math.floor(Math.random() * 5),
          perHour: (2 + Math.random()).toFixed(2), 
          maxPause: (Math.random() * 3.5).toFixed(1),
          events: i % 3 === 0 ? ['S', 'V'] : i % 5 === 0 ? ['P'] : [],
          critical: i === 2 || i === 15,
          severity: i === 2 || i === 15 ? 'Critical' : i % 4 === 0 ? 'Warning' : 'Normal' 
        });
      }
      return data;
    };
  
    const tableData = generateTableData();
  
    const toggleRow = (idx: number) => {
      if (activeVariant !== 3 && activeVariant !== 11) return;
      setExpandedRows(prev => 
        prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
      );
    };
  
    const handleGridClick = (idx: number) => {
        setSelectedGridIndex(idx);
    }
  
    const getPauseColor = (pauses: number, maxPause: string) => {
      const maxP = parseFloat(maxPause);
      if (maxP > 3 || pauses > 10) return '#dc2626'; 
      if (maxP > 2 || pauses > 5) return '#d97706'; 
      return 'inherit';
    };
  
    // --- V1: Standard Clinical ---
    const renderV1Table = () => (
      <div style={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '28%' }}>Interval</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '18%' }}>HR Mean</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '27%' }}>Range (Min-Max)</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '27%' }}>Pauses (Freq/Max)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '10px 16px', fontWeight: 500 }}>
                  <div style={{ fontSize: '11px', color: '#9ca3af', lineHeight: '1.4' }}>{row.fullDate}</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#111827', lineHeight: '1.4' }}>{row.fullTime}</div>
                </td>
                <td style={{ padding: '10px 16px', fontSize: '11px', fontWeight: 700, color: '#111827' }}>{row.mean} <span style={{fontSize: '10px', fontWeight: 400, color: '#9ca3af'}}>bpm</span></td>
                <td 
                  style={{ padding: '10px 16px', whiteSpace: 'nowrap' }} 
                  title={activeVariant === 7 ? `Mean Heart Rate: ${row.mean} bpm` : ''} 
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600 }}>{row.min}</span>
                    <div style={{ height: '4px', width: '40px', backgroundColor: '#e5e7eb', borderRadius: '2px', position: 'relative' }}>
                      <div style={{ 
                        position: 'absolute', 
                        left: `${(row.min / 200) * 100}%`, 
                        right: `${100 - (row.max / 200) * 100}%`, 
                        height: '100%', 
                        backgroundColor: '#9ca3af',
                        borderRadius: '2px'
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>{row.max}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 16px', color: getPauseColor(row.pauses, row.maxPause), fontWeight: parseFloat(row.maxPause) > 2 ? 700 : 400, whiteSpace: 'nowrap' }}>
                  {row.pauses} <span style={{fontSize: '11px', color: '#9ca3af', fontWeight: 400}}>occ.</span> / {row.maxPause}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  
    // --- V2: Overview Timeline ---
    const renderV2Table = () => {
      let lastDate = '';
      return (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '6px 4px 6px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '13%' }}>Time</th>
                <th style={{ padding: '6px 4px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '16%' }}>Total Beats</th>
                <th style={{ padding: '6px 4px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '14%' }}>HR Mean</th>
                <th style={{ padding: '6px 4px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '13%' }}>HR Min</th>
                <th style={{ padding: '6px 4px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '13%' }}>HR Max</th>
                <th style={{ padding: '6px 4px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '15.5%' }}>Per Hour</th>
                <th style={{ padding: '6px 4px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', verticalAlign: 'bottom', fontSize: '10px', width: '15.5%' }}>Max Pause</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => {
                const showDivider = idx === 0 || row.fullDate !== lastDate;
                if (showDivider) lastDate = row.fullDate;
                return (
                  <React.Fragment key={idx}>
                    {showDivider && (
                       <tr style={{ backgroundColor: '#f3f4f6' }}>
                        <td colSpan={7} style={{ padding: '4px 8px 4px 16px', fontWeight: 700, fontSize: '11px', color: '#4b5563', borderBottom: '1px solid #e5e7eb', letterSpacing: '0.5px' }}>
                          {row.fullDate}
                        </td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: idx % 2 === 0 ? 'white' : '#f9fbff' }}>
                      <td style={{ padding: '4px 8px 4px 16px' }}>{row.fullTime}</td>
                      <td style={{ padding: '4px 8px' }}>{row.beats}</td>
                      <td style={{ padding: '4px 8px' }}>{row.mean}</td>
                      <td style={{ padding: '4px 8px', color: '#2563eb', fontWeight: 600 }}>{row.min}</td>
                      <td style={{ padding: '4px 8px' }}>{row.max}</td>
                      <td style={{ padding: '4px 8px' }}>{row.perHour}k</td>
                      <td style={{ padding: '4px 8px', color: parseFloat(row.maxPause) > 2 ? '#d97706' : 'inherit' }}>{row.maxPause}s</td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
      </div>
    )};
  
    // --- V3: Progressive ---
    const renderV3Table = () => (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '30%' }}>Time</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '30%' }}>HR Mean</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: '#6b7280', width: '20%', textAlign: 'right' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => {
              const isExpanded = expandedRows.includes(idx);
              return (
                <React.Fragment key={idx}>
                  <tr 
                    style={{ 
                      borderBottom: isExpanded ? 'none' : '1px solid #f3f4f6', 
                      backgroundColor: isExpanded ? '#f8fafc' : 'transparent',
                      transition: 'background-color 0.2s'
                    }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600 }}>{row.hours}</td>
                    <td style={{ padding: '14px 16px', fontSize: '15px', fontWeight: 700 }}>{row.mean} bpm</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button 
                          onClick={() => toggleRow(idx)}
                          style={{ 
                              background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', 
                              padding: '4px 8px', fontSize: '11px', cursor: 'pointer', color: '#4b5563'
                          }}>
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f3f4f6' }}>
                      <td colSpan={3} style={{ padding: '0 0 0 0' }}>
                          <div style={{ padding: '16px 24px', backgroundColor: '#f8fafc', borderTop: '1px dashed #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                              <div>
                                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Beats</div>
                                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{row.beats}</div>
                              </div>
                              <div>
                                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Pauses</div>
                                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{row.pauses}</div>
                              </div>
                              <div>
                                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Per Hour</div>
                                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{row.perHour}k</div>
                              </div>
                              <div>
                                  <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Max Pause</div>
                                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{row.maxPause}s</div>
                              </div>
                          </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  
    // --- V4 Expert ---
    const renderV4Table = () => (
       <div style={{ height: '100%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '20%' }}>Time</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '20%' }}>Beats</th> 
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '30%' }}>HR Details</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '30%' }}>Events</th> 
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
                  <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 600 }}>{row.fullTime}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{row.fullDate}</div>
                  </td>
                  <td style={{ padding: '12px 16px', verticalAlign: 'top', fontWeight: 600 }}>
                      {row.beats}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px' }}>
                          <div style={{ color: '#3b82f6' }}><span style={{fontWeight: 600, color: '#6b7280'}}>Min:</span> {row.min}</div>
                          <div style={{ color: '#111827' }}><span style={{fontWeight: 600, color: '#6b7280'}}>Mean:</span> {row.mean}</div>
                          <div style={{ color: '#ef4444' }}><span style={{fontWeight: 600, color: '#6b7280'}}>Max:</span> {row.max}</div>
                      </div>
                  </td>
                  <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px' }}>
                          <div><span style={{fontWeight: 600, color: '#6b7280'}}>Pauses:</span> <span style={{color: row.pauses > 0 ? '#ef4444' : 'inherit'}}>{row.pauses}</span></div>
                          <div><span style={{fontWeight: 600, color: '#6b7280'}}>Per Hour:</span> {row.perHour}</div>
                          <div><span style={{fontWeight: 600, color: '#6b7280'}}>Max Pause:</span> {row.maxPause}s</div>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  
    // --- V5: Triage ---
    const renderV5Table = () => {
      let lastDate = '';
      return (
        <div style={{ height: '100%', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
               <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '12%' }}>Time</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '12%' }}>Beats</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '10%' }}>Min</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '10%' }}>Mean</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '10%' }}>Max</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '18%', whiteSpace: 'nowrap' }}>Per Hr</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '18%', whiteSpace: 'nowrap' }}>Max P</th>
                <th style={{ padding: '6px 12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', width: '10%' }}>Pauses</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => {
                const showDivider = row.fullDate !== lastDate;
                if (showDivider) lastDate = row.fullDate;
                return (
                  <React.Fragment key={idx}>
                    {showDivider && (
                      <tr style={{ backgroundColor: '#f3f4f6' }}>
                        <td colSpan={8} style={{ padding: '4px 12px', fontWeight: 700, fontSize: '11px', color: '#4b5563', borderBottom: '1px solid #e5e7eb', letterSpacing: '0.5px' }}>
                          {row.fullDate}
                        </td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: '#fff' }}>
                      <td style={{ padding: '4px 12px', fontWeight: 600 }}>{row.fullTime}</td>
                      <td style={{ padding: '4px 12px' }}>{row.beats}</td>
                      <td style={{ padding: '4px 12px', color: '#3b82f6' }}>{row.min}</td>
                      <td style={{ padding: '4px 12px' }}>{row.mean}</td>
                      <td style={{ padding: '4px 12px', color: '#ef4444' }}>{row.max}</td>
                      <td style={{ padding: '4px 12px' }}>{row.perHour}k</td>
                      <td style={{ padding: '4px 12px' }}>{row.maxPause}s</td>
                      <td style={{ padding: '4px 12px', color: row.pauses > 0 ? '#dc2626' : 'inherit', fontWeight: row.pauses > 0 ? 700 : 400 }}>{row.pauses}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };
  
    // --- V6: Stack Mode (Dynamic Widths, Full Screen, Formatted Date) ---
    const renderV6VerticalTable = () => {
      // Use flex: 1 for content columns to expand them dynamically
      return (
        <div style={{ height: '100%', width: '100%', overflowX: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', minWidth: '100%' }}> {/* Ensure it takes full width */}
              {/* Headers / Row labels */}
              <div style={{ width: '100px', flexShrink: 0, borderRight: '1px solid #e5e7eb', backgroundColor: '#f9fafb', position: 'sticky', left: 0, zIndex: 20 }}>
                   <div style={{ height: '30px', borderBottom: '1px solid #e5e7eb', padding: '6px 12px', fontWeight: 700, fontSize: '11px', color: '#6b7280', backgroundColor: '#f3f4f6' }}>Date</div>
                   <div style={{ height: '40px', borderBottom: '1px solid #e5e7eb', padding: '12px', fontWeight: 700, fontSize: '12px' }}>Time</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#6b7280' }}>Heart Rate</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#6b7280' }}>Beats</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#2563eb' }}>Min</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#ef4444' }}>Max</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#d97706' }}>Pauses</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#6b7280' }}>Per Hour</div>
                   <div style={{ height: '40px', padding: '12px', fontWeight: 600, fontSize: '12px', color: '#d97706' }}>Max Pause</div>
              </div>
  
               {/* Dynamic Content - flex: 1 to fill space */}
              <div style={{ display: 'flex', flex: 1 }}>
                  {tableData.map((col, idx) => {
                      const isNewDay = col.fullTime === '00:00';
                      const isStart = idx === 0;
                      return (
                          <div key={idx} style={{ flex: 1, minWidth: '60px', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>
                              {/* Distinct Date Line - US Format */}
                              <div style={{ height: '30px', borderBottom: '1px solid #e5e7eb', padding: '6px 4px', fontSize: '10px', fontWeight: 700, backgroundColor: '#f3f4f6', color: '#4b5563', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                  {(isStart || isNewDay) ? formatDateUS(col.fullDate) : ''}
                              </div>
                              
                              <div style={{ height: '40px', borderBottom: '1px solid #e5e7eb', padding: '8px 4px', fontSize: '11px', fontWeight: 700, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                  <span>{col.fullTime}</span>
                              </div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px' }}>{col.mean}</div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px' }}>{col.beats}</div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px', color: '#2563eb' }}>{col.min}</div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px', color: '#ef4444' }}>{col.max}</div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px', backgroundColor: col.pauses > 0 ? '#fef2f2' : 'transparent' }}>{col.pauses || '-'}</div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px' }}>{col.perHour}k</div>
                              <div style={{ height: '40px', padding: '12px 4px', fontSize: '12px' }}>{col.maxPause}s</div>
                          </div>
                      )
                  })}
              </div>
          </div>
        </div>
      );
    };
  
    // V11: Accordion
    const renderV11AccordionTable = () => (
       <div style={{ height: '100%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '10px', width: '20%' }}>Time</th>
              <th style={{ padding: '10px', width: '20%' }}>HR</th>
              <th style={{ padding: '10px', width: '20%' }}>Events</th>
              <th style={{ padding: '10px', width: '40%' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => {
              const isExpanded = expandedRows.includes(idx);
              return (
                <React.Fragment key={idx}>
                  <tr 
                      onClick={() => toggleRow(idx)}
                      style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', backgroundColor: isExpanded ? '#eff6ff' : 'white' }}
                  >
                    <td style={{ padding: '12px' }}>{row.hours}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{row.mean} bpm</td>
                    <td style={{ padding: '12px' }}>{row.pauses > 0 ? `${row.pauses} pauses` : 'Normal'}</td>
                    <td style={{ padding: '12px', color: '#3b82f6', fontWeight: 600 }}>{isExpanded ? 'Hide Strip' : 'Show Strip'}</td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={4} style={{ padding: '20px', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>
                        <div style={{ height: '80px', width: '100%', backgroundColor: '#fff', border: '1px solid #e5e7eb', position: 'relative', overflow: 'hidden' }}>
                             <div style={{ position: 'absolute', top: 4, left: 4, fontSize: '10px', color: '#999' }}>SIMULATED STRIP: {row.fullTime}</div>
                             <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none">
                                  <path d="M0 40 L10 40 L15 20 L20 60 L25 40 L50 40 L55 20 L60 60 L65 40 L100 40" stroke="#000" fill="none" vectorEffect="non-scaling-stroke" />
                             </svg>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  
    // --- V12: Grid View (Compact & Organized) ---
    // User requested "Diminua a altura... para caber exatamente a altura dos cards"
    // Content reduced and optimized
    const renderV12Grid = () => (
      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
          gap: '8px',          // Reduced gap
          padding: '8px',      // Reduced padding
          overflowY: 'auto', 
          height: '100%',
          alignContent: 'start'
      }}>
          {tableData.map((row, idx) => {
              const isSelected = selectedGridIndex === idx;
              return (
              <div key={idx} 
                  onClick={() => handleGridClick(idx)}
                  style={{ 
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e5e7eb', 
                      borderRadius: '8px', padding: '8px', 
                      backgroundColor: row.critical ? '#fef2f2' : 'white',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      height: '110px', // Reduced height as requested (was 140)
                      fontSize: '11px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
              }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <div style={{ fontWeight: 700 }}>{row.fullTime}</div>
                      {isSelected && <div style={{ fontSize: '9px', color: '#2563eb', fontWeight: 700 }}>ACTIVE</div>}
                  </div>
                  
                  {/* HR Mean Big + Range */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1f2937' }}>{row.mean}</div>
                      <div style={{ fontSize: '9px', color: '#6b7280' }}>{row.min}-{row.max} bpm</div>
                  </div>
  
                  <div style={{ height: '1px', backgroundColor: '#f3f4f6', margin: '2px 0' }} />
  
                  {/* Compact Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gapY: '2px', fontSize: '9px', color: '#4b5563' }}>
                      <div>{row.beats} bts</div>
                      <div>{row.perHour}k/h</div>
                      <div style={{color: row.pauses > 0 ? '#ef4444' : 'inherit', fontWeight: row.pauses>0?700:400}}>{row.pauses||0} Pse</div>
                      <div>Max {row.maxPause}s</div>
                  </div>
              </div>
          )})}
      </div>
    );
  
    // --- V13: Sidebar List View (Replaces Heatmap) ---
    // User requested "a different table fixed on right side"
    const renderV13SidebarList = () => (
        <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb', fontSize: '11px', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                <span>HOUR</span>
                <span>HR / PAUSE</span>
            </div>
            {tableData.map((row, idx) => (
                <div key={idx} 
                    style={{ 
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 12px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer',
                        backgroundColor: idx % 2 === 0 ? 'white' : '#fafafa'
                    }}
                    className="hover:bg-gray-50"
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px' }}>{row.fullTime}</span>
                        <span style={{ fontSize: '10px', color: '#9ca3af' }}>{row.beats} beats</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                         <div style={{ fontWeight: 700, fontSize: '13px' }}>{row.mean} <span style={{fontSize:'10px', fontWeight:400}}>bpm</span></div>
                         <div style={{ fontSize: '10px', color: row.pauses > 0 ? '#ef4444' : '#6b7280', fontWeight: row.pauses > 0 ? 700 : 400 }}>
                             {row.pauses > 0 ? `${row.pauses} Ps (${row.maxPause}s)` : 'No Events'}
                         </div>
                    </div>
                </div>
            ))}
        </div>
    )
  
  
    const renderDefaultTable = () => (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f9fafb' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Time</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Beats</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Mean</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Min</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Max</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Pauses</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: idx % 2 === 0 ? 'white' : '#f9fbff' }}>
                  <td style={{ padding: '12px 16px' }}>{row.hours}</td>
                  <td style={{ padding: '12px 16px' }}>{row.beats}</td>
                  <td style={{ padding: '12px 16px' }}>{row.mean}</td>
                  <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: 600 }}>{row.min}</td>
                  <td style={{ padding: '12px 16px' }}>{row.max}</td>
                  <td style={{ padding: '12px 16px' }}>{row.pauses}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  
    // Choose Render Mode
    const renderContent = () => {
      switch (activeVariant) {
          case 1: return renderV1Table(); 
          case 2: return renderV2Table(); 
          case 3: return renderV3Table(); 
          case 4: return renderV4Table(); 
          case 5: return renderV5Table(); 
          case 6: return renderV6VerticalTable(); // Updated dynamic
          case 7: return renderV1Table(); 
          
          case 9: return renderV2Table(); 
          case 10: return renderV1Table(); 
          case 11: return renderV11AccordionTable(); 
          case 12: return renderV12Grid(); // Updated cards
          case 13: return renderV13SidebarList(); // Updated sidebar list
          case 14: return renderV2Table(); 
  
          default: return renderDefaultTable();
      }
    }
  
    return (
      <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: isHovered ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 1px 3px rgba(0,0,0,0.1)', 
              transition: 'box-shadow 0.2s',
              overflow: 'hidden', 
              height: [6, 12].includes(activeVariant) ? 'auto' : '100%', 
              display: 'flex', 
              flexDirection: 'column',
              border: isHovered ? '1px solid #d1d5db' : '1px solid transparent'
      }}>
        {/* V13 has special header or no header? Default header is fine. */}
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', flexShrink: 0 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#374151', margin: 0 }}>
            {activeVariant >= 9 ? 'Visual Summary' : 'Heart Rate Summary'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>24 Hours</span>
          </div>
        </div>
  
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {renderContent()}
        </div>
      </div>
    );
  };
  
  export default HRTable;
