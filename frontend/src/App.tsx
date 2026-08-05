import React from 'react';

export function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ color: '#0f172a', margin: 0 }}>Healthcare Enterprise Management Platform (HEMP)</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Enterprise AI Platform v3.0 / EHP-OS Operational Portal</p>
      </header>

      <main>
        <section style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#1e293b' }}>Provider Directory Search</h2>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input type="text" placeholder="Search NPI..." style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', flex: 1 }} />
            <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
              Search Directory
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
