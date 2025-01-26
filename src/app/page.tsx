'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { checkPatientID } from '@/services/api';
import { usePatient } from '@/context/PatientContext';

export default function HomePage() {
  const [localPatientId, setLocalPatientId] = useState('');
  const router = useRouter();
  const { setPatientId } = usePatient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = await checkPatientID(localPatientId);
      if (isValid) {
        setPatientId(localPatientId);
        router.push('/dashboard');
      } else {
        alert("Patient not found");
      }
    } catch (error) {
      console.error('Failed to validate patient ID:', error);
      alert("Error validating patient ID");
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          maxWidth: 400,
          p: 3,
        }}
      >
        <Typography 
          variant="h5-bold" 
          component="h1" 
          textAlign="center"
        >
          Enter your patient ID here
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          value={localPatientId}
          onChange={(e) => setLocalPatientId(e.target.value)}
          placeholder="e.g., anon_1234"
          sx={{ mt: 2 }}
        />

        <Button 
          variant="contained" 
          type="submit"
          sx={{ 
            minWidth: 200,
            mt: 2 
          }}
        >
          Continue
        </Button>
      </Box>
    </Container>
  );
}
