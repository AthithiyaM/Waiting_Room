'use client';

import { Paper, Typography, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface NotificationCardProps {
  type: 'notification' | 'notes';
  title: string;
  items: string[];
  date?: string;
}

export function NotificationCard({ type, title, items, date }: NotificationCardProps) {
  return (
    <Paper sx={{ 
      p: 2, 
      minWidth: 250,
      mr: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 1 
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {type === 'notification' ? (
          <NotificationsIcon color="warning" />
        ) : (
          <EditNoteIcon color="primary" />
        )}
        <Typography variant="h6-bold">
          {title}
        </Typography>
      </Box>
      
      {date && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: -0.5 }}>
          {date}
        </Typography>
      )}
      
      {items.map((item, index) => (
        <Typography key={index} variant="body1">
          {item}
        </Typography>
      ))}
    </Paper>
  );
} 