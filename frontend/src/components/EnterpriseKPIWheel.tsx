'use client';

import React from 'react';
import { Card, Box, Typography, Stack } from '@mui/material';

export default function EnterpriseKPIWheel() {
  return (
    <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#fff' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 1.5 }}>Primary Metric Cluster</Typography>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', pb: 0.5 }}>
          <Typography variant="body2" color="#475569">Liquidity Coverage</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#0f172a' }}>1.42x</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', pb: 0.5 }}>
          <Typography variant="body2" color="#475569">Operating Margin Shift</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#16a34a' }}>+2.14%</Typography>
        </Box>
      </Stack>
    </Card>
  );
}