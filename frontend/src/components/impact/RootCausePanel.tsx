import React from 'react';
import { Card, Box, Typography, Stack, Chip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function RootCausePanel({ actionId }: { actionId: string }) {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }} spacing={2}>
        <AccountTreeIcon sx={{ color: '#00E5FF' }} />
        <Typography variant="h6" color="white">GraphRAG Root Cause Traversal</Typography>
      </Stack>
      <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 1 }}>
        <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
          <strong>Traversal Path:</strong> (EBITDA Decline) &lt;-[:IMPACTS]- (Pricing Leakage) &lt;-[:CAUSES]- (Discount Override in KONV)
        </Typography>
        <Typography variant="body1" color="white" sx={{ mb: 2 }}>
          Our Neo4j Knowledge Graph detected that 18% of margin erosion in Q2 is directly linked to an unapproved discount threshold override within the SAP pricing procedure (ZPR0).
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="SAP: KONV" size="small" sx={{ bgcolor: 'rgba(0, 229, 255, 0.1)', color: '#00E5FF' }} />
          <Chip label="Process: O2C" size="small" sx={{ bgcolor: 'rgba(255, 215, 0, 0.1)', color: '#FFD700' }} />
          <Chip label="KPI: EBITDA" size="small" sx={{ bgcolor: 'rgba(255, 64, 129, 0.1)', color: '#FF4081' }} />
        </Stack>
      </Box>
    </Card>
  );
}
