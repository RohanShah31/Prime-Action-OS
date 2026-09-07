'use client';

import React, { useState } from 'react';
import { Card, Box, Typography, Button, LinearProgress, Stack } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import api from '../lib/api';

export default function DigitalTwinPanel() {
  const [simulating, setSimulating] = useState<boolean>(false);
  const [efficiency, setEfficiency] = useState<number>(84.2);
  const [log, setLog] = useState<string>('Sandbox simulation container active and ready...');

  const runSimulationSandbox = async () => {
    if (simulating) return;
    setSimulating(true);
    setLog('Initializing twin protocol. Connecting to API...');
    
    try {
      const response = await api.post('/api/ai/digital-twin');
      const data = response.data;
      
      // Simulate the log streaming visually even though we got the data
      let delay = 0;
      data.logs.forEach((logItem: string, index: number) => {
        delay += 800 + (index * 400); // progressive delay
        setTimeout(() => {
          setLog(logItem);
          // Increment efficiency slightly during simulation
          if (index < data.logs.length - 1) {
            setEfficiency(prev => parseFloat((prev + 0.4).toFixed(1)));
          }
        }, delay);
      });

      // Final completion
      setTimeout(() => {
        setEfficiency(data.final_efficiency);
        setSimulating(false);
      }, delay + 1000);

    } catch (error) {
      console.error(error);
      setLog('ERR: Twin simulation container failed to connect to backend.');
      setSimulating(false);
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', borderRadius: '24px', bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* Header */}
      <Box sx={{ p: 2.5, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Enterprise Digital Twin Sandbox</Typography>
        <Button 
          variant="contained" 
          size="small" 
          onClick={runSimulationSandbox}
          disabled={simulating}
          startIcon={<PlayArrowIcon fontSize="small" />}
          sx={{ bgcolor: '#000000', color: 'white', fontWeight: 'bold', fontSize: '0.75rem', borderRadius: '8px', boxShadow: 'none', '&:hover': { bgcolor: '#334155', boxShadow: 'none' } }}
        >
          {simulating ? 'SIMULATING...' : 'RUN TWIN SIM'}
        </Button>
      </Box>

      {/* Content Area */}
      <Stack spacing={2} sx={{ p: 3, flexGrow: 1, justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="grey.500" sx={{ mb: 3, fontWeight: 500 }}>
            Simulates real-world operational throughput changes across supply chains before live deployment.
          </Typography>

          <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>Simulated Plant Throughput Efficiency</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: efficiency > 85 ? '#22c55e' : '#1e293b' }}>
              {efficiency}%
            </Typography>
          </Box>
          <LinearProgress 
            variant={simulating ? "indeterminate" : "determinate"} 
            value={efficiency} 
            sx={{ height: 8, borderRadius: 4, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: efficiency > 85 ? '#22c55e' : '#3b82f6' } }} 
          />
        </Box>

        {/* Live Output Simulation Feed Terminal */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', minHeight: 70 }}>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#2563eb', display: 'block', mb: 0.5, fontWeight: 'bold' }}>
            [TWIN-OS LOG FEED]:
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#475569', lineHeight: 1.4, fontWeight: 500 }}>
            {log}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}