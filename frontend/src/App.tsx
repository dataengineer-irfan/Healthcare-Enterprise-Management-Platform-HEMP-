import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProviderPage } from './pages/ProviderPage';
import { MemberPage } from './pages/MemberPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AdminPage } from './pages/AdminPage';
import { AiStudioPage } from './pages/AiStudioPage';
import { ProfilePage } from './pages/ProfilePage';
import { AccessDeniedPage } from './pages/AccessDeniedPage';
import { NotFoundPage } from './pages/NotFoundPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }
  return <>{children}</>;
};

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="providers" element={<ProtectedRoute allowedRoles={['Admin', 'Provider']}><ProviderPage /></ProtectedRoute>} />
              <Route path="members" element={<ProtectedRoute allowedRoles={['Admin', 'Member']}><MemberPage /></ProtectedRoute>} />
              <Route path="claims" element={<ProtectedRoute allowedRoles={['Admin']}><ClaimsPage /></ProtectedRoute>} />
              <Route path="contacts" element={<ProtectedRoute allowedRoles={['Admin']}><DashboardPage /></ProtectedRoute>} />
              <Route path="reports" element={<ProtectedRoute allowedRoles={['Admin']}><ReportsPage /></ProtectedRoute>} />
              <Route path="admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminPage /></ProtectedRoute>} />
              <Route path="ai-studio" element={<ProtectedRoute allowedRoles={['Admin']}><AiStudioPage /></ProtectedRoute>} />
              <Route path="403" element={<AccessDeniedPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
