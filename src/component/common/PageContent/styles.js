import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    headerContainer: {
        padding: theme.padding.pageContent.header,
        borderBottom: theme.borders.default,
        [theme.breakpoints.down("sm")]: {
            padding: "1.5rem 0.5rem"
        }
    },
    bodyContainer: {
        padding: theme.padding.pageContent.body,
        [theme.breakpoints.down("sm")]: {
            padding: "1rem 0.5rem"
        }
    },
    paddingDisabled: {
        padding: "0"
    },
    borderDisabled: {
        border: "none"
    }
}));
