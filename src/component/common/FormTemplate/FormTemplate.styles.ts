import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '80vh',
        width: '100%',
        display: 'flex',
        maxWidth: '90%',
        margin: '0 auto',
    },
    sidebar: {
        backgroundColor: theme.palette.primary.light,
        padding: '2rem',
        width: '35%',
        borderTopLeftRadius: '12.5px',
        borderBottomLeftRadius: '12.5px',
    },
    title: {
        color: '#fff',
        marginBottom: '1rem',
    },
    subtitle: {
        color: '#fff',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    description: {
        color: '#fff',
    },
    linkContainer: {
        margin: '1.5rem 0',
        display: 'flex',
        alignItems: 'center',
    },
    linkIcon: {
        marginRight: '0.5rem',
        color: '#fff',
    },
    documentationLink: {
        color: '#fff',
        display: 'block',
    },
    formContent: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        width: '65%',
        borderTopRightRadius: '12.5px',
        borderBottomRightRadius: '12.5px',
    },
    icon: { fill: '#fff' },
}));
