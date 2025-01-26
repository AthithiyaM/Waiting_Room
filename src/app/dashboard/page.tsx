'use client'

import { Box, Container, Paper, Typography } from '@mui/material';
import { StatusBadge } from '@/components/StatusBadge';
import { TreatmentTimeline } from '@/components/TreatmentTimeline';
import { NotificationCard } from '@/components/NotificationCard';
import { ActivityCard } from '@/components/ActivityCard';
import { usePatient } from '@/context/PatientContext';

const activities = [
  {
    title: 'Talk',
    imagePath: '/images/activities/talk.svg',
    route: '/activities/talk'
  },
  {
    title: 'Explore',
    imagePath: '/images/activities/explore.svg',
    route: '/activities/explore'
  },
  {
    title: 'Games',
    imagePath: '/images/activities/games.svg',
    route: '/activities/games'
  },
  {
    title: 'Meditate',
    imagePath: '/images/activities/meditate.svg',
    route: '/activities/meditate'
  }
];

export default function DashboardPage() {
  const { patientInfo } = usePatient();

  if (!patientInfo) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5-bold" component="h1" sx={{ mb: 2 }}>
          Good Afternoon
        </Typography>
        <StatusBadge status={patientInfo.status} />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        {/* Queue Information Section */}
        <Box sx={{ mb: 0 }}>
          <Typography variant="h6-bold" component="h2" sx={{ mb: 2 }}>
            Your Place
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="div">
              {patientInfo.placeNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estimated wait: 150 minutes
            </Typography>
          </Box>
        </Box>

        {/* Timeline Section */}
        <TreatmentTimeline steps={patientInfo.treatmentSteps} />
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
          '::-webkit-scrollbar': {
            display: 'none'
          },
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