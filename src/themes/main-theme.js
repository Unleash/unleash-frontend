import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#607d8b',
            light: '#8eacbb',
            dark: '#34515e',
        },
        secondary: {
            main: '#0b5644',
            light: '#40836f',
            dark: '#002c1d',
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
                top: '#617D8B',
                bottom: '#31627C',
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
    },
    boxShadows: {
        chip: {
            main: `0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
        },
    },
    fontWeight: {
        thin: '300',
        medium: '400',
        semi: '500',
        bold: '600',
    },
});

export default theme;
