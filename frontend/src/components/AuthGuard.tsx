'use client';

import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, TextField, Button, Alert } from '@mui/material';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Check if token exists on load, but wait for client mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    
    try {
      let response;
      if (isLoginMode) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        response = await fetch(`http://localhost:8000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData,
        });
      } else {
        response = await fetch(`http://localhost:8000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      if (isLoginMode) {
        localStorage.setItem('token', data.access_token);
        setIsAuthenticated(true);
      } else {
        setSuccessMsg('Account created successfully! Please log in.');
        setIsLoginMode(true);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Do not render anything until the client has mounted and checked storage
  if (!mounted) return null;

  // If authenticated, render the main dashboard (children)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If NOT authenticated, show the Login/Register Wall
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0f172a' }}>
      <Card sx={{ p: 4, width: '100%', maxWidth: 400, boxShadow: 3, borderRadius: 2 }}>
        
        {/* FIXED: Moved textAlign and mb into the sx prop */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          Prime Action OS
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
          {isLoginMode ? 'Sign in to access your dashboard' : 'Create a new administrator account'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email Address" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2, mb: 2, py: 1.5, bgcolor: '#0284c7', '&:hover': { bgcolor: '#0369a1' } }}>
            {isLoginMode ? 'SECURE LOGIN' : 'REGISTER ACCOUNT'}
          </Button>
        </form>

        {/* This is the toggle button you will use to create a new user */}
        <Button 
          fullWidth 
          variant="text" 
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError(null);
            setSuccessMsg(null);
          }}
        >
          {isLoginMode ? "Don't have an account? Register" : "Already have an account? Log In"}
        </Button>
      </Card>
    </Box>
  );
}