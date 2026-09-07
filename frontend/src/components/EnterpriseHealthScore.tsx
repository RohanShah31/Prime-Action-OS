'use client';

import React from 'react';
import { Card, Box, Typography, CircularProgress } from '@mui/material';

export default function EnterpriseHealthScore() {
  return (
    <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#fff' }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Global Operations Score</Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#16a34a', my: 0.5 }}>94<span style={{ fontSize: '1.2rem', color: '#64748b' }}>/100</span></Typography>
        <Typography variant="caption" color="text.secondary">✓ All core thresholds stable</Typography>
      </Box>
      <Box sx={{ position: 'relative', display: 'flex' }}>
        <CircularProgress variant="determinate" value={94} size={70} color="success" thickness={5} />
      </Box>
    </Card>
  );
}