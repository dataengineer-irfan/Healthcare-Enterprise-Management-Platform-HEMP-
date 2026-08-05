import React from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Grid } from '@mui/material';

export const AdminPage: React.FC = () => {
  const users = [
    { username: 'admin', fullName: 'Enterprise System Administrator', role: 'Admin', status: 'ACTIVE' },
    { username: 'provider', fullName: 'Dr. Sarah Jenkins MD', role: 'Provider', status: 'ACTIVE' },
    { username: 'member', fullName: 'John Healthcare Smith', role: 'Member', status: 'ACTIVE' },
  ];

  const permissions = [
    { module: 'Provider Management', admin: 'Full Control', provider: 'Read / Update Self', member: 'No Access' },
    { module: 'Member Management', admin: 'Full Control', provider: 'No Access', member: 'Read / Update Self' },
    { module: 'Claims Intake & Pricing', admin: 'Full Control', provider: 'Submit Claims', member: 'View EOB Claims' },
    { module: 'Enterprise AI Studio', admin: 'Configure Prompts & Models', provider: 'No Access', member: 'No Access' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81', mb: 1 }}>
        Platform Administration & Security
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        User Account Lifecycle, RBAC Access Roles, and Platform Permission Matrix
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>System User Registry</Typography>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.username} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{u.username}</TableCell>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell><Chip label={u.role} color="primary" size="small" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>RBAC Role Access Permission Matrix</Typography>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#F8FAFC' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Domain Module</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Admin Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Provider Role</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Member Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions.map((p, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{p.module}</TableCell>
                    <TableCell>{p.admin}</TableCell>
                    <TableCell>{p.provider}</TableCell>
                    <TableCell>{p.member}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
