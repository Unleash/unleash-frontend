import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    title: {
        paddingBottom: '8px',
    },
    helpText: {
        paddingBottom: '16px',
        marginBottom: '1rem',
    },
    selectAll: {
        paddingBottom: '16px',
    },
    autocomplete: {
        paddingBottom: '36px',
    },
    nameInput: {
        marginRight: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '1rem',
    },
    inputDescription: {
        marginBottom: '0.5rem',
    },
    input: { width: '100%', marginBottom: '1rem' },
    formSection: { marginBottom: '1rem' },
    buttonsSection: {
        padding: '10px 36px',
        '& > *': {
            marginRight: theme.spacing(1),
        },
    },
    container: {
        maxWidth: '600px',
    },
    buttonContainer: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));
