'use client';

import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RootCausePanel from '../../../components/impact/RootCausePanel';
import FinancialImpactWaterfall from '../../../components/impact/FinancialImpactWaterfall';
import SAPObjectImpactTable from '../../../components/impact/SAPObjectImpactTable';

export default function ActionImpactExplorer({ params }: { params: { id: string } }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B0F19', color: 'white', pt: 4, pb: 8 }}>
      <Container maxWidth="xl">
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} sx={{ color: 'grey.400', mb: 1 }} href="/">Back to Command Center</Button>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Action Impact Explorer</Typography>
            <Typography variant="subtitle1" color="grey.400">Deep-dive analysis for Action ID: {params.id}</Typography>
          </Box>
          <Button variant="contained" color="success" size="large" startIcon={<CheckCircleIcon />}>
            Approve & Execute Action
          </Button>
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Box>
            <RootCausePanel actionId={params.id} />
            <FinancialImpactWaterfall />
          </Box>
          <Box>
            <SAPObjectImpactTable />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
