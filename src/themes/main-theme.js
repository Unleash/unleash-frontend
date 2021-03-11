import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#009688",
            light: "#B2DFDB",
            dark: "#00796B"
        },
        secondary: {
            main: "#217584"
        },
        neutral: {
            main: "#18243e"
        }
    }
});

export default theme;
