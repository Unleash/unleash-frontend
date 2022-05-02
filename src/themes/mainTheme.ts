import { createTheme, Theme, adaptV4Theme } from '@mui/material/styles';

type MainTheme = typeof mainTheme;

declare module '@mui/material/styles/createTheme' {
    interface Theme extends MainTheme {}
}

declare module '@mui/material/styles/makeStyles' {
    interface Theme extends MainTheme {}
}

declare module '@mui/material/styles/useTheme' {
    interface Theme extends MainTheme {}
}

const mainTheme = {
    typography: {
        fontFamily: ['Sen', 'Roboto, sans-serif'],
        fontWeightBold: '700',
        fontWeightMedium: '700',
    },
    palette: {
        primary: {
            main: '#635DC5',
            light: '#817AFE',
            dark: '#635DC5',
        },
        secondary: {
            main: '#635DC5',
            light: '#817AFE',
            dark: '#635DC5',
        },
        grey: {
            main: '#6C6C6C',
            light: '#F6F6FA',
        },
        neutral: {
            main: '#18243e',
        },
        icons: {
            lightGrey: '#e0e0e0',
        },
        chips: {
            main: '#b0bec5',
        },
        searchField: {
            main: '#fff',
        },
        iconButtons: {
            main: '#fff',
        },
        tabs: {
            main: '#efefef',
        },
        links: {
            deprecated: '#1d1818',
        },
        borders: {
            main: '#f1f1f1',
        },
        error: {
            main: '#d95e5e',
        },
        success: {
            main: '#3bd86e',
        },
        division: {
            main: '#f1f1f1',
        },
        footer: {
            main: '#000',
            background: '#fff',
        },
        code: {
            main: '#0b8c8f',
            diffAdd: 'green',
            diffSub: 'red',
            diffNeutral: 'black',
            edited: 'blue',
            background: '#efefef',
        },
        cards: {
            gradient: {
                top: '#265f6d',
                bottom: '#1A4049',
            },
            container: {
                bg: '#f1f1f1',
            },
        },
        login: {
            gradient: {
                top: '#607D8B',
                bottom: '#173341',
            },
            main: '#fff',
        },
        dialogue: {
            title: {
                main: '#fff',
            },
        },
    },
    padding: {
        pageContent: {
            header: '1.8rem 2rem',
            body: '2rem',
        },
    },
    borders: {
        default: '1px solid #f1f1f1',
        radius: { main: '3px' },
    },
    fontSizes: {
        mainHeader: '1.2rem',
        subHeader: '1.1rem',
        bodySize: '1rem',
        smallBody: '0.9rem',
        smallerBody: '0.8rem',
    },
    boxShadows: {
        chip: {
            main: `0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
        },
    },
    fontWeight: {
        thin: 300,
        medium: 400,
        semi: 700,
        bold: 700,
    },
    v2: {
        palette: {
            primary: '',
            grey: {
                '10': '#F7F7FA',
                '20': '#F2F2F5',
                '30': '#EAEAED',
                '40': '#E1E1E3',
                '50': '#BDBDBF',
                '70': '#78787A',
                '90': '#202021',
            },
        },
        fontSizes: {
            headerIcon: '18px',
        },
        boxShadows: {
            primary: '0px 2px 4px rgba(129, 122, 254, 0.2)',
        },
    },
};

export default createTheme(adaptV4Theme(mainTheme as unknown as Theme));
