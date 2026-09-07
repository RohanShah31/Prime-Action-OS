'use client';
import React, { useState } from 'react';
import { Card, Box, Typography, Collapse, IconButton, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InsightsIcon from '@mui/icons-material/Insights';

const chains = [
  { 
    id: 1, 
    action: "Centralize Sourcing", 
    output: "Standardized Material Prices", 
    kpi: "Price Variance = 0%", 
    value: "COGS drops 4%",
    details: "By aggregating procurement across all 5 plants into a single enterprise contract (SAP EKKO/EKPO), we eliminate regional price discrepancies. Currently, Plant A pays 15% more for the same raw materials as Plant B."
  },
  { 
    id: 2, 
    action: "Predictive Maintenance", 
    output: "Machine Downtime Reduced", 
    kpi: "OEE > 85%", 
    value: "Yield increases 2%",
    details: "Deploying IoT sensors on bottleneck machines allows early detection of vibration anomalies. This shifts maintenance from reactive (breakdowns) to planned, increasing Overall Equipment Effectiveness (OEE) and total factory yield."
  },
  { 
    id: 3, 
    action: "Reprice Low-Margin Contracts", 
    output: "Eliminate Negative Margins", 
    kpi: "Avg Margin > 15%", 
    value: "EBITDA rises 3%",
    details: "18% of current revenue is generated from customers where the cost to serve exceeds gross profit. Updating condition records (SAP VK11) with hard margin floors prevents sales reps from discounting below profitability."
  }
];

export default function ActionImpactExplorer() {
  const [selectedChain, setSelectedChain] = useState<number | null>(1);

  return (
    <Card sx={{ bgcolor: '#1e293b', p: 3, borderRadius: 2, border: '1px solid #334155' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 1 }}>
        <InsightsIcon sx={{ color: '#38bdf8', fontSize: 28 }} />
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Interactive Business Impact Chains
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {chains.map((chain) => {
          const isSelected = selectedChain === chain.id;
          
          return (
            <Card 
              key={chain.id}
              onClick={() => setSelectedChain(isSelected ? null : chain.id)}
              sx={{ 
                bgcolor: isSelected ? '#0f172a' : '#1e293b', 
                border: isSelected ? '1px solid #38bdf8' : '1px solid #475569',
                borderRadius: 2, 
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: '#38bdf8',
                  bgcolor: '#0f172a'
                }
              }}
            >
              {/* Main Chain Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Box sx={{ textAlign: 'center', width: '22%' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 'bold', letterSpacing: 0.5 }}>ACTION</Typography>
                  <Typography sx={{ fontWeight: 'bold', color: '#ffffff', mt: 0.5 }}>{chain.action}</Typography>
                </Box>
                
                <ArrowForwardIcon sx={{ color: isSelected ? '#38bdf8' : '#94a3b8' }} />
                
                <Box sx={{ textAlign: 'center', width: '22%' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 'bold', letterSpacing: 0.5 }}>DIRECT OUTPUT</Typography>
                  <Typography sx={{ fontWeight: 'bold', color: '#ffffff', mt: 0.5 }}>{chain.output}</Typography>
                </Box>
                
                <ArrowForwardIcon sx={{ color: isSelected ? '#38bdf8' : '#94a3b8' }} />
                
                <Box sx={{ textAlign: 'center', width: '22%' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 'bold', letterSpacing: 0.5 }}>KPI IMPACT</Typography>
                  <Typography sx={{ fontWeight: 'bold', color: '#fbbf24', mt: 0.5 }}>{chain.kpi}</Typography>
                </Box>
                
                <ArrowForwardIcon sx={{ color: isSelected ? '#38bdf8' : '#94a3b8' }} />
                
                <Box sx={{ textAlign: 'center', width: '22%' }}>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 'bold', letterSpacing: 0.5 }}>BUSINESS VALUE</Typography>
                  <Typography sx={{ fontWeight: 'bold', color: '#34d399', mt: 0.5 }}>{chain.value}</Typography>
                </Box>
              </Box>

              {/* Expandable Details Section */}
              <Collapse in={isSelected}>
                <Divider sx={{ borderColor: '#334155' }} />
                <Box sx={{ p: 3, bgcolor: '#020617' }}>
                  <Typography variant="subtitle2" sx={{ color: '#38bdf8', mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' }}>
                    Execution Thesis
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#f8fafc', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {chain.details}
                  </Typography>
                </Box>
              </Collapse>
            </Card>
          );
        })}
      </Box>
    </Card>
  );
}