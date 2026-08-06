import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Chip, Alert, CircularProgress, Stack, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import {
  Add as AddIcon, Search as SearchIcon, CheckCircle as ApproveIcon, Cancel as RejectIcon, Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Provider } from './ProviderPage';
import { Member } from './MemberPage';

export interface Claim {
  claimId: string;
  claimNumber: string;
  provider: Provider;
  member: Member;
  claimDate: string;
  serviceDate: string;
  billedAmount: number;
  approvedAmount: number;
  status: string;
  diagnosisCode: string;
  procedureCode: string;
}

export const ClaimsPage: React.FC = () => {
  const { token } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Modal Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    claimNumber: '',
    providerId: '',
    memberId: '',
    billedAmount: '1250.00',
    diagnosisCode: 'I10',
    procedureCode: '99214'
  });

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/claims', {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, page, size: rowsPerPage }
      });
      setClaims(res.data.content);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error('Error fetching claims:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownOptions = async () => {
    try {
      const [provRes, mbrRes] = await Promise.all([
        axios.get('/api/v1/providers?size=100', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/v1/members?size=100', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setProviders(provRes.data.content || []);
      setMembers(mbrRes.data.content || []);
      if (provRes.data.content?.length > 0) setFormData(prev => ({ ...prev, providerId: provRes.data.content[0].providerId }));
      if (mbrRes.data.content?.length > 0) setFormData(prev => ({ ...prev, memberId: mbrRes.data.content[0].memberId }));
    } catch (err) {
      console.error('Error fetching dropdown options:', err);
    }
  };

  useEffect(() => {
    fetchClaims();
    fetchDropdownOptions();
  }, [page, rowsPerPage, token]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchClaims();
  };

  const handleOpenCreate = () => {
    setErrorMsg(null);
    setOpenDialog(true);
  };

  const handleApprove = async (claimId: string) => {
    try {
      await axios.put(`/api/v1/claims/${claimId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClaims();
    } catch (err: any) {
      alert('Approve failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async (claimId: string) => {
    try {
      await axios.put(`/api/v1/claims/${claimId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClaims();
    } catch (err: any) {
      alert('Reject failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (claimId: string) => {
    if (!window.confirm('Are you sure you want to delete this claim record?')) return;
    try {
      await axios.delete(`/api/v1/claims/${claimId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClaims();
    } catch (err: any) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSave = async () => {
    setErrorMsg(null);
    try {
      await axios.post('/api/v1/claims', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOpenDialog(false);
      fetchClaims();
    } catch (err: any) {
      const serverMsg = err.response?.data?.message || err.response?.data;
      setErrorMsg(typeof serverMsg === 'string' ? serverMsg : 'Submit claim failed. Please check inputs or duplicate Claim Number.');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81' }}>
            Claims Intake & Adjudication Workbench
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-Time EDI 837 Electronic Claim Management & Status Settlement
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          data-testid="claim-submit-button"
          sx={{ fontWeight: 600 }}
        >
          Submit New Electronic Claim
        </Button>
      </Box>

      {/* Search Panel */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <form onSubmit={handleSearchSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Claim Number (e.g. CLM-882001), Status, or Diagnosis Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'data-testid': 'claim-search-input' }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              data-testid="claim-search-button"
              sx={{ px: 3 }}
            >
              Search
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Data Grid */}
      <Paper elevation={2} data-testid="claim-grid">
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Claim Number</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Billing Provider</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Covered Enrollee</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Service Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Billed Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Approved Amount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}><CircularProgress /></TableCell>
                </TableRow>
              ) : claims.map((row) => (
                <TableRow key={row.claimId} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.claimNumber}</TableCell>
                  <TableCell>{row.provider?.providerName || 'St. Jude General Hospital'}</TableCell>
                  <TableCell>{row.member ? `${row.member.firstName} ${row.member.lastName}` : 'John Smith'}</TableCell>
                  <TableCell>{row.serviceDate}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>${row.billedAmount?.toFixed(2)}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: row.approvedAmount > 0 ? 'success.main' : 'inherit' }}>
                    ${row.approvedAmount?.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === 'APPROVED' ? 'success' : row.status === 'PENDING' || row.status === 'SUBMITTED' ? 'warning' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="success" onClick={() => handleApprove(row.claimId)} data-testid={`claim-approve-button-${row.claimNumber}`} title="Demo Approve">
                      <ApproveIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleReject(row.claimId)} data-testid={`claim-reject-button-${row.claimNumber}`} title="Demo Reject">
                      <RejectIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(row.claimId)}>
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
        <DialogTitle sx={{ fontWeight: 700 }}>Submit Electronic 837 Claim</DialogTitle>
        <DialogContent dividers>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth required>
              <InputLabel>Billing Provider</InputLabel>
              <Select
                value={formData.providerId}
                label="Billing Provider"
                onChange={(e) => setFormData({ ...formData, providerId: e.target.value })}
              >
                {providers.map((p) => (
                  <MenuItem key={p.providerId} value={p.providerId}>
                    {p.providerName} (NPI: {p.npi})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Covered Enrollee Member</InputLabel>
              <Select
                value={formData.memberId}
                label="Covered Enrollee Member"
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              >
                {members.map((m) => (
                  <MenuItem key={m.memberId} value={m.memberId}>
                    {m.firstName} {m.lastName} (ID: {m.memberNumber})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Billed Charge Amount ($)"
              type="number"
              fullWidth
              value={formData.billedAmount}
              onChange={(e) => setFormData({ ...formData, billedAmount: e.target.value })}
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="ICD-10 Diagnosis Code"
                fullWidth
                value={formData.diagnosisCode}
                onChange={(e) => setFormData({ ...formData, diagnosisCode: e.target.value })}
                required
              />
              <TextField
                label="CPT / HCPCS Procedure Code"
                fullWidth
                value={formData.procedureCode}
                onChange={(e) => setFormData({ ...formData, procedureCode: e.target.value })}
                required
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} data-testid="claim-save-button">
            Submit Claim Payload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
