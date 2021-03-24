import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    contentSpacingY: {
        "& * >": {
            margin: "0.8rem 0"
        }
    },
    contentSpacingX: {
        "& * >": {
            margin: "0 0.8rem"
        }
    }
});
