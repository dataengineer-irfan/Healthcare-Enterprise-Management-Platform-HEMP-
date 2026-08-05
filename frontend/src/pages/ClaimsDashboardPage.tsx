import React from 'react';
import { Box, Typography, Grid, Paper, Chip, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { CheckCircle, HourglassEmpty, Cancel, MonetizationOn } from '@mui/icons-material';

export const ClaimsDashboardPage: React.FC = () => {
  const claimsSummary = [
    { label: 'Total Billed Intake', val: '$4,850,000.00', color: 'primary', icon: <MonetizationOn /> },
    { label: 'Approved Claims', val: '1,150 (81.0%)', color: 'success', icon: <CheckCircle /> },
    { label: 'Pending Adjudication', val: '185 (13.0%)', color: 'warning', icon: <HourglassEmpty /> },
    { label: 'Denied Claims', val: '85 (6.0%)', color: 'error', icon: <Cancel /> },
  ];

  const recentClaims = [
    { claimId: 'CLM-88201', provider: 'St. Jude General Hospital', member: 'John Smith', amount: '$1,250.00', status: 'APPROVED', date: '2026-08-05' },
    { claimId: 'CLM-88202', provider: 'Metro Cardiology Associates', member: 'Jane Doe', amount: '$4,800.00', status: 'PENDING', date: '2026-08-05' },
    { claimId: 'CLM-88203', provider: 'Dr. Sarah Jenkins, MD', member: 'Robert Johnson', amount: '$350.00', status: 'APPROVED', date: '2026-08-04' },
    { claimId: 'CLM-88204', provider: 'Sunrise Orthopedic Center', member: 'Emily Williams', amount: '$2,100.00', status: 'DENIED', date: '2026-08-04' },
  ];

  return (
    <Box data-testid="claims-dashboard">
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81', mb: 1 }}>
        Claims Management Operations Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Real-Time EDI 837 Claim Intake, Fee Schedule Pricing, and Adjudication Metrics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {claimsSummary.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">{item.label}</Typography>
                {item.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{item.val}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Recent Claims Intake Batch Summary
        </Typography>
        <Table>
          <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Claim ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Billing Provider</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Covered Enrollee</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Billed Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Intake Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentClaims.map((row) => (
              <TableRow key={row.claimId} hover>
                <TableCell sx={{ fontWeight: 600 }}>{row.claimId}</TableCell>
                <TableCell>{row.provider}</TableCell>
                <TableCell>{row.member}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === 'APPROVED' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
