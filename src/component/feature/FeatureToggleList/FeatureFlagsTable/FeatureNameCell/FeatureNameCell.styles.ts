import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    description: {
        color: theme.v2.palette.grey['80'],
        fontSize: 'inherit',
        display: 'inline-block',
        maxWidth: '250px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
}));
