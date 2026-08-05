import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0F4C81', // Professional Healthcare Classic Blue
      light: '#3F78B2',
      dark: '#002554',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00A896', // Medical Teal Accent
      light: '#52DAC7',
      dark: '#007868',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F6F9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});
