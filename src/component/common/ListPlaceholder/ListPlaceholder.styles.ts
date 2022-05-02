import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
    emptyStateListItem: {
        // @ts-expect-error
        border: `2px dashed ${theme.palette.borders.main}`,
        padding: '0.8rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));
