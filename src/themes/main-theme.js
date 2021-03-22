import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#607d8b",
            light: "#B2DFDB",
            dark: "#00796B"
        },
        secondary: {
            main: "#217584"
        },
        neutral: {
            main: "#18243e"
        },
        icons: {
            lightGrey: "#e0e0e0"
        }
    },
    padding: {
        pageContent: {
            header: "1.8rem 2rem",
            body: "2rem"
        }
    },
    borders: {
        default: "1px solid #f1f1f1"
    },
    fontSizes: {
        mainHeader: "1.1rem"
    }
});

export default theme;
