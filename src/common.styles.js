import { makeStyles } from "@material-ui/styles";

export const useCommonStyles = makeStyles({
    contentSpacingY: {
        "& > *": {
            margin: "0.8rem 0"
        }
    },
    contentSpacingX: {
        "& > *": {
            margin: "0 0.8rem"
        }
    }
});
