"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VariantContextType {
  activeVariant: number;
  setActiveVariant: (variant: number) => void;
  variantNames: string[];
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

const INITIAL_VARIANT_NAMES = [
  'V1: Standard Clinical',
  'V2: Overview Timeline',
  'V3: Progressive Disclosure',
  'V4: Expert Mode',
  'V5: Triage Mode',
  'V6: Stack Mode',
  'V7: Focus Review',
  'V8: Realistic Clinical',
  'V9: Sidebar Nav',
  'V10: Right Panel',
  'V11: Inline Strips',
  'V12: Hourly Grid',
  'V13: Heatmap View',
  'V14: Master-Detail'
];



export const VariantProvider = ({ children }: { children: ReactNode }) => {
  const [activeVariant, setActiveVariant] = useState(1);

  return (
    <VariantContext.Provider
      value={{
        activeVariant,
        setActiveVariant,
        variantNames: INITIAL_VARIANT_NAMES,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
};

export const useVariant = () => {
  const context = useContext(VariantContext);
  if (context === undefined) {
    throw new Error("useVariant must be used within a VariantProvider");
  }
  return context;
};
