'use client';
import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, Switch, Divider, CircularProgress } from '@mui/material';
import { useActionStore } from '../lib/store';
import api from '../lib/api';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function PnLImpactSimulator() {
  const { actions, updateActionStatus } = useActionStore();
  const [baseEbitda, setBaseEbitda] = useState<number | null>(null);

  useEffect(() => {
    api.get('/api/pnl/current')
      .then(res => setBaseEbitda(Number(res.data.ebitda)))
      .catch(err => console.error(err));
  }, []);

  const handleToggle = (id: number, isChecked: boolean) => {
    updateActionStatus(id, isChecked ? 'Approved' : 'Pending');
  };

  if (baseEbitda === null) return <CircularProgress />;

  // Calculate projected EBITDA based on approved actions
  const approvedImpact = actions
    .filter(a => a.status === 'Approved')
    .reduce((sum, a) => sum + Number(a.expected_benefit), 0);
  
  const projectedEbitda = baseEbitda + approvedImpact;

  // Chart Data
  const chartData = [
    { name: '2024', EBITDA: baseEbitda * 0.85, Projected: null },
    { name: '2025', EBITDA: baseEbitda * 0.95, Projected: null },
    { name: '2026 (Current)', EBITDA: baseEbitda, Projected: baseEbitda },
    { name: '2027 (Projected)', EBITDA: null, Projected: projectedEbitda },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Simulation Controls */}
        <Card sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>Action Toggles</Typography>
          
          {actions.map((action, index) => (
            <React.Fragment key={action.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: index > 0 ? 2 : 0 }}>
                <Typography sx={{ fontWeight: '500' }}>
                  {action.action_name} (+ ${(Number(action.expected_benefit) / 1000).toFixed(1)}k)
                </Typography>
                <Switch 
                  checked={action.status === 'Approved'} 
                  onChange={(e) => handleToggle(action.id, e.target.checked)} 
                  color="success" 
                />
              </Box>
              {index < actions.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />}
            </React.Fragment>
          ))}
        </Card>

        {/* Live Financial Output */}
        <Card sx={{ 
          bgcolor: '#020617', 
          p: 4, 
          borderRadius: 2, 
          border: '1px solid',
          borderColor: 'primary.main',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          boxShadow: '0 4px 20px -5px rgba(56, 189, 248, 0.15)'
        }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.9rem' }}>
            Projected Year-End EBITDA
          </Typography>
          <Typography variant="h2" sx={{ color: '#10b981', mb: 1, fontWeight: 'bold' }}>
            ${(projectedEbitda / 1000000).toFixed(2)}M
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 'bold' }}>
            Base EBITDA: ${(baseEbitda / 1000000).toFixed(2)}M
          </Typography>
        </Card>
      </Box>

      {/* Trend Chart */}
      <Card sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, height: 400 }}>
        <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>P&L Trend Analysis</Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value: any) => `$${(Number(value) / 1000000).toFixed(2)}M`}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
              />
              <Legend />
              <Bar dataKey="EBITDA" fill="#38bdf8" barSize={40} />
              <Line type="monotone" dataKey="Projected" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Box>
  );
}