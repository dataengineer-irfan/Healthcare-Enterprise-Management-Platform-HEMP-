import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, TextField, Button, MenuItem, Select, FormControl,
  InputLabel, Card, CardContent, Chip, Stack, Divider
} from '@mui/material';
import { Send as SendIcon, AutoAwesome as AiIcon, Code as CodeIcon } from '@mui/icons-material';

export const AiStudioPage: React.FC = () => {
  const [model, setModel] = useState('Claude 3.5 Sonnet');
  const [prompt, setPrompt] = useState('Show paid claims for provider St. Jude General Hospital last month.');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'user', text: 'Show paid claims for provider St. Jude General Hospital last month.' },
    {
      sender: 'ai',
      text: 'Query executed successfully. Retrieved 42 claims totaling $148,250.00.',
      sql: 'SELECT c.claim_id, c.claim_number, c.total_paid_amount FROM domain.claim_header c JOIN domain.provider_profile p ON c.provider_id = p.provider_id WHERE p.provider_name = \'St. Jude General Hospital\' AND c.claim_status = \'PAID\';'
    }
  ]);

  const handleSend = () => {
    if (!prompt.trim()) return;
    const newChat = [...chatHistory, { sender: 'user', text: prompt }];
    setChatHistory(newChat);
    setPrompt('');

    setTimeout(() => {
      setChatHistory([
        ...newChat,
        {
          sender: 'ai',
          text: `Processed via ${model}. Found matching records in PostgreSQL database.`,
          sql: `SELECT * FROM domain.provider_profile WHERE status = 'ACTIVE' LIMIT 10;`
        }
      ]);
    }, 600);
  };

  return (
    <Box data-testid="ai-studio-chat">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0F4C81' }}>
            Enterprise AI Studio & Text-to-SQL Copilot
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configurable LLM Playground, Prompt Versioning & Governed RAG Query Engine
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>LLM Model Provider</InputLabel>
          <Select value={model} label="LLM Model Provider" onChange={(e) => setModel(e.target.value)}>
            <MenuItem value="Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</MenuItem>
            <MenuItem value="GPT-4o">OpenAI GPT-4o Enterprise</MenuItem>
            <MenuItem value="Qwen 2.5 72B">Qwen 2.5 72B Instruct</MenuItem>
            <MenuItem value="Llama 3 70B">Meta Llama 3 70B Local</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, height: 480, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              {chatHistory.map((msg, idx) => (
                <Box key={idx} sx={{ mb: 2, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  <Chip
                    avatar={msg.sender === 'ai' ? <AiIcon /> : undefined}
                    label={msg.sender === 'user' ? 'You' : model}
                    color={msg.sender === 'user' ? 'primary' : 'secondary'}
                    size="small"
                    sx={{ mb: 0.5 }}
                  />
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      display: 'inline-block',
                      maxWidth: '85%',
                      bgcolor: msg.sender === 'user' ? '#E0F2FE' : '#F8FAFC',
                      textAlign: 'left'
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    {msg.sql && (
                      <Box sx={{ mt: 1, p: 1, bgcolor: '#1E293B', color: '#38BDF8', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', color: '#94A3B8' }}>
                          <CodeIcon fontSize="inherit" /> GENERATED SQL PREVIEW:
                        </Typography>
                        {msg.sql}
                      </Box>
                    )}
                  </Paper>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 2 }} />
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask HEMP Copilot a natural language business question..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                inputProps={{ 'data-testid': 'ai-prompt-input' }}
              />
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleSend} data-testid="ai-send-button">
                Ask
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: 480 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Prompt History & RAG Context</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Available Semantic Targets:
            </Typography>
            <Stack spacing={1}>
              <Chip label="domain.provider_profile" variant="outlined" />
              <Chip label="domain.member_eligibility" variant="outlined" />
              <Chip label="domain.claim_header" variant="outlined" />
              <Chip label="finance.payment_batch" variant="outlined" />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
