import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    constraintIconContainer: {
        backgroundColor: theme.palette.primary.main,
        height: '28px',
        width: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '2rem',
    },
    constraintIcon: {
        fill: '#fff',
        width: '26px',
        height: '26px',
    },
    accordion: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '5px',
        margin: '1rem 0',
        backgroundColor: '#fff',
        ['&:before']: {
            height: 0,
        },
    },
    operator: {
        border: `1px solid ${theme.palette.secondary.main}`,
        padding: '0.25rem 1rem',
        color: theme.palette.secondary.main,
        textTransform: 'uppercase',
        borderRadius: '5px',
        margin: '0rem 2rem',
        fontSize: theme.fontSizes.smallBody,
    },
    headerMetaInfo: { display: 'flex', alignItems: 'center' },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    editingBadge: {
        borderRadius: '25px',
        padding: '0.25rem 0.5rem',
        backgroundColor: '#635DC5',
        color: '#fff',
        marginLeft: 'auto',
        fontSize: '0.9rem',
    },
    help: {
        fill: theme.palette.grey[600],
    },
    headerText: { maxWidth: '400px' },
    headerSelect: { marginRight: '2rem', width: '200px' },
    chip: {
        margin: '0 0.5rem 0.5rem 0',
    },
    headerActions: { marginLeft: 'auto' },
    accordionDetails: {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        display: 'flex',
        flexDirection: 'column',
    },
    valuesContainer: {
        padding: '1rem 0rem',
        maxHeight: '400px',
        overflowY: 'scroll',
    },
    summary: { border: 'none', padding: '0.25rem 1rem' },
    settingsParagraph: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0',
    },
    settingsIcon: {
        height: '32.5px',
        width: '32.5px',
        marginRight: '0.5rem',
        fill: theme.palette.grey[600],
    },
    singleValueText: {
        marginRight: '0.75rem',
    },
}));
