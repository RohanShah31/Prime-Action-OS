import React from 'react';
import { Card, Box, Typography, Stack } from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';

export default function SAPDependencyGraph() {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2, background: 'linear-gradient(145deg, rgba(20,25,35,0.8) 0%, rgba(10,15,25,0.9) 100%)', border: '1px solid rgba(0, 229, 255, 0.2)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', backdropFilter: 'blur(4px)' }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }} spacing={2}>
        <HubIcon sx={{ color: '#00E5FF', filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.5))' }} />
        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>SAP Ontology Dependency Graph</Typography>
      </Stack>
      <Box sx={{ height: 300, width: '100%', bgcolor: 'rgba(0,0,0,0.4)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle grid background */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Nodes and Edges */}
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <Node label="KNA1" desc="Customer" color="#4caf50" />
          <Edge color="#4caf50" />
          <Node label="VBAK" desc="Sales Header" color="#2196f3" />
          <Edge color="#2196f3" />
          <Node label="VBAP" desc="Sales Item" color="#9c27b0" />
          <Edge color="#9c27b0" />
          <Node label="KONV" desc="Pricing" color="#ff9800" pulse />
        </Stack>
      </Box>
    </Card>
  );
}

function Node({ label, desc, color, pulse = false }: { label: string, desc: string, color: string, pulse?: boolean }) {
  return (
    <Box sx={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: 90, height: 90, borderRadius: '50%', 
      background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`, 
      border: `2px solid ${color}`,
      boxShadow: pulse ? `0 0 20px ${color}88` : `0 0 10px ${color}44`,
      animation: pulse ? 'pulse 2s infinite' : 'none',
      '@keyframes pulse': { '0%': { boxShadow: `0 0 0 0 ${color}88` }, '70%': { boxShadow: `0 0 0 15px ${color}00` }, '100%': { boxShadow: `0 0 0 0 ${color}00` } }
    }}>
      <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}>{label}</Typography>
      <Typography variant="caption" sx={{ color: 'grey.400', fontSize: '0.65rem' }}>{desc}</Typography>
    </Box>
  );
}

function Edge({ color }: { color: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 40 }}>
      <Box sx={{ height: 2, flexGrow: 1, bgcolor: color, opacity: 0.5 }} />
      <Box sx={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `6px solid ${color}`, opacity: 0.8 }} />
    </Box>
  );
}
