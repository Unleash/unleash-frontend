import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export default createTheme({
    boxShadows: {
        main: '0px 2px 4px rgba(129, 122, 254, 0.2)',
    },
    typography: {
        fontFamily: 'Sen, Roboto, sans-serif',
        fontWeightBold: '700',
        fontWeightMedium: '700',
        allVariants: { lineHeight: 1.4 },
        button: { lineHeight: 1.75 },
        h1: {
            fontSize: '1.5rem',
            lineHeight: '1.5rem',
        },
        h2: {
            fontSize: '1.25rem',
            lineHeight: '1.25rem',
        },
        h3: {
            fontSize: '1rem',
            lineHeight: '1.375rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: '1.375rem',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
        },
    },
    fontSizes: {
        mainHeader: '1.5rem',
        subHeader: '1.25rem',
        bodySize: '1rem',
        smallBody: '0.875rem',
        smallerBody: '0.75rem',
    },
    fontWeight: {
        thin: 300,
        medium: 400,
        semi: 700,
        bold: 700,
    },
    shape: {
        borderRadius: '3px',
        borderRadiusMedium: '8px',
        borderRadiusLarge: '10px',
        borderRadiusExtraLarge: '25px',
    },
    palette: {
        primary: {
            main: colors.purple[800],
            light: colors.purple[700],
            dark: colors.purple[900],
        },
        secondary: {
            main: colors.purple[800],
            light: colors.purple[700],
            dark: colors.purple[900],
        },
        info: {
            light: colors.blue[700],
            main: colors.blue[700],
            dark: colors.blue[800],
        },
        success: {
            light: colors.green[700],
            main: colors.green[700],
            dark: colors.green[800],
        },
        warning: {
            light: colors.orange[700],
            main: colors.orange[700],
            dark: colors.orange[800],
        },
        error: {
            light: colors.red[700],
            main: colors.red[700],
            dark: colors.red[800],
        },
        divider: colors.grey[300],
        dividerAlternative: colors.grey[500],
        hover: 'rgba(120,120,122,0.1)',
        highlight: '#FFEACC',
        sidebarContainer: 'rgba(32,32,33, 0.2)',
        sidebarDivider: 'rgba(255, 255, 255, 0.3)',
        grey: colors.grey,
        text: {
            primary: colors.grey[900],
            secondary: colors.grey[800],
            disabled: colors.grey[600],
        },
        code: {
            main: '#0b8c8f',
            diffAdd: 'green',
            diffSub: 'red',
            diffNeutral: 'black',
            edited: 'blue',
            background: '#efefef',
        },
        activityIndicators: {
            unknown: colors.grey[100],
            recent: colors.green[100],
            inactive: colors.orange[200],
            abandoned: colors.red[200],
        },
        action: {
            active: 'rgba(32,32,33,0.54)',
            hover: 'rgba(32,32,33,0.04)',
            selected: 'rgba(32,32,33,0.08)',
            disabled: 'rgba(32,32,33,0.26)',
            disabledBackground: 'rgba(32,32,33,0.12)',
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: colors.purple[900],
                    '&:hover': {
                        textDecoration: 'none',
                    },
                },
            },
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    color: colors.grey[900],
                    '& a': {
                        color: colors.purple[900],
                        textDecoration: 'underline',
                        '&:hover': {
                            textDecoration: 'none',
                        },
                    },
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    background: colors.grey[200],
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&.MuiTableRow-hover:hover': {
                        background: colors.grey[100],
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: colors.grey[300],
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    '&.MuiAlert-standardInfo': {
                        border: `1px solid ${colors.blue[200]}`,
                    },
                    '&.MuiAlert-standardSuccess': {
                        border: `1px solid ${colors.green[300]}`,
                    },
                    '&.MuiAlert-standardWarning': {
                        border: `1px solid ${colors.orange[500]}`,
                    },
                    '&.MuiAlert-standardError': {
                        border: `1px solid ${colors.red[300]}`,
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTabs-indicator': {
                        height: '4px',
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: colors.grey[900],
                    fontWeight: 400,
                    '&:hover': {
                        backgroundColor: colors.grey[200],
                    },
                    '&.Mui-selected': {
                        color: colors.grey[900],
                        fontWeight: 700,
                        '& span': {
                            color: colors.purple[900],
                        },
                    },
                },
            },
        },
    },
});
