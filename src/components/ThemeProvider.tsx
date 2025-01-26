'use client';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@mui/lab/themeAugmentation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

declare module '@mui/material/styles' {
  interface Palette {
    triage: {
      resuscitation: string;
      emergent: string;
      urgent: string;
      less_urgent: string;
      non_urgent: string;
    };
    timeline: {
      complete: string;
      current: string;
      default: string;
    };
  }
  interface PaletteOptions {
    triage: {
      resuscitation: string;
      emergent: string;
      urgent: string;
      less_urgent: string;
      non_urgent: string;
    };
    timeline: {
      complete: string;
      current: string;
      default: string;
    };
  }
  interface TypographyVariants {
    'h5-bold': React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    'h5-bold'?: React.CSSProperties;
  }
  interface TypographyVariants {
    'h6-bold': React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    'h6-bold'?: React.CSSProperties;
  }

  interface TypographyVariants {
    'body1-bold': React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    'body1-bold'?: React.CSSProperties;
  }

  }
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      'h6-bold': true;
    }

    interface TypographyPropsVariantOverrides {
      'h5-bold': true;
    }

    interface TypographyPropsVariantOverrides {
      'body1-bold': true;
    }
  }

const theme = createTheme({
  palette: {
    background: {
      default: '#EEEEF1',
    },
    triage: {
      resuscitation: '#2196F3',
      emergent: '#F45B69',
      urgent: '#FFBD6B',
      less_urgent: '#4CAF50',
      non_urgent: '#FFFFFF',
    },
    timeline: {
      complete: '#4CAF50',
      current: '#FFBD6B',
      default: '#A5D5F7',
    },
  },
  typography:{
    fontFamily: "'Roboto', 'Arial', sans-serif",
    'h5-bold': {
      fontSize: '1.5rem', // Same font size as h5
      fontWeight: 700,    // Bold font weight
      lineHeight: 1.334,  // Same line height as h5
      letterSpacing: '0em', // Same letter spacing as h5
    },
    'h6-bold': {
      fontSize: '1.25rem', // Same font size as h6
      fontWeight: 700,     // Bold font weight
      lineHeight: 1.6,     // Same line height as h6
      letterSpacing: '0.0075em', // Same letter spacing as h6
    },
    'body1-bold': {
      fontSize: '1.2rem',   // Same font size as body1
      fontWeight: 400,    // Bold font weight
      lineHeight: 1.2,    // Same line height as body1
      letterSpacing: '0.00938em', // Same letter spacing as body1
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