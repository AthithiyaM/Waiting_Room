/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { StatusBadge } from '@/components/StatusBadge';
import { TreatmentTimeline } from '@/components/TreatmentTimeline';
import { NotificationCard } from '@/components/NotificationCard';
import { ActivityCard } from '@/components/ActivityCard';
import { usePatient } from '@/context/PatientContext';
import { getTriageLabel } from '@/types';
import { fetchPatientInfo } from '@/services/api';

const activities = [
  {
    title: 'Talk',
    imagePath: '/images/TalkActivity.png',
    route: 'https://parade.com/969981/parade/conversation-starters/'
  },
  {
    title: 'Explore',
    imagePath: '/images/exploreActivity.png',
    route: 'https://www.figma.com/proto/NcRFm3739bA5EgCXcq3pPe/McHacks12-Design-File?node-id=20-67'
  },
  {
    title: 'Games',
    imagePath: '/images/games.png',
    route: 'https://trex-runner.com/'
  },
  {
    title: 'Meditate',
    imagePath: '/images/meditateActivity.png',
    route: 'https://g.co/kgs/D7EAHJa'
  }
];

export default function DashboardPage() {
  const { patientInfo, setPatientInfo, patientId } = usePatient();

  useEffect(() => {
    const refreshPatientInfo = async () => {
      try {
        const data = await fetchPatientInfo(patientId);
        console.log("IN DASHBOARD", data);
        setPatientInfo(data);
      } catch (error) {
        console.error('Failed to fetch patient info:', error);
      }
    };

    if (patientId) {
      refreshPatientInfo();
      const intervalId = setInterval(refreshPatientInfo, 30000);
      return () => clearInterval(intervalId);
    }
  }, [setPatientInfo, patientId]);

  if (!patientInfo) {
    return null;
  }

  // Get the current phase for notifications
  // const getCurrentPhase = () => {
  //   const phases = Object.entries(patientInfo.status_by_phase);
  //   const currentPhase = phases.find(([_, status]) => status === 'In Progress');
  //   return currentPhase ? currentPhase[0] : null;
  // };

  // const currentPhase = getCurrentPhase();
  // const notificationItems = [];
  
  // if (currentPhase) {
  //   notificationItems.push(`${currentPhase.replace(/_/g, ' ')} in progress`);
  // }
  
  // if (patientInfo.investigations.labs === 'pending') {
  //   notificationItems.push('Lab results pending');
  // }
  // if (patientInfo.investigations.imaging === 'pending') {
  //   notificationItems.push('Imaging results pending');
  // }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5-bold" component="h1" sx={{ mb: 2 }}>
          Good Afternoon
        </Typography>
        <StatusBadge 
          status={{
            status: 'requires-non-urgent-care',
            displayText: `Requires ${getTriageLabel(Number(patientInfo.triage_category))} care`
          }} 
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 0 }}>
          <Typography variant="h6-bold" component="h2" sx={{ mb: 2 }}>
            Your Place
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="div">
              #{patientInfo.queue_position_global}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estimated wait: {patientInfo.estimated_wait} minutes
            </Typography>
          </Box>
        </Box>

        <TreatmentTimeline patientInfo={patientInfo} />
      </Paper>

      {/* Notifications Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6-bold" component="h2" sx={{ mb: 2 }}>
          Updates
        </Typography>
        <Box sx={{ 
          display: 'flex',
          overflowX: 'auto',
          pb: 2,
          '::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          <NotificationCard
            type="notification"
            title="Notifications"
            date="SUNDAY, JUNE 14, 6:45 PM"
            items={['Investigations pending']}
          />
          <NotificationCard
            type="notes"
            title="My Notes"
            items={['No food', 'No drink']}
          />
        </Box>
      </Box>

      {/* Activities Section */}
      <Box>
        <Typography variant="h6-bold" component="h2" sx={{ mb: 2 }}>
          Activities
        </Typography>
        <Box sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mx: -1,
        }}>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.title}
              title={activity.title}
              imagePath={activity.imagePath}
              route={activity.route}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}