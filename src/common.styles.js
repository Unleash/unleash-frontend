import { makeStyles } from "@material-ui/styles";

export const useCommonStyles = makeStyles({
    contentSpacingY: {
        "& > *": {
            margin: "0.6rem 0"
        }
    },
    contentSpacingX: {
        "& > *": {
            margin: "0 0.8rem"
        }
    }
});
