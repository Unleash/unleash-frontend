import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    listItem: {
        padding: "0.25rem 0"
    },
    listItemMetric: {
        width: "40px",
        marginRight: "1rem",
        flexShrink: "0"
    },
    listItemSvg: {
        fill: theme.palette.icons.lightGrey
    },
    listItemLink: {
        marginLeft: "10px",
        minWidth: "0"
    },
    listItemStrategies: {
        marginLeft: "auto"
    }
}));
