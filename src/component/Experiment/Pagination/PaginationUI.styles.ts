import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    pagination: {
        margin: '1rem 0 0 0',
        display: 'flex',
        justifyContent: ' center',
    },
    paginationInnerContainer: {
        position: 'relative',
    },
    paginationButton: {
        border: 'none',
        cursor: 'pointer',
        backgroundColor: 'efefef',
        margin: '0 0.2rem',
        width: '31px',
        borderRadius: '3px',
        padding: '0.25rem 0.5rem',
    },
    paginationButtonActive: {
        backgroundColor: '#635DC5',
        color: '#fff',
        transition: 'backgroundColor 0.3s ease',
    },
    idxBtn: {
        border: 'none',
        borderRadius: '3px',
        background: 'transparent',
        position: 'absolute',
        height: '23px',
        cursor: 'pointer',
    },
    doubleArrowBtnLeft: {
        left: '-55px',
    },
    doubleArrowBtnRight: {
        right: '-55px',
    },
    arrowIcon: { height: '15px', width: '15px' },
    arrowIconLeft: {
        transform: 'rotate(180deg)',
    },
    idxBtnIcon: {
        height: '15px',
        width: '15px',
    },
    idxBtnLeft: {
        left: '-30px',
    },
    idxBtnRight: {
        right: '-30px',
    },
}));
