import React from 'react';
import { Card, Box, Typography, Stack, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

export default function ComplianceImpactPanel() {
  return (
    <Card sx={{ p: 3, mb: 3, borderRadius: 2, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2 }} spacing={2}>
        <ShieldIcon sx={{ color: '#4caf50' }} />
        <Typography variant="h6" color="white">Compliance & Security Impact</Typography>
      </Stack>
      <List>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
          <ListItemText 
            primary={<Typography color="white">SOX Control: Segregation of Duties</Typography>} 
            secondary={<Typography color="grey.400" variant="body2">No violations detected in proposed pricing workflow.</Typography>} 
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
          <ListItemText 
            primary={<Typography color="white">Transport Risk: High</Typography>} 
            secondary={<Typography color="grey.400" variant="body2">Modifying ZPR0 requires Level 3 transport approval.</Typography>} 
          />
        </ListItem>
      </List>
    </Card>
  );
}
