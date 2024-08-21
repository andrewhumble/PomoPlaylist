import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '2rem', // Adjust according to your needs
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '0.5rem',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '0.5rem',
            fontWeight: 'normal',
        },
        h4: {
            fontSize: '0.5rem',
            fontWeight: 'normal',
        },
        // Customize other typography variants if needed
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
    },
});

export default theme;
