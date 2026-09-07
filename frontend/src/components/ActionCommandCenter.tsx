'use client';

import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, Button, CircularProgress, Stack, Chip, Divider } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import api from '../lib/api';

interface AIRecommendation {
  id: number;
  code: string;
  name: string;
  target_tables: string;
  expected_impact: string;
}

export default function ActionCommandCenter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/ai/recommendations');
      setRecommendations(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to reach the AI inference engine. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', borderRadius: '24px', bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* Matrix Header */}
      <Box sx={{ p: 2.5, px: 3, borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>AI Decision Intelligence Matrix</Typography>
        <Button 
          variant="contained" 
          onClick={handleGenerate} 
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
          sx={{ bgcolor: '#000000', color: 'white', fontWeight: 'bold', borderRadius: '8px', boxShadow: 'none', '&:hover': { bgcolor: '#334155', boxShadow: 'none' } }}
        >
          {loading ? 'ANALYZING...' : 'REFRESH'}
        </Button>
      </Box>

      {/* Content Rendering Canvas */}
      <Box sx={{ p: 3, flexGrow: 1, bgcolor: 'transparent', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: 500 }}>
        
        {error && (
          <Box sx={{ mb: 2, p: 1.5, bgcolor: '#fee2e2', borderRadius: 2, border: '1px solid #fca5a5' }}>
            <Typography variant="body2" sx={{ color: '#b91c1c', textAlign: 'center', fontWeight: 'bold' }}>{error}</Typography>
          </Box>
        )}

        {/* Populated State */}
        <Stack spacing={3}>
          {recommendations.map((rec) => (
            <Card key={rec.id} sx={{ p: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(0,0,0,0.06)', borderColor: '#cbd5e1' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {rec.name}
                </Typography>
                <Chip label={rec.code} size="small" sx={{ fontWeight: 'bold', bgcolor: '#f1f5f9', color: '#475569', letterSpacing: '0.5px' }} />
              </Box>
              <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, display: 'block', mb: 0.5, letterSpacing: '0.5px' }}>
                    TARGET SAP CLUSTERS
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: '#f8fafc', border: '1px solid #e2e8f0', px: 1, py: 0.5, borderRadius: 1.5, color: '#334155', fontWeight: 600 }}>
                    {rec.target_tables}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, display: 'block', mb: 0.5, letterSpacing: '0.5px' }}>
                    PROJECTED IMPACT
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981', bgcolor: '#ecfdf5', border: '1px solid #a7f3d0', px: 1.5, py: 0.5, borderRadius: 1.5 }}>
                    {rec.expected_impact}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button size="small" variant="outlined" href={`/impact/${rec.id}`} sx={{ flex: 1, borderColor: '#cbd5e1', color: '#475569', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#f8fafc', borderColor: '#94a3b8' } }}>
                  Explore Impact
                </Button>
                <Button size="small" variant="outlined" href="/sap-impact" sx={{ flex: 1, borderColor: '#cbd5e1', color: '#475569', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#f8fafc', borderColor: '#94a3b8' } }}>
                  SAP Analyzer
                </Button>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}