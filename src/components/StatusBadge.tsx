import { Chip } from '@mui/material';
import { PatientStatus } from '@/types';

interface StatusBadgeProps {
  status: PatientStatus;

}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip
      label={status.displayText}
      color="default"
      sx={{
        borderRadius: '16px',
        height: '32px',
        '& .MuiChip-label': {
          px: 2,
        },
      }}
    />
  );
} 