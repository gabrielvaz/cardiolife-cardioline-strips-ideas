import React from 'react';

const DashboardHeader = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '16px 0',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ color: '#6b7280', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>←</span> Back
        </button>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#111827' }}>Andrea Matias</h1>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Exam Captured: 10/29/2025 08:00 • Reviewed: 10/30/2025 09:32</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, auto)', gap: '24px', textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>31235674</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Patient ID</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>46</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Age</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Male</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Gender</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>3</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>CRS</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>10/29/2025</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Date</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>2253145</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Exam ID</p>
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>24h 00m</p>
          <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Duration</p>
        </div>
      </div>
    </div>
  );
};


export default DashboardHeader;
