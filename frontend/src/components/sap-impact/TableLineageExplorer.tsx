import React from 'react';
import { Card, Box, Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const lineage = [
  { level: 1, object: 'KNA1', type: 'Customer Master', impact: 'Direct' },
  { level: 2, object: 'VBAK', type: 'Sales Document', impact: 'Direct' },
  { level: 3, object: 'VBAP', type: 'Sales Item', impact: 'Indirect' },
  { level: 4, object: 'KONV', type: 'Conditions', impact: 'Indirect' }
];

export default function TableLineageExplorer() {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }} spacing={2}>
        <AccountTreeIcon sx={{ color: '#FF9800' }} />
        <Typography variant="h6" color="white">Table Lineage Explorer</Typography>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Level</TableCell>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>SAP Object</TableCell>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Type</TableCell>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Impact Scope</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineage.map((row) => (
              <TableRow key={row.object}>
                <TableCell sx={{ color: 'grey.300', borderColor: 'rgba(255,255,255,0.05)' }}>L{row.level}</TableCell>
                <TableCell sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.05)', fontWeight: 'bold' }}>{row.object}</TableCell>
                <TableCell sx={{ color: 'grey.400', borderColor: 'rgba(255,255,255,0.05)' }}>{row.type}</TableCell>
                <TableCell sx={{ color: row.impact === 'Direct' ? '#00E5FF' : 'grey.500', borderColor: 'rgba(255,255,255,0.05)' }}>{row.impact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
