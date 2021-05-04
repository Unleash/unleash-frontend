import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    constraints: {
        marginTop: '1rem',
    },
    constraintContainer: {
        backgroundColor: theme.palette.cards.container.bg,
        margin: '0.5rem 0',
        borderRadius: theme.borders.radius.main,
        padding: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& pre': {
            fontSize: '0.8rem',
        },
        '& span': {
            marginRight: '0.4rem',
        },
    },
    placeholderText: {
        marginTop: '0.25rem',
    },
    link: {
        display: 'block',
        marginTop: '0.2rem',
    },
}));
