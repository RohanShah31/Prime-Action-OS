'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Drawer, IconButton, Fab, TextField, InputAdornment, Avatar } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, role: 'ai', text: 'Prime Action OS Copilot online. Neo4j Graph, Digital Twin, and SAP-RPT1 are synced. How can I assist you today?' }
];

export default function ExecutiveCopilotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    const newUserMsg: Message = { id: Date.now(), role: 'user', text: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    const aiMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', text: '' }]);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/v1/copilot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: userText })
      });

      if (!response.body) throw new Error('No readable stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        // Parse SSE lines
        const lines = chunkValue.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr) {
              try {
                // If the string starts with '{', assume it's JSON from normal streaming
                if (dataStr.startsWith('{')) {
                  const dataObj = JSON.parse(dataStr);
                  if (dataObj.text) {
                    setMessages(prev => prev.map(msg => msg.id === aiMsgId ? { ...msg, text: msg.text + dataObj.text } : msg));
                  }
                } else {
                  // Fallback mode plaintext stream
                  setMessages(prev => prev.map(msg => msg.id === aiMsgId ? { ...msg, text: msg.text + dataStr } : msg));
                }
              } catch (e) {
                console.error("Error parsing stream chunk", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg => msg.id === aiMsgId ? { ...msg, text: msg.text + "\n[System: Copilot offline. Error connecting to backend.]" } : msg));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <Fab 
        color="primary" 
        onClick={() => setIsOpen(true)}
        sx={{ 
          position: 'fixed', 
          bottom: 30, 
          right: 30, 
          bgcolor: 'primary.main', 
          '&:hover': { bgcolor: 'primary.dark' },
          boxShadow: '0 0 20px rgba(77, 171, 245, 0.5)'
        }}
      >
        <AutoAwesomeIcon />
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 }, bgcolor: 'background.default', borderLeft: '1px solid rgba(255,255,255,0.1)' } }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 'bold' }}>Qwen Executive Copilot</Typography>
          </Box>
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'text.secondary' }} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((msg) => (
            <Box key={msg.id} sx={{ display: 'flex', gap: 1.5, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <Avatar sx={{ bgcolor: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(16,185,129,0.1)', color: msg.role === 'user' ? 'white' : '#10b981', width: 32, height: 32 }}>
                {msg.role === 'user' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
              </Avatar>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                maxWidth: '75%',
                bgcolor: msg.role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(16,185,129,0.05)',
                border: '1px solid',
                borderColor: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(16,185,129,0.2)',
                color: 'text.primary',
                whiteSpace: 'pre-wrap'
              }}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{msg.text}</Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask about EBITDA, Risks, or SAP data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
            sx={{ 
              input: { color: 'white', fontSize: '0.9rem' },
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(0,0,0,0.2)',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSend} sx={{ color: 'primary.main' }} edge="end" disabled={isTyping || !input.trim()}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
          />
        </Box>
      </Drawer>
    </>
  );
}