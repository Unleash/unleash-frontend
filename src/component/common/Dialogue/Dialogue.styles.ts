import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    dialogTitle: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        height: '150px',
        padding: '2rem 3rem',
        clipPath: ' ellipse(130% 115px at 120% 20%)',
    },
    dialogContentPadding: {
        padding: '2rem 3rem',
    },
}));
