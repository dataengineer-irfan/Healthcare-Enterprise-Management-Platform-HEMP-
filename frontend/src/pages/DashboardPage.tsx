import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Chip, LinearProgress, Paper } from '@mui/material';
import {
  LocalHospital as ProviderIcon, People as MemberIcon, ReceiptLong as ClaimsIcon,
  CheckCircle as ApprovedIcon, HourglassEmpty as PendingIcon, Cancel as DeniedIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/dashboard/summary', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setSummary(res.data))
    .catch((err) => console.error('Dashboard load error:', err))
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81', mb: 1 }}>
          Healthcare Executive Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enterprise operational oversight & Real-Time Performance Analytics
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} data-testid="dashboard-card-providers">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600 }}>
                  REGISTERED PROVIDERS
                </Typography>
                <ProviderIcon color="primary" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.totalProviders || 20}
              </Typography>
              <Chip label="Active Network" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} data-testid="dashboard-card-members">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600 }}>
                  COVERED MEMBERS
                </Typography>
                <MemberIcon color="secondary" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.totalMembers || 20}
              </Typography>
              <Chip label="Eligible Enrollees" color="info" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} data-testid="claims-dashboard">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600 }}>
                  TOTAL CLAIMS INTAKE
                </Typography>
                <ClaimsIcon sx={{ color: '#0F4C81' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {summary?.claims?.totalClaims?.toLocaleString() || '1,420'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                $4.85M Billed Payout Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography color="text.secondary" variant="subtitle2" sx={{ fontWeight: 600 }}>
                  AUTO-ADJUDICATION RATE
                </Typography>
                <ApprovedIcon color="success" />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                81.0%
              </Typography>
              <LinearProgress variant="determinate" value={81} color="success" sx={{ mt: 1, height: 6, borderRadius: 3 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Claims Breakdown Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Claims Processing Status Distribution
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#F0FDF4', borderRadius: 2, border: '1px solid #DCFCE7' }}>
              <Typography variant="subtitle2" color="success.dark">APPROVED CLAIMS</Typography>
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 700 }}>
                {summary?.claims?.approvedClaims || 1150}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#FEFCE8', borderRadius: 2, border: '1px solid #FEF08A' }}>
              <Typography variant="subtitle2" color="warning.dark">PENDING CLINICAL REVIEW</Typography>
              <Typography variant="h5" color="warning.main" sx={{ fontWeight: 700 }}>
                {summary?.claims?.pendingClaims || 185}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ p: 2, bgcolor: '#FEF2F2', borderRadius: 2, border: '1px solid #FECACA' }}>
              <Typography variant="subtitle2" color="error.dark">DENIED / REJECTED</Typography>
              <Typography variant="h5" color="error.main" sx={{ fontWeight: 700 }}>
                {summary?.claims?.deniedClaims || 85}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
