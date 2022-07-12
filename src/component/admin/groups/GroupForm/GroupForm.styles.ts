import { makeStyles } from 'tss-react/mui';

// TODO: Delete.

export const useStyles = makeStyles()(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    input: { width: '100%', maxWidth: '400px', marginBottom: '1rem' },
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
        color: theme.palette.text.secondary,
    },
    typeDescription: {
        fontSize: theme.fontSizes.smallBody,
        color: theme.palette.text.secondary,
        top: '-13px',
        position: 'relative',
    },
    formHeader: {
        fontWeight: 'normal',
        marginTop: '0',
    },
    header: {
        fontWeight: 'normal',
    },
    permissionErrorContainer: {
        position: 'relative',
    },
    errorMessage: {
        fontSize: theme.fontSizes.smallBody,
        color: theme.palette.error.main,
        position: 'absolute',
        top: '-8px',
    },
    roleSubtitle: {
        margin: '0.5rem 0',
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5rem',
    },
}));
