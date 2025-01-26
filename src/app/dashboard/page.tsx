'use client'

import { Box, Container, Paper, Typography } from '@mui/material';
import { StatusBadge } from '@/components/StatusBadge';
import { TreatmentTimeline } from '@/components/TreatmentTimeline';
import { usePatient } from '@/context/PatientContext';

export default function DashboardPage() {
  const { patientInfo } = usePatient();

  if (!patientInfo) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Good Afternoon
        </Typography>
        <StatusBadge status={patientInfo.status} />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Your Place
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 3 }}>
          {patientInfo.placeNumber}
        </Typography>
        <TreatmentTimeline steps={patientInfo.treatmentSteps} />
      </Paper>
    </Container>
  );
}