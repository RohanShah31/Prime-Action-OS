'use client';

import React from 'react';
import { Card, Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Chip, Skeleton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useActionStore } from '../lib/store';

export default function ActionReviewWorkbench() {
  const { actions, isLoading, updateActionStatus } = useActionStore();

  const handleStatusChange = async (id: number, newStatus: string) => {
    await updateActionStatus(id, newStatus);
  };

  return (
    <Card sx={{ bgcolor: 'background.paper', color: 'white', p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>AI Action Review Workbench</Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.2)' }}>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Action Intent</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Est. Impact</TableCell>
            <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>AI Confidence</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Execution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from(new Array(3)).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton variant="text" sx={{ bgcolor: 'grey.800' }} width={200} /></TableCell>
                <TableCell><Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800' }} width={80} height={24} /></TableCell>
                <TableCell><Skeleton variant="text" sx={{ bgcolor: 'grey.800' }} width={100} /></TableCell>
                <TableCell><Skeleton variant="text" sx={{ bgcolor: 'grey.800' }} width={50} /></TableCell>
                <TableCell><Skeleton variant="text" sx={{ bgcolor: 'grey.800' }} width={150} /></TableCell>
              </TableRow>
            ))
          ) : actions.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{row.action_name}</TableCell>
              <TableCell><Chip label={row.category} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}/></TableCell>
              <TableCell sx={{ color: '#10b981', fontWeight: 'bold' }}>+${Number(row.expected_benefit).toLocaleString()}</TableCell>
              <TableCell sx={{ color: '#f59e0b' }}>{row.confidence_score}%</TableCell>
              <TableCell align="right">
                {row.status === 'Pending' ? (
                  <>
                    <Button 
                      size="small" 
                      startIcon={<CheckCircleIcon />} 
                      sx={{ color: '#10b981', mr: 1 }}
                      onClick={() => handleStatusChange(row.id, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<CancelIcon />} 
                      sx={{ color: '#ef4444' }}
                      onClick={() => handleStatusChange(row.id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <Chip 
                    label={row.status} 
                    size="small" 
                    sx={{ 
                      bgcolor: row.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                      color: row.status === 'Approved' ? '#10b981' : '#ef4444',
                      fontWeight: 'bold'
                    }} 
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}