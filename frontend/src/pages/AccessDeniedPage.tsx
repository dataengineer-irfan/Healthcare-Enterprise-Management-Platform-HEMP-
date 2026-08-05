import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const AccessDeniedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box data-testid="access-denied-page" sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 500, borderRadius: 2 }}>
        <LockIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h5" color="error" sx={{ fontWeight: 700, mb: 1 }}>
          403 - Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Your current user role does not possess permissions to view this resource. Contact system administration to request elevated privileges.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
          Return to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};
