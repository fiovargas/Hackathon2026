import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#7AAC21', // Verde principal
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#007BA7', // Azul suave
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#ef4444',
        },
        success: {
            main: '#A9F971', // Verde acento
            contrastText: '#1A1A1A',
        },
        background: {
            default: '#F8FAF9', // Fondo general gris/verde muy claro
            paper: '#FFFFFF',   // Fondo de tarjetas/paneles
        },
        text: {
            primary: '#1A1A1A', // Oscuro para legibilidad
            secondary: '#64748b', // Gris medio para textos menores
        },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 900 },
        h2: { fontWeight: 900 },
        h3: { fontWeight: 800 },
        h4: { fontWeight: 800 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        subtitle1: { fontWeight: 600 },
        subtitle2: { fontWeight: 600 },
        button: {
            textTransform: 'none', // Botones más elegantes sin mayúsculas forzadas
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 12, // Bordes redondeados más suaves
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    border: '1px solid #e2e8f0',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export default theme;
