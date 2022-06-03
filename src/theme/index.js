import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: 'Lato, serif',
      fontSize: 12,
    },
    palette: {
      primary: {
        light: '#444',
        main: '#232323',
        dark: '#111',
        contrastText: '#fff',
      },
      secondary: {
        light: '#00e676',
        main: '#00e676',
        dark: '#00a152',
        contrastText: '#000',
      },
    },
});

export default theme;