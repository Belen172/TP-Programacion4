import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7D8C69', // Verde 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#C2A083', // Marrón claro
      contrastText: '#ffffff',
    },
    background: {
      default: '#FAF7F2', // Beige 
      paper: '#FFFFFF', // Blanco para tarjetas
    },
    text: {
      primary: '#3E3E3E', // Gris oscuro 
      secondary: '#6B6B6B', // Gris suave
    },
  },
  typography: {
    fontFamily: "'Quicksand', 'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
      color: '#3E3E3E',
    },
    h6: {
      fontWeight: 600,
      color: '#4F5B45',
    },
    body1: {
      fontSize: 16,
      color: '#4A4A4A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#6E7A58', 
            boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A3B18A',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7D8C69',
            boxShadow: '0 0 4px rgba(125,140,105,0.4)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: '#E8F3E8',
          color: '#3E503E',
        },
        standardError: {
          backgroundColor: '#FDECEA',
          color: '#6B2B2B',
        },
        standardWarning: {
          backgroundColor: '#FFF8E1',
          color: '#705A00',
        },
        standardInfo: {
          backgroundColor: '#E8F0FE',
          color: '#2C4C8A',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@media print': {
          '.no-print': {
            display: 'none !important',
          },
          body: {
            backgroundColor: '#ffffff',
            printColorAdjust: 'exact',
          }
        }
      }
    }
  },
});
