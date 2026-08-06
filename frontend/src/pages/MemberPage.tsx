import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Chip, Alert, CircularProgress, Stack, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, Edit as EditIcon, Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export interface Member {
  memberId: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  status: string;
  phone: string;
}

export const MemberPage: React.FC = () => {
  const { token } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Member>>({
    memberNumber: '', firstName: '', lastName: '', dob: '1990-01-01', gender: 'FEMALE', status: 'ACTIVE', phone: ''
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/members', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, size: rowsPerPage }
      });
      setMembers(res.data.content);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page, rowsPerPage, token]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchMembers();
  };

  const handleOpenCreate = () => {
    setEditMode(false);
    setFormData({ memberNumber: '', firstName: '', lastName: '', dob: '1990-01-01', gender: 'FEMALE', status: 'ACTIVE', phone: '' });
    setErrorMsg(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (m: Member) => {
    setEditMode(true);
    setFormData(m);
    setErrorMsg(null);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`/api/v1/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMembers();
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
        await axios.put(`/api/v1/members/${formData.memberId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/v1/members', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setOpenDialog(false);
      fetchMembers();
    } catch (err: any) {
      const serverMsg = err.response?.data?.message || err.response?.data;
      setErrorMsg(typeof serverMsg === 'string' ? serverMsg : 'Save failed. Please check member data fields or duplicate Member Number.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81' }}>
          Member Eligibility Directory
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          data-testid="member-enrollment-button"
          sx={{ fontWeight: 600 }}
        >
          Enroll New Member
        </Button>
      </Box>

      {/* Search Panel */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSearchSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Member Name or Subscriber ID Number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'data-testid': 'member-search-input' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<SearchIcon />}
              data-testid="member-search-button"
              sx={{ px: 3 }}
            >
              Search
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Data Grid */}
      <Paper elevation={2} data-testid="member-grid">
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Member Number</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date of Birth</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Gender</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}><CircularProgress /></TableCell>
                </TableRow>
              ) : members.map((row) => (
                <TableRow key={row.memberId} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.memberNumber}</TableCell>
                  <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === 'ACTIVE' ? 'success' : row.status === 'SUSPENDED' ? 'warning' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.phone || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenEdit(row)} data-testid={`edit-member-${row.memberNumber}`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(row.memberId)} data-testid={`delete-member-${row.memberNumber}`}>
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
          {editMode ? 'Edit Member Enrollment' : 'Enroll New Beneficiary Member'}
        </DialogTitle>
        <DialogContent dividers>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Member Subscriber ID Number"
              fullWidth
              value={formData.memberNumber || ''}
              onChange={(e) => setFormData({ ...formData, memberNumber: e.target.value })}
              inputProps={{ 'data-testid': 'form-input-member-number' }}
              disabled={editMode}
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName || ''}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                inputProps={{ 'data-testid': 'form-input-first-name' }}
                required
              />
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName || ''}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                inputProps={{ 'data-testid': 'form-input-last-name' }}
                required
              />
            </Stack>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dob || ''}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender || 'FEMALE'}
                label="Gender"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <MenuItem value="FEMALE">FEMALE</MenuItem>
                <MenuItem value="MALE">MALE</MenuItem>
                <MenuItem value="OTHER">OTHER</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status || 'ACTIVE'}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                <MenuItem value="SUSPENDED">SUSPENDED</MenuItem>
                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Phone Number"
              fullWidth
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenDialog(false)} disabled={saving}>Cancel</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            disabled={saving}
            data-testid="member-save-button"
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {saving ? 'Saving...' : 'Save Member Record'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
