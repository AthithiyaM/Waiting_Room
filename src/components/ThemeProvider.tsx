'use client';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@mui/lab/themeAugmentation';

declare module '@mui/material/styles' {
  interface Palette {
    triage: {
      emergent: string;
      urgent: string;
      lessUrgent: string;
      nonUrgent: string;
    };
    timeline: {
      completed: string;
      inProgress: string;
      notStarted: string;
    };
  }
  interface PaletteOptions {
    triage: {
      emergent: string;
      urgent: string;
      lessUrgent: string;
      nonUrgent: string;
    };
    timeline: {
      completed: string;
      inProgress: string;
      notStarted: string;
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#EEEEF1',
    },
    triage: {
      emergent: '#FF0000',
      urgent: '#FFBD6B',
      lessUrgent: '#4AA451',
      nonUrgent: '#FFFFFF',
    },
    timeline: {
      completed: '#4AA451',
      inProgress: '#FFBD6B',
      notStarted: '#A5D5F7',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          width: 2,
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
} 