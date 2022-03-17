import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {},
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
        color: theme.palette.primary.light,
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
    backButton: {
        marginRight: 'auto',
        color: theme.palette.primary.light,
    },
    addContextContainer: {
        marginTop: '1rem'
    },
    addContextButton: {
        color: theme.palette.primary.dark,
        background: 'transparent',
        boxShadow: 'none',
        border: '1px solid',
        '&:hover': {
            background: 'transparent',
            boxShadow: 'none',
        },
    },
    divider: { borderStyle: 'solid', marginTop: '1rem !important' },
}));
