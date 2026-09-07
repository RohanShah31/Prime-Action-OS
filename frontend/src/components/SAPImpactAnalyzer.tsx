'use client';
import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, Chip, IconButton, Collapse, CircularProgress } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useActionStore } from '../lib/store';
import api from '../lib/api';

interface SAPObservation {
  id: number;
  sap_table: string;
  observation: string;
  financial_impact: number;
  confidence_score: number;
}

export default function SAPImpactAnalyzer() {
  const { actions } = useActionStore();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sapData, setSapData] = useState<Record<number, SAPObservation[]>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleToggle = async (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    
    setExpandedId(id);
    if (!sapData[id]) {
      setLoadingId(id);
      try {
        const response = await api.get(`/api/sap/action/${id}`);
        setSapData(prev => ({ ...prev, [id]: response.data }));
      } catch (error) {
        console.error("Failed to fetch SAP data", error);
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: 'text.primary', p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
        SAP Table Impact Map
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
        Click on an action to reveal the exact ERP database tables that will be modified.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {actions.slice(0, 3).map((action) => (
          <Box key={action.id}>
            <Card 
              onClick={() => handleToggle(action.id)}
              sx={{ 
                bgcolor: expandedId === action.id ? 'rgba(0,0,0,0.2)' : 'background.paper', 
                border: '1px solid',
                borderColor: expandedId === action.id ? 'primary.main' : 'rgba(255,255,255,0.1)', 
                p: 3, 
                borderRadius: 2, 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'primary.main'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorageIcon color={expandedId === action.id ? 'primary' : 'action'} />
                  <Typography sx={{ fontWeight: 'bold' }}>{action.category}</Typography>
                </Box>
                <IconButton size="small">
                  {expandedId === action.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {action.action_name}
              </Typography>

              <Collapse in={expandedId === action.id}>
                <Box sx={{ mt: 3 }}>
                  {loadingId === action.id ? (
                    <CircularProgress size={24} />
                  ) : sapData[action.id]?.length ? (
                    sapData[action.id].map(obs => (
                      <Box key={obs.id} sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          {obs.observation}
                        </Typography>
                        <Chip 
                          label={obs.sap_table} 
                          size="small" 
                          sx={{ bgcolor: 'rgba(255,255,255,0.1)', fontFamily: 'monospace', fontWeight: 'bold', mb: 1 }} 
                        />
                        <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 'bold', display: 'block' }}>
                          IMPACT: +${Number(obs.financial_impact).toLocaleString()}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">No SAP mappings found.</Typography>
                  )}
                </Box>
              </Collapse>
            </Card>
          </Box>
        ))}
      </Box>
    </Card>
  );
}