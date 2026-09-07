'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Button, Stack, Snackbar, Alert, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SAPDependencyGraph from '../../components/sap-impact/SAPDependencyGraph';
import TableLineageExplorer from '../../components/sap-impact/TableLineageExplorer';
import ComplianceImpactPanel from '../../components/sap-impact/ComplianceImpactPanel';

export default function SAPImpactAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleGenerateTR = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToastOpen(true);
    }, 1500);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B0F19', color: 'white', pt: 4, pb: 8 }}>
      <Container maxWidth="xl">
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} sx={{ color: 'grey.400', mb: 1 }} href="/">Back to Command Center</Button>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>SAP Impact Analyzer</Typography>
            <Typography variant="subtitle1" color="grey.400">Technical lineage and compliance analysis for active deployment</Typography>
          </Box>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VerifiedUserIcon />}
            onClick={handleGenerateTR}
            disabled={loading}
            sx={{ fontWeight: 'bold' }}
          >
            {loading ? 'COMPILING SAP OBJECTS...' : 'GENERATE TRANSPORT REQUEST'}
          </Button>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Box>
            <SAPDependencyGraph />
            <TableLineageExplorer />
          </Box>
          <Box>
            <ComplianceImpactPanel />
          </Box>
        </Box>
      </Container>
      
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold', boxShadow: 3 }}>
          Transport Request TR-SAP-99824X successfully staged in development environment for Basis team approval.
        </Alert>
      </Snackbar>
    </Box>
  );
}
