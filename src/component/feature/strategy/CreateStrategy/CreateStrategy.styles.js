import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    createStrategyCardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > *': {
            marginRight: '0.5rem',
            marginTop: '0.5rem',
        },
    },
});
