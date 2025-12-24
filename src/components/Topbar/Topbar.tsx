'use client';

import React, { useState } from 'react';
import { useVariant } from '@/context/VariantContext';
import VariantButtonGroup from './VariantButtonGroup';
import TestCardModal from '../TestCardModal/TestCardModal';

const Topbar = () => {
  const { activeVariant, variantNames } = useVariant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed-topbar">
        <div className="flex items-center gap-6" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <VariantButtonGroup />
        </div>

        <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#e5e7eb' }}>
            {variantNames[activeVariant - 1]}
          </span>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
            title="Informações da Variante"
          >
            ⓘ
          </button>
        </div>
      </header>

      <TestCardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        variantName={variantNames[activeVariant - 1]}
      />
    </>
  );
};

export default Topbar;
