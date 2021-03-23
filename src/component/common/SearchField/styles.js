import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "3px",
        padding: "0.25rem 0.5rem",
        maxWidth: "450px"
    },
    searchIcon: {
        marginRight: "8px"
    },
    inputRoot: {
        width: "100%"
    }
}));
