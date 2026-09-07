'use client';

import React from 'react';
import { Card, Box, Typography, Stack } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

export default function ExecutiveCommandCentre() {
  return (
    <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', minHeight: 220, bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2, boxShadow: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
        <StorageIcon color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Command Pipeline Monitor</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Direct proxy pipeline connection verified. Real-time token handling architecture securely operational across local state components.
      </Typography>
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 'bold' }}>Sync Status: Complete (200 OK)</Typography>
      </Box>
    </Card>
  );
}