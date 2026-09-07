'use client';

import React from 'react';
import { Card, Typography, Alert, Stack } from '@mui/material';

export default function EnterpriseRiskRadar() {
  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, boxShadow: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#fff' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Active Threat Perimeter</Typography>
      <Stack spacing={1}>
        <Alert severity="warning" variant="outlined" sx={{ py: 0, px: 1, fontSize: '0.75rem', '& .MuiAlert-icon': { fontSize: 16 } }}>
          Logistics disruption alert: EU Port congestion.
        </Alert>
        <Alert severity="info" variant="outlined" sx={{ py: 0, px: 1, fontSize: '0.75rem', '& .MuiAlert-icon': { fontSize: 16 } }}>
          System Audit Track: Active JWT state verified.
        </Alert>
      </Stack>
    </Card>
  );
}