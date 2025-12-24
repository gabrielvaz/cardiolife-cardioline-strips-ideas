'use client';

import React from 'react';
import { useVariant } from '@/context/VariantContext';

const VariantButtonGroup = () => {
  const { activeVariant, setActiveVariant } = useVariant();
  const variants = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div style={{
      display: 'inline-flex',
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid #374151'
    }}>
      {variants.map((v) => (
        <button
          key={v}
          onClick={() => setActiveVariant(v)}
          style={{
            height: '32px',
            padding: '0 12px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: activeVariant === v ? '#4b5563' : '#1f2937',
            color: activeVariant === v ? '#ffffff' : '#9ca3af',
            borderRight: v === 14 ? 'none' : '1px solid #374151',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            if (activeVariant !== v) e.currentTarget.style.backgroundColor = '#374151';
          }}
          onMouseOut={(e) => {
            if (activeVariant !== v) e.currentTarget.style.backgroundColor = '#1f2937';
          }}
        >
          V{v}
        </button>
      ))}
    </div>
  );
};

export default VariantButtonGroup;
