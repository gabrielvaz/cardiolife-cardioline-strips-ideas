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

export default function Home() {
  const { activeVariant } = useVariant();

  // Layout Logic
  const isV2 = activeVariant === 2;
  const isV4 = activeVariant === 4;
  const isV5 = activeVariant === 5;
  const isV6 = activeVariant === 6; // Stack Mode (Vertical)
  const isV7 = activeVariant === 7; // Narrative
  const isV8 = activeVariant === 8; // Zen Mode

  if (isV8) {
    return (
        <div style={{ padding: '0 24px 24px 24px', backgroundColor: '#f3f4f6', minHeight: 'calc(100vh - 64px)' }}>
            <ZenDashboard />
            <div style={{
                position: 'fixed', bottom: '16px', right: '16px', color: '#111', fontSize: '12px', pointerEvents: 'none', zIndex: 100
            }}>Active: Variant 8 - Realistic Clinical</div>
        </div>
    )
  }

  return (
    <div style={{ padding: '0 24px 24px 24px', backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <DashboardHeader />
      
      {/* V5 Toggle Removed as requested */}

      <div style={{ marginBottom: isV2 ? '48px' : '0' }}> {/* V2 Margin increased to 48px */}
         <DashboardControls />
      </div>

        gridTemplateColumns: (() => {
           if (activeVariant === 4) return '1fr 3fr'; // Expert: ECG Dominant
           if (activeVariant === 5) return '480px 1fr'; // Triage (Wider Table)
           if (activeVariant === 6) return '1fr'; // Stack (Vertical)
           if (activeVariant === 7) return '400px 1fr'; // Default Split (HRTable only)
           if (activeVariant === 9) return '320px 1fr'; // Sidebar Nav (Wider)
           if (activeVariant === 10) return '1fr 340px'; // Right Panel (Narrow Right)
           if (activeVariant === 12) return '1fr'; 
           if (activeVariant === 13) return '1fr'; // Heatmap (Vertical Stack)
           if (activeVariant === 14) return '1fr'; // Master Detail (Vertical Stack)
           return '400px 1fr'; // Default (V1, V2, V3, V11)
        })(), 
        gridTemplateRows: (() => {
            // V12, V13, V14 need specific row split
            if (activeVariant === 12) return '1fr 300px'; // Grid Top, Strip Bottom
            if (activeVariant === 13) return '1fr 300px'; // Heatmap Top, Strip Bottom
            if (activeVariant === 14) return '1fr 300px'; // Table Top (Master), Strip Bottom (Detail)
            return '1fr'; // Default
        })(),
        gap: activeVariant === 6 ? '8px' : '24px', // Reduced gap for V6
        marginTop: isV2 ? '0' : '24px',
        alignItems: activeVariant === 6 ? 'start' : 'stretch', 
        flex: 1 
      }}>
        {/* Render Logic Based on Variant */}
        
        {/* Standard Left/Top Placement */}
        {/* V14 now included here because Table is first (Top) */}
        {![6, 10, 12, 13].includes(activeVariant) && <HRTable />}

        {/* V6: Stack Mode */}
        {activeVariant === 6 && (
            <div style={{ width: '100%', marginBottom: '0px' }}> {/* Reduced margin */}
                <HRTable /> 
                {/* Note: HRTable V6 renders its own height via flex column, but parent needs to allow it. */}
            </div>
        )}

        {/* V12: Grid Top */}
        {activeVariant === 12 && (
             <div style={{ overflow: 'hidden' }}><HRTable /></div>
        )}

        {/* V13: Heatmap Top */}
        {activeVariant === 13 && (
             <div style={{ overflow: 'hidden' }}><HRTable /></div>
        )}

        {/* V14: Master Detail (Table First) - Handled by standard placement above? Yes. */}
        {/* So we remove special V14 ECG Viewer top render */}

        {/* Middle/Bottom Content (ECG normally) */}
        {/* If V14, ECG is bottom (Second). */}
        <ECGViewer />
        
        {/* V10: Right Panel */}
        {activeVariant === 10 && <HRTable />}

      </div>


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
        zIndex: 100
      }}>
        Active: V{activeVariant} {isV5 ? '- Triage' : ''} {isV6 ? '- Stack' : ''}
      </div>
    </div>
  );
}


