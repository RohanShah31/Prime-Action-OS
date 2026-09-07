'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SecureExecutiveDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      router.push('/executive-command-center');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

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
          body: formData.toString(),
        });
      } else {
        response = await fetch(`http://localhost:8000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        if (isLoginMode) {
          localStorage.setItem('token', data.access_token);
          setIsAuthenticated(true);
          router.push('/executive-command-center');
        } else {
          setSuccessMsg('Account created successfully! Please log in.');
          setIsLoginMode(true);
        }
      } else {
        const data = await response.json().catch(() => null);
        setError(data?.detail || 'Invalid credentials or backend offline.');
      }
    } catch (err) {
      setError('Connection refused. Is FastAPI running on port 8000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ p: 5, width: 450, display: 'flex', flexDirection: 'column', gap: 3, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 30, 60, 0.8)' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: '800', background: 'linear-gradient(45deg, #4dabf5, #1976d2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PrimeActionOS™
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, color: 'text.secondary' }}>
            Secure Executive Portal
          </Typography>
        </Box>
        {error && <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center' }}>{error}</Typography>}
        {successMsg && <Typography variant="body2" sx={{ color: 'success.main', textAlign: 'center' }}>{successMsg}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField label="Executive ID / Email" variant="outlined" fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ borderRadius: 1 }} />
          <TextField label="Passcode" type="password" variant="outlined" fullWidth value={password} onChange={e => setPassword(e.target.value)} sx={{ borderRadius: 1 }} />
          <Button type="submit" variant="contained" disabled={loading} sx={{ py: 1.5, mt: 1, borderRadius: 2, fontWeight: 'bold' }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : (isLoginMode ? 'AUTHORIZE SESSION' : 'REGISTER ACCOUNT')}
          </Button>
        </form>
        <Button 
          fullWidth 
          variant="text" 
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError('');
            setSuccessMsg('');
          }}
          sx={{ color: 'text.secondary' }}
        >
          {isLoginMode ? "Don't have an account? Register" : "Already have an account? Log In"}
        </Button>
      </Card>
    </Box>
  );
}