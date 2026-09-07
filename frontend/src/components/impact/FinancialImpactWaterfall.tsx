import React from 'react';
import { Card, Box, Typography, Stack } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Current EBITDA', value: 150, color: '#3f51b5' },
  { name: 'Leakage Recovery', value: 12, color: '#00E5FF' },
  { name: 'Efficiency Gain', value: 8, color: '#00E5FF' },
  { name: 'Implementation Cost', value: -3, color: '#f44336' },
  { name: 'Projected EBITDA', value: 167, color: '#4caf50' }
];

export default function FinancialImpactWaterfall() {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }} spacing={2}>
        <TimelineIcon sx={{ color: '#4caf50' }} />
        <Typography variant="h6" color="white">Simulated Financial Waterfall (USD Millions)</Typography>
      </Stack>
      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#ccc" tick={{fill: '#ccc'}} />
            <YAxis stroke="#ccc" tick={{fill: '#ccc'}} />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
