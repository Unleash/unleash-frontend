import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()({
    actions: {
        '& > *': {
            margin: '0 0.25rem',
        },
        marginRight: '0.25rem',
        display: 'flex',
        alignItems: 'center',
    },
});
