import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    historyItem: {
        padding: '5px',
        '&:nth-child': {
            backgroundColor: '#efefef',
        },
    },
});
