import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Box, IconButton, Avatar, Menu, MenuItem, Chip, Breadcrumbs, Link, TextField, InputAdornment
} from '@mui/material';
import {
  Dashboard as DashboardIcon, LocalHospital as ProviderIcon, People as MemberIcon,
  ReceiptLong as ClaimsIcon, Assessment as ReportsIcon, AdminPanelSettings as AdminIcon,
  Psychology as AiIcon, Logout as LogoutIcon, AccountCircle, Contacts as ContactIcon,
  Search as SearchIcon, Person as ProfileIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const DRAWER_WIDTH = 260;

export const AppLayout: React.FC = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [globalQuery, setGlobalQuery] = useState('');

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!globalQuery.trim()) return;
    navigate(`/providers?search=${encodeURIComponent(globalQuery)}`);
  };

  const navItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, roles: ['Admin', 'Provider', 'Member'] },
    { text: 'Provider Management', path: '/providers', icon: <ProviderIcon />, roles: ['Admin', 'Provider'] },
    { text: 'Member Management', path: '/members', icon: <MemberIcon />, roles: ['Admin', 'Member'] },
    { text: 'Claims Dashboard', path: '/claims', icon: <ClaimsIcon />, roles: ['Admin'] },
    { text: 'Contact Management', path: '/contacts', icon: <ContactIcon />, roles: ['Admin'] },
    { text: 'Executive Reports', path: '/reports', icon: <ReportsIcon />, roles: ['Admin'] },
    { text: 'Platform Admin', path: '/admin', icon: <AdminIcon />, roles: ['Admin'] },
    { text: 'AI Studio', path: '/ai-studio', icon: <AiIcon />, roles: ['Admin'] },
  ];

  const allowedNav = navItems.filter((item) => user && item.roles.includes(user.role));

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6F9' }}>
      {/* Top Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#0F4C81' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, letterSpacing: 0.5, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
              HEMP Enterprise Portal
            </Typography>
            <Chip label="DEMO EDITION" color="secondary" size="small" sx={{ fontWeight: 600 }} />
          </Box>

          {/* Global Header Search Bar */}
          <form onSubmit={handleGlobalSearch} style={{ flex: 0.4 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Global Search (NPI, Member ID, Claim Number)..."
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              inputProps={{ 'data-testid': 'global-search-input', style: { color: '#FFF' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                  </InputAdornment>
                ),
                sx: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 1 }
              }}
            />
          </form>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              avatar={<Avatar>{user?.fullName?.[0] || 'U'}</Avatar>}
              label={`${user?.fullName} (${user?.role})`}
              variant="outlined"
              onClick={() => navigate('/profile')}
              sx={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            />
            <IconButton onClick={handleMenuOpen} color="inherit" data-testid="user-menu-button">
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }} data-testid="profile-button">
                <ListItemIcon><ProfileIcon fontSize="small" /></ListItemIcon>
                User Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} data-testid="logout-button">
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Navigation Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', py: 2 }}>
          <List>
            {allowedNav.map((item) => (
              <ListItemButton
                key={item.path}
                selected={location.pathname.startsWith(item.path)}
                onClick={() => navigate(item.path)}
                data-testid={`nav-${item.text.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(15, 76, 129, 0.12)',
                    fontWeight: 600,
                  },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname.startsWith(item.path) ? '#0F4C81' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14, fontWeight: location.pathname.startsWith(item.path) ? 600 : 400 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            Home
          </Link>
          {pathSegments.map((segment, idx) => (
            <Typography key={idx} color="text.primary" sx={{ textTransform: 'capitalize' }}>
              {segment.replace('-', ' ')}
            </Typography>
          ))}
        </Breadcrumbs>

        <Outlet />
      </Box>
    </Box>
  );
};
