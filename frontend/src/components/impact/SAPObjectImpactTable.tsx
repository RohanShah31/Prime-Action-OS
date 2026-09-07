import React from 'react';
import { Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Chip } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

const objects = [
  { table: 'VBAK', desc: 'Sales Document: Header Data', impact: 'High', type: 'Transactional' },
  { table: 'KONV', desc: 'Conditions (Transaction Data)', impact: 'Critical', type: 'Pricing' },
  { table: 'ZPR0', desc: 'Custom Pricing Procedure', impact: 'Medium', type: 'Configuration' }
];

export default function SAPObjectImpactTable() {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }} spacing={2}>
        <StorageIcon sx={{ color: '#FF9800' }} />
        <Typography variant="h6" color="white">Impacted SAP Objects</Typography>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Object / Table</TableCell>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Description</TableCell>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Impact Level</TableCell>
              <TableCell sx={{ color: 'grey.500', borderColor: 'rgba(255,255,255,0.1)' }}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objects.map((row) => (
              <TableRow key={row.table}>
                <TableCell sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.05)' }}>{row.table}</TableCell>
                <TableCell sx={{ color: 'grey.300', borderColor: 'rgba(255,255,255,0.05)' }}>{row.desc}</TableCell>
                <TableCell sx={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <Chip 
                    label={row.impact} 
                    size="small" 
                    color={row.impact === 'Critical' ? 'error' : row.impact === 'High' ? 'warning' : 'default'} 
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'grey.400', borderColor: 'rgba(255,255,255,0.05)' }}>{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
