import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { Download as DownloadIcon, BarChart as ChartIcon } from '@mui/icons-material';

export const ReportsPage: React.FC = () => {
  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8,Module,Count,Billed,Paid\nProviders,20,N/A,N/A\nMembers,20,N/A,N/A\nClaims,1420,$4850000.00,$3920000.00\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hemp_executive_summary_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81' }}>
            Executive Reports & OLAP Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enterprise CMS Financial, Provider Credentialing, and Member Population Health Summary
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExportCsv}
          data-testid="export-csv-button"
          sx={{ fontWeight: 600 }}
        >
          Export Full Roster Report (CSV)
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Provider Network Specialty Breakdown
            </Typography>
            <Box sx={{ p: 4, bgcolor: '#F8FAFC', borderRadius: 2, textAlign: 'center' }}>
              <ChartIcon sx={{ fontSize: 64, color: '#0F4C81', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Hospital (35%) • Primary Care (30%) • Specialty Care (20%) • Urgent Care (15%)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Monthly Claims Financial Settlement
            </Typography>
            <Box sx={{ p: 4, bgcolor: '#F8FAFC', borderRadius: 2, textAlign: 'center' }}>
              <ChartIcon sx={{ fontSize: 64, color: '#00A896', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Q1 Paid: $12.4M • Q2 Paid: $14.8M • Q3 Projected: $16.2M
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
