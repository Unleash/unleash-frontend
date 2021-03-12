import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const ConfirmDialogue = ({ children, open, onClick, onClose, title }) => (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby={'simple-modal-title'}
        aria-describedby={'simple-modal-description'}
    >
        <DialogTitle>{title}</DialogTitle>
        {children}
        <DialogActions>
            <Button color="primary" onClick={onClick} autoFocus>
                Yes, I'm sure
            </Button>
            <Button onClick={onClose}>No, take me back.</Button>
        </DialogActions>
    </Dialog>
);

ConfirmDialogue.propTypes = {
    children: PropTypes.object,
    open: PropTypes.bool,
    onClick: PropTypes.function,
    onClose: PropTypes.function,
    ariaLabel: PropTypes.string,
    ariaDescription: PropTypes.string,
    title: PropTypes.string,
};

export default ConfirmDialogue;
