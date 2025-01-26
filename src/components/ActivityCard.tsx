'use client';

import { Paper, Typography, Box, ButtonBase } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ActivityCardProps {
  title: string;
  imagePath: string;
  route: string;
}

export function ActivityCard({ title, imagePath, route }: ActivityCardProps) {
  const router = useRouter();

  return (
    <ButtonBase 
    //   onClick={() => router.push(route)}
      sx={{ 
        borderRadius: 2,
        textAlign: 'left',
        display: 'block'
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
    </ButtonBase>
  );
} 