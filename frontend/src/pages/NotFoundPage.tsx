import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box data-testid="not-found-page" sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', maxWidth: 500, borderRadius: 2 }}>
        <ErrorIcon color="warning" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h5" color="warning.main" sx={{ fontWeight: 700, mb: 1 }}>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The requested URL path does not exist in the HEMP Enterprise Portal navigation index.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
          Return to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};
