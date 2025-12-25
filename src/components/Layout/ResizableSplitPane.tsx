'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ResizableSplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialLeftWidth?: number; // percentage or pixels, let's use percentage layout for responsiveness
  minLeftWidth?: number; // pixels
  minRightWidth?: number; // pixels
}

const ResizableSplitPane: React.FC<ResizableSplitPaneProps> = ({ 
  left, 
  right, 
  initialLeftWidth = 40, // 40%
  minLeftWidth = 300, 
  minRightWidth = 300 
}) => {
  const [leftWidthPct, setLeftWidthPct] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = e.clientX - containerRect.left;
      
      // Convert to percentage
      let newLeftPct = (newLeftWidth / containerRect.width) * 100;
      
      // Constraints (approximate in % based on min px widths)
      const minPct = (minLeftWidth / containerRect.width) * 100;
      const maxPct = 100 - ((minRightWidth / containerRect.width) * 100);
      
      if (newLeftPct < minPct) newLeftPct = minPct;
      if (newLeftPct > maxPct) newLeftPct = maxPct;
      
      setLeftWidthPct(newLeftPct);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none'; // Prevent text selection
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging, minLeftWidth, minRightWidth]);

  return (
    <div ref={containerRef} style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ width: `${leftWidthPct}%`, height: '100%', overflow: 'hidden' }}>
        {left}
      </div>
      
      <div 
        onMouseDown={startResize}
        style={{ 
          width: '6px', 
          cursor: 'col-resize', 
          backgroundColor: isDragging ? '#3b82f6' : '#e5e7eb',
          transition: 'background-color 0.2s',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '2px', height: '20px', backgroundColor: isDragging ? 'white' : '#9ca3af', borderRadius: '1px' }} />
      </div>

      <div style={{ width: `${100 - leftWidthPct}%`, height: '100%', overflow: 'hidden' }}>
        {right}
      </div>
    </div>
  );
};

export default ResizableSplitPane;
