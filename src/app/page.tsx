'use client';

import React, { useState } from 'react';
import { useVariant } from '@/context/VariantContext';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardControls from '@/components/Dashboard/DashboardControls';
import HRTable from '@/components/Dashboard/HRTable';
import ECGViewer from '@/components/Dashboard/ECGViewer';
import MiniTimeline from '@/components/Dashboard/MiniTimeline';
import ClinicalFindings from '@/components/Dashboard/ClinicalFindings';
import ZenDashboard from '@/components/Dashboard/ZenDashboard';

import ResizableSplitPane from '@/components/Layout/ResizableSplitPane';

export default function Home() {
  const { activeVariant } = useVariant();

  // Layout Logic
  const isV2 = activeVariant === 2;
  const isV5 = activeVariant === 5;
  const isV6 = activeVariant === 6; // Stack Mode (Vertical)
  
  return (
    <div style={{ padding: '0 24px 24px 24px', backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader />
      
      <div style={{ marginBottom: isV2 ? '48px' : '0' }}> 
         <DashboardControls />
      </div>
      
      {/* V8 Resizable Wrapper */}
      {activeVariant === 8 ? (
          <div style={{ flex: 1, marginTop: '24px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              <ResizableSplitPane 
                left={<HRTable />}
                right={<ECGViewer />}
                initialLeftWidth={40}
              />
               <div style={{ position: 'fixed', bottom: '16px', right: '16px', color: '#111', fontSize: '12px', pointerEvents: 'none', zIndex: 100 }}>Active: V8 - Realistic Resizable</div>
          </div>
      ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: (() => {
               if (activeVariant === 4) return '1fr 3fr'; 
               if (activeVariant === 2) return '600px 1fr'; // V2 Wider to fix overlap
               if (activeVariant === 5) return '560px 1fr'; 
               if (activeVariant === 6) return '1fr'; 
               if (activeVariant === 7) return '400px 1fr'; 
               if (activeVariant === 9) return '352px 1fr'; 
               if (activeVariant === 10) return '1fr 340px'; 
               if (activeVariant === 12) return '1fr'; 
               if (activeVariant === 13) return '1fr 340px'; // V13: Strips Main, Table Right Sidebar
               if (activeVariant === 14) return '1fr'; 
               return '400px 1fr'; // Default
            })(), 
            gridTemplateRows: (() => {
                if (activeVariant === 12) return 'auto 1fr'; 
                if (activeVariant === 14) return '1fr 300px'; 
                return '1fr'; 
            })(),
            gap: activeVariant === 6 ? '8px' : activeVariant === 13 ? '0' : '24px', // No gap for V13 if sidebar style
            marginTop: isV2 ? '0' : '24px',
            alignItems: activeVariant === 6 ? 'start' : 'stretch', 
            flex: 1 
          }}>
            {/* Render Logic Based on Variant */}
            
            {/* Left/Top Content */}
            {![6, 8, 10, 12, 13].includes(activeVariant) && <HRTable />}

            {/* V6: Stack Mode */}
            {activeVariant === 6 && (
                <div style={{ width: '100%', marginBottom: '0px' }}>
                    <HRTable /> 
                </div>
            )}

            {/* V12: Grid Top */}
            {activeVariant === 12 && (
                 <div style={{ overflow: 'hidden' }}><HRTable /></div>
            )}

            {/* V13: Heatmap -> now Fullscreen Strips (Main) */}
            {activeVariant === 13 && <ECGViewer />}
    
            {/* Middle/Bottom Content (ECG normally) */}
            {![13, 14].includes(activeVariant) && <ECGViewer />}
            
            {/* V10 & V13: Right Panel */}
            {activeVariant === 10 && <HRTable />}
            {activeVariant === 13 && (
                <div style={{ borderLeft: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                    <HRTable />
                </div>
            )}

          </div>
      )}

      <div style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        backgroundColor: 'rgba(55, 65, 81, 0.8)',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        pointerEvents: 'none',
        zIndex: 100,
        display: activeVariant === 8 ? 'none' : 'block' // Hide default label for V8
      }}>
        active: V{activeVariant}
      </div>
    </div>
  );
}


