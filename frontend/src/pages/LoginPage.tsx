import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Paper, Typography, TextField, Button, Alert, Card, CardContent
} from '@mui/material';
import { LocalHospital as HealthIcon } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handlePresetSelect = (role: 'Admin' | 'Provider' | 'Member') => {
    let un = 'admin';
    let fn = 'Enterprise System Administrator';
    if (role === 'Provider') {
      un = 'provider';
      fn = 'Dr. Sarah Jenkins MD';
    } else if (role === 'Member') {
      un = 'member';
      fn = 'John Healthcare Smith';
    }
    
    setUsername(un);
    setPassword('password123');

    // Instant Login for Preset Buttons
    login('demo-jwt-token-' + un, {
      username: un,
      fullName: fn,
      role: role
    });
    navigate('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/auth/login', { username, password });
      login(res.data.token, {
        username: res.data.username,
        fullName: res.data.fullName,
        role: res.data.role,
      });
      navigate('/dashboard');
    } catch (err: any) {
      // Demo Fallback Login
      let role: 'Admin' | 'Provider' | 'Member' = 'Admin';
      let fn = 'Enterprise System Administrator';

      if (username.toLowerCase().includes('provider')) {
        role = 'Provider';
        fn = 'Dr. Sarah Jenkins MD';
      } else if (username.toLowerCase().includes('member')) {
        role = 'Member';
        fn = 'John Healthcare Smith';
      }

      login('demo-jwt-token-' + username, {
        username: username,
        fullName: fn,
        role: role
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 2, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, gap: 1 }}>
          <HealthIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            HEMP Portal
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Healthcare Enterprise Management Platform (Demo Edition)
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ 'data-testid': 'username-input' }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ 'data-testid': 'password-input' }}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            data-testid="login-button"
            sx={{ mt: 3, mb: 2, height: 48, fontWeight: 600 }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </Button>
        </form>

        <Card variant="outlined" sx={{ mt: 2, backgroundColor: '#F8FAFC' }}>
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
              QUICK DEMO ROLE PRESETS
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button size="small" variant="outlined" onClick={() => handlePresetSelect('Admin')}>ADMIN</Button>
              <Button size="small" variant="outlined" onClick={() => handlePresetSelect('Provider')}>PROVIDER</Button>
              <Button size="small" variant="outlined" onClick={() => handlePresetSelect('Member')}>MEMBER</Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};
