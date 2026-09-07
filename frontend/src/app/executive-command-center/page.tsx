'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material';
import AuthGuard from '@/components/AuthGuard';

// Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// Screen 1 Components
import ProcessMiningPanel from '@/components/ProcessMiningPanel';
import MacroExposureMatrix from '@/components/MacroExposureMatrix';
import DigitalTwinPanel from '@/components/DigitalTwinPanel';
import KnowledgeGraphPanel from '@/components/KnowledgeGraphPanel';
import ActionCommandCenter from '@/components/ActionCommandCenter';

// New Screens
import ActionReviewWorkbench from '@/components/ActionReviewWorkbench';
import PnLImpactSimulator from '@/components/PnLImpactSimulator';
import ActionImpactExplorer from '@/components/ActionImpactExplorer';
import SAPImpactAnalyzer from '@/components/SAPImpactAnalyzer';

import ExecutiveCopilotPanel from '@/components/ExecutiveCopilotPanel';
import { useActionStore } from '@/lib/store';

export default function ExecutiveDashboard() {
  const [currentTab, setCurrentTab] = useState(0);
  const { fetchActions } = useActionStore();

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  const menuItems = [
    { icon: <SpaceDashboardOutlinedIcon />, label: 'Command Center' },
    { icon: <FactCheckOutlinedIcon />, label: 'Action Workbench' },
    { icon: <QueryStatsOutlinedIcon />, label: 'P&L Simulator' },
    { icon: <AccountTreeOutlinedIcon />, label: 'Impact Explorer' },
    { icon: <StorageOutlinedIcon />, label: 'SAP Analyzer' }
  ];

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#eef2f5', p: 2, gap: 2 }}>
        
        {/* Vertical Sidebar */}
        <Box sx={{ 
          width: 70, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          py: 2
        }}>
          {/* Logo (Colorful Star) */}
          <Box sx={{ 
            mb: 4, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            bgcolor: '#ffffff',
            borderRadius: '16px',
            p: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <AutoAwesomeIcon sx={{ fontSize: 32, color: '#000000' }} />
          </Box>

          {/* Icon Tabs */}
          {menuItems.map((item, index) => {
            const isActive = currentTab === index;
            return (
              <Tooltip key={index} title={item.label} placement="right" arrow>
                <IconButton 
                  onClick={() => setCurrentTab(index)}
                  sx={{ 
                    bgcolor: isActive ? '#000000' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    p: 1.5,
                    mb: 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: isActive ? '#000000' : 'rgba(0,0,0,0.04)',
                      color: isActive ? '#ffffff' : '#000000',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            );
          })}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Disconnect Button */}
          <Tooltip title="Disconnect" placement="right" arrow>
            <IconButton 
              onClick={handleDisconnect}
              sx={{ color: '#64748b', bgcolor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', '&:hover': { color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, height: '100%', overflowY: 'auto', position: 'relative', bgcolor: '#ffffff', borderRadius: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <Container maxWidth="xl" sx={{ pt: 5, pb: 5 }}>
            
            {/* SCREEN 1: Original Command Center */}
            {currentTab === 0 && (
              <>
                <Box sx={{ mb: 5 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#000000', mb: 1, letterSpacing: '-1.5px' }}>Welcome back!</Typography>
                  <Typography variant="subtitle1" sx={{ color: 'grey.600', fontWeight: 600 }}>PrimeActionOS Overview</Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: { md: 'span 1' } }}>
                    <ProcessMiningPanel />
                    <DigitalTwinPanel />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, gridColumn: { md: 'span 2' } }}>
                    <MacroExposureMatrix />
                    <KnowledgeGraphPanel />
                    <ActionCommandCenter />
                  </Box>
                </Box>
              </>
            )}

            {/* SCREEN 2 */}
            {currentTab === 1 && <ActionReviewWorkbench />}
            
            {/* SCREEN 3 */}
            {currentTab === 2 && <PnLImpactSimulator />}
            
            {/* SCREEN 4 */}
            {currentTab === 3 && <ActionImpactExplorer />}
            
            {/* SCREEN 5 */}
            {currentTab === 4 && <SAPImpactAnalyzer />}

          </Container>
          
          {/* The Floating AI Copilot */}
          <ExecutiveCopilotPanel />
        </Box>
      </Box>
    </AuthGuard>
  );
}