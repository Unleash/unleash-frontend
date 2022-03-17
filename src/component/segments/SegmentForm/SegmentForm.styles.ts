import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: '400px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    input: { width: '100%', marginBottom: '1rem' },
    label: {
        minWidth: '300px',
        [theme.breakpoints.down(600)]: {
            minWidth: 'auto',
        },
    },
    buttonContainer: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        marginLeft: '1.5rem',
    },
    inputDescription: {
        marginBottom: '0.5rem',
    },
    formHeader: {
        fontWeight: 'normal',
        marginTop: '0',
    },
    header: {
        fontWeight: 'normal',
    },
    errorMessage: {
        fontSize: theme.fontSizes.smallBody,
        color: theme.palette.error.main,
        position: 'absolute',
        top: '-8px',
    },
    userInfoContainer: {
        margin: '-20px 0',
    },
    errorAlert: {
        marginBottom: '1rem',
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
    },
    stepsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: '-78px',
        width: 153,
        left: 243,
        borderRadius: 10,
        marginTop: 10,
    },
    stepsText: { marginRight: 15 },
    emptyCircle: {
        fill: theme.palette.primary.light,
        fontSize: 17,
    },
    filledCircle: { fill: theme.palette.primary.main },
}));
