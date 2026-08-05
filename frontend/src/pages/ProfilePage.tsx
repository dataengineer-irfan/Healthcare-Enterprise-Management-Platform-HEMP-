import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import { AccountCircle, Security, Key, AccessTime } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box data-testid="profile-page">
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81', mb: 1 }}>
        User Identity & Profile Details
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Authenticated JWT Credentials & Assigned RBAC Platform Permissions
      </Typography>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#0F4C81', fontSize: 36 }}>
              {user?.fullName?.[0] || 'U'}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {user?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Username: <strong>{user?.username}</strong>
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip label={`Assigned Role: ${user?.role}`} color="primary" sx={{ fontWeight: 600 }} />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Session Claims</Typography>
            <List size="small" disablePadding>
              <ListItem><ListItemText primary="Authentication Type" secondary="Stateless Bearer JWT Signature (HS256)" /></ListItem>
              <ListItem><ListItemText primary="Token Issuer" secondary="HEMP Platform Security Subsystem" /></ListItem>
              <ListItem><ListItemText primary="Expiration Policy" secondary="24 Hours (86,400,000 ms)" /></ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Role Privileges</Typography>
            <List size="small" disablePadding>
              <ListItem><ListItemText primary="Authorized Modules" secondary={user?.role === 'Admin' ? 'All Enterprise Modules (Providers, Members, Claims, Reports, Admin, AI Studio)' : user?.role === 'Provider' ? 'Dashboard, Provider Management' : 'Dashboard, Member Eligibility'} /></ListItem>
              <ListItem><ListItemText primary="Audit Level" secondary="HIPAA Fully Audited Actions" /></ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
