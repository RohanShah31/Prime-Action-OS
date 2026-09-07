'use client';

import React, { useState } from 'react';
import { Card, Box, Typography, Button, LinearProgress, Stack, Chip, Collapse } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BugReportIcon from '@mui/icons-material/BugReport';
import api from '../lib/api';

interface ProcessRow {
  name: string;
  code: string;
  score: number;
  status: 'Healthy' | 'Review' | 'Critical';
}

interface DiagnosisResult {
  action_code: string;
  root_cause: string;
  contributing_factors: string[];
}

interface ProcessMiningPanelProps {
  onSessionExpired?: () => void;
}

export default function ProcessMiningPanel({ onSessionExpired }: ProcessMiningPanelProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, DiagnosisResult>>({});
  
  const [processes, setProcesses] = useState<ProcessRow[]>([
    { name: 'Order-to-Cash', code: 'O2C', score: 91, status: 'Healthy' },
    { name: 'Record-to-Report', code: 'R2R', score: 88, status: 'Healthy' },
    { name: 'Procure-to-Pay', code: 'P2P', score: 82, status: 'Review' },
    { name: 'Plan-to-Produce', code: 'P2P-Prod', score: 79, status: 'Critical' },
  ]);

  const handleDiagnose = async (code: string) => {
    // Determine a mock action_id based on the process code for realistic variation
    const mockActionId = code === 'P2P' ? 3 : code === 'P2P-Prod' ? 5 : 1;

    setLoading(code);
    setError(null);
    
    try {
      const response = await api.post(`/api/ai/root-cause?action_id=${mockActionId}`);
      
      setDiagnoses(prev => ({
        ...prev,
        [code]: response.data
      }));

      // Increment score slightly to show improvement after diagnosis insight
      setProcesses(prev => prev.map(p => p.code === code ? { ...p, score: p.score + 4, status: (p.score + 4 >= 90 ? 'Healthy' : 'Review') } : p));

    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        if (onSessionExpired) onSessionExpired();
        else window.location.href = '/'; 
      } else {
        setError('Connection dropped. Check if your FastAPI server is online.');
      }
    } finally {
      setLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Healthy') return 'success';
    if (status === 'Review') return 'warning';
    return 'error';
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', borderRadius: '24px', bgcolor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ p: 2.5, px: 3, borderBottom: '1px solid #f1f5f9' }}>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Operational Process Health</Typography>
      </Box>

      <Stack spacing={2.5} sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
        {processes.map((proc) => (
          <Box key={proc.code}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {proc.name} ({proc.code})
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {(proc.status === 'Critical' || proc.status === 'Review') && !diagnoses[proc.code] && (
                  <Button 
                    variant="contained" 
                    size="small" 
                    color={getStatusColor(proc.status) as any}
                    disabled={loading !== null}
                    onClick={() => handleDiagnose(proc.code)}
                    sx={{ fontSize: '0.65rem', py: 0.2, px: 1, fontWeight: 'bold', boxShadow: 'none', borderRadius: '8px' }}
                  >
                    {loading === proc.code ? 'RUNNING...' : 'DIAGNOSE'}
                  </Button>
                )}
                <Chip 
                  label={`${proc.score}% - ${proc.status}`} 
                  color={getStatusColor(proc.status) as any} 
                  size="small" 
                  variant="outlined"
                  sx={{ fontWeight: 'bold', fontSize: '0.7rem', height: 22, borderWidth: 2 }}
                />
              </Box>
            </Box>
            
            <LinearProgress variant="determinate" value={proc.score} color={getStatusColor(proc.status) as any} sx={{ height: 6, borderRadius: 3, bgcolor: '#e2e8f0' }} />
            
            <Collapse in={!!diagnoses[proc.code]}>
              {diagnoses[proc.code] && (
                <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#2563eb', mb: 0.5 }}>
                    <BugReportIcon sx={{ fontSize: 14, mr: 0.5 }} /> AI Root Cause Diagnosis ({diagnoses[proc.code].action_code})
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#475569', display: 'block', mb: 0.5, fontWeight: 500 }}>
                    {diagnoses[proc.code].root_cause}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                    {diagnoses[proc.code].contributing_factors.map((f, i) => (
                      <Chip key={i} label={f} size="small" sx={{ fontSize: '0.6rem', height: 18, bgcolor: '#ffffff', border: '1px solid #cbd5e1', color: '#334155' }} />
                    ))}
                  </Box>
                </Box>
              )}
            </Collapse>
          </Box>
        ))}
      </Stack>

      {error && (
        <Box sx={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, p: 3 }}>
          <WarningAmberIcon color="error" sx={{ fontSize: 44, mb: 1 }} />
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', fontWeight: 'bold', px: 2 }}>{error}</Typography>
        </Box>
      )}
    </Card>
  );
}