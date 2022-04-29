import { createTheme, Theme } from '@material-ui/core/styles';

type MainTheme = typeof mainTheme;

declare module '@material-ui/core/styles/createTheme' {
    interface Theme extends MainTheme {}
}

declare module '@material-ui/core/styles/makeStyles' {
    interface Theme extends MainTheme {}
}

declare module '@material-ui/core/styles/useTheme' {
    interface Theme extends MainTheme {}
}

const mainTheme = {
    typography: {
        fontFamily: ['Sen', 'Roboto, sans-serif'],
        fontWeightBold: '700',
        fontWeightMedium: '700',
        h2: {
            fontSize: '1.5rem',
        },
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
                '80': '#6E6E70',
                '90': '#202021',
            },
            green: {
                '05': '#f4faeb',
                '10': '#e4f0d3',
                '20': '#cfe5ae',
                '30': '#99c35d',
                '40': '#7fb435',
                '50': '#68a611',
                '70': '#4d8400',
                '80': '#3b6600',
                '90': '#305200',
            },
            red: {
                '05': '#fff2f3',
                '10': '#ffe5e7',
                '20': '#ffd4d8',
                '30': '#feb0b7',
                '40': '#f0616d',
                '50': '#e04c59',
                '70': '#d93644',
                '80': '#d11525',
                '90': '#a6000e',
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

export default createTheme(mainTheme as unknown as Theme);
