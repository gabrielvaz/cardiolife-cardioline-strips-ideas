'use client';

import React from 'react';

interface TestCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  variantName: string;
}

const TestCardModal = ({ isOpen, onClose, variantName }: TestCardModalProps) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: '#1f2937',
        padding: '32px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{variantName}</h2>
            <p style={{ color: '#6b7280', marginTop: '4px' }}>Variant Test Documentation</p>
          </div>
          <button onClick={onClose} style={{ fontSize: '24px', color: '#9ca3af', padding: '4px' }}>✕</button>
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          <section>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '8px', borderLeft: '4px solid #f8973d', paddingLeft: '12px' }}>
              Problem Evidence
            </h3>
            <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb', fontStyle: 'italic', color: '#4b5563' }}>
              [Placeholder: Describe the identified issue that motivated this variant...]
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '8px', borderLeft: '4px solid #f8973d', paddingLeft: '12px' }}>
              Hypothesis Context
            </h3>
            <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb', color: '#4b5563' }}>
              [Placeholder: Explain the reasoning behind this change...]
            </div>
          </section>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', backgroundColor: '#fff' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ backgroundColor: '#f8973d', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>TEST CARD</span>
              Validation Plan
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Insight</label>
                <div style={{ border: '1px solid #e5e7eb', padding: '8px', borderRadius: '4px', minHeight: '60px', backgroundColor: '#f9fafb' }}>[Placeholder]</div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Hypothesis</label>
                <div style={{ border: '1px solid #e5e7eb', padding: '8px', borderRadius: '4px', minHeight: '60px', backgroundColor: '#f9fafb' }}>[Placeholder]</div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>What we will verify</label>
                <div style={{ border: '1px solid #e5e7eb', padding: '8px', borderRadius: '4px', minHeight: '60px', backgroundColor: '#f9fafb' }}>[Placeholder]</div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>How we will measure</label>
                <div style={{ border: '1px solid #e5e7eb', padding: '8px', borderRadius: '4px', minHeight: '60px', backgroundColor: '#f9fafb' }}>[Placeholder]</div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <label style={{ fontWeight: 600, fontSize: '14px', display: 'block', marginBottom: '4px' }}>Validation Criteria</label>
              <div style={{ border: '1px solid #e5e7eb', padding: '12px', borderRadius: '4px', backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
                [Placeholder: Describe the expected result to validate the hypothesis...]
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#111827',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCardModal;
