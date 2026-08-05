import React, { useEffect, useState } from 'react';

export interface ProviderRecord {
  providerId: string;
  npi: string;
  taxonomyCode: string;
  credentialingStatus: string;
}

export const ProviderDirectoryView: React.FC = () => {
  const [providers, setProviders] = useState<ProviderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/v1/providers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProviders(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load providers:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Provider Directory...</div>;

  return (
    <div className="provider-directory-container">
      <h3>Active Healthcare Provider Directory</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '8px' }}>NPI</th>
            <th style={{ padding: '8px' }}>Taxonomy Code</th>
            <th style={{ padding: '8px' }}>Credentialing Status</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.providerId} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px' }}>{p.npi}</td>
              <td style={{ padding: '8px' }}>{p.taxonomyCode}</td>
              <td style={{ padding: '8px' }}>
                <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                  {p.credentialingStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
