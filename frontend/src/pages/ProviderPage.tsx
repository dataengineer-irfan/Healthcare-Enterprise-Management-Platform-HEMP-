import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Chip, Alert, CircularProgress, Stack, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export interface Provider {
  providerId: string;
  npi: string;
  providerName: string;
  taxonomyCode: string;
  status: string;
  phone: string;
  email: string;
}

export const ProviderPage: React.FC = () => {
  const { token } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Provider>>({
    npi: '', providerName: '', taxonomyCode: '207Q00000X', status: 'ACTIVE', phone: '', email: ''
  });

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/providers', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, size: rowsPerPage }
      });
      setProviders(res.data.content);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [page, rowsPerPage, token]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchProviders();
  };

  const handleOpenCreate = () => {
    setEditMode(false);
    setFormData({ npi: '', providerName: '', taxonomyCode: '207Q00000X', status: 'ACTIVE', phone: '', email: '' });
    setErrorMsg(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (p: Provider) => {
    setEditMode(true);
    setFormData(p);
    setErrorMsg(null);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this provider?')) return;
    try {
      await axios.delete(`/api/v1/providers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProviders();
    } catch (err: any) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setErrorMsg(null);
    setSaving(true);
    try {
      if (editMode) {
        await axios.put(`/api/v1/providers/${formData.providerId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/v1/providers', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setOpenDialog(false);
      fetchProviders();
    } catch (err: any) {
      const serverMsg = err.response?.data?.message || err.response?.data;
      setErrorMsg(typeof serverMsg === 'string' ? serverMsg : 'Save failed. Please check validation requirements or duplicate NPI.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81' }}>
          Provider Management Directory
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          data-testid="provider-enrollment-button"
          sx={{ fontWeight: 600 }}
        >
          Enroll New Provider
        </Button>
      </Box>

      {/* Search Panel */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSearchSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Provider Name or 10-Digit NPI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'data-testid': 'provider-search-input' }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              data-testid="provider-search-button"
              sx={{ px: 3 }}
            >
              Search
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Enterprise Data Grid */}
      <Paper elevation={2} data-testid="provider-grid">
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>NPI</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Provider Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Specialty Taxonomy</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}><CircularProgress /></TableCell>
                </TableRow>
              ) : providers.map((row) => (
                <TableRow key={row.providerId} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.npi}</TableCell>
                  <TableCell>{row.providerName}</TableCell>
                  <TableCell>{row.taxonomyCode}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === 'ACTIVE' ? 'success' : row.status === 'PENDING' ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.phone || '-'}</TableCell>
                  <TableCell>{row.email || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenEdit(row)} data-testid={`edit-provider-${row.npi}`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(row.providerId)} data-testid={`delete-provider-${row.npi}`}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
        />
      </Paper>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editMode ? 'Edit Provider Record' : 'Enroll New Provider'}
        </DialogTitle>
        <DialogContent dividers>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="National Provider Identifier (NPI)"
              fullWidth
              value={formData.npi || ''}
              onChange={(e) => setFormData({ ...formData, npi: e.target.value })}
              inputProps={{ 'data-testid': 'form-input-npi' }}
              disabled={editMode}
              required
            />
            <TextField
              label="Provider / Facility Name"
              fullWidth
              value={formData.providerName || ''}
              onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
              inputProps={{ 'data-testid': 'form-input-name' }}
              required
            />
            <TextField
              label="NUCC Specialty Taxonomy Code"
              fullWidth
              value={formData.taxonomyCode || ''}
              onChange={(e) => setFormData({ ...formData, taxonomyCode: e.target.value })}
              inputProps={{ 'data-testid': 'form-input-taxonomy' }}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status || 'ACTIVE'}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Phone Number"
              fullWidth
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              label="Email Address"
              fullWidth
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenDialog(false)} disabled={saving}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            data-testid="provider-save-button"
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {saving ? 'Saving...' : 'Save Provider Record'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
