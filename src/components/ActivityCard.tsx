/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Paper, Typography, Box } from '@mui/material';
import Image from 'next/image';

interface ActivityCardProps {
  title: string;
  imagePath: string;
  route: string;
}

export function ActivityCard({ title, imagePath, route }: ActivityCardProps) {
  return (
    <a 
      href={route}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      <Paper sx={{ 
        p: 2,
        minWidth: 150,
        mr: 2,
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.02)'
        }
      }}>
        <Box sx={{ mb: 2, position: 'relative', height: 120 }}>
          <Image
            src={imagePath}
            alt={title}
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="body1-bold" component="h3">
          {title}
        </Typography>
      </Paper>
    </a>
  );
} 