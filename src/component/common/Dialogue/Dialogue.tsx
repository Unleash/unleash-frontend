import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from '@material-ui/core';

import ConditionallyRender from '../ConditionallyRender/ConditionallyRender';
import { useStyles } from './Dialogue.styles';
import { DIALOGUE_CONFIRM_ID } from '../../../testIds';

interface IDialogue {
    primaryButtonText?: string;
    secondaryButtonText?: string;
    open: boolean;
    onClick: (e: any) => void;
    onClose: () => void;
    style?: object;
    title: string;
    fullWidth?: boolean;
    maxWidth?: 'lg' | 'sm' | 'xs' | 'md' | 'xl';
    disabledPrimaryButton?: boolean;
    formId?: string;
}

const Dialogue: React.FC<IDialogue> = ({
    children,
    open,
    onClick,
    onClose,
    title,
    primaryButtonText,
    disabledPrimaryButton = false,
    secondaryButtonText,
    maxWidth = 'sm',
    fullWidth = false,
    formId,
}) => {
    const styles = useStyles();
    const handleClick = formId
        ? (e: any) => {
              e.preventDefault();
              onClick(e);
          }
        : onClick;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            aria-labelledby={'simple-modal-title'}
            aria-describedby={'simple-modal-description'}
            maxWidth={maxWidth}
        >
            <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
            <ConditionallyRender
                condition={Boolean(children)}
                show={
                    <DialogContent className={styles.dialogContentPadding}>
                        {children}
                    </DialogContent>
                }
            />

            <DialogActions>
                <ConditionallyRender
                    condition={Boolean(onClick)}
                    show={
                        <Button
                            form={formId}
                            color="primary"
                            variant="contained"
                            onClick={handleClick}
                            autoFocus={!formId}
                            disabled={disabledPrimaryButton}
                            data-test={DIALOGUE_CONFIRM_ID}
                            type={formId ? 'submit' : 'button'}
                        >
                            {primaryButtonText || "Yes, I'm sure"}
                        </Button>
                    }
                />

                <ConditionallyRender
                    condition={Boolean(onClose)}
                    show={
                        <Button onClick={onClose}>
                            {secondaryButtonText || 'No, take me back'}
                        </Button>
                    }
                />
            </DialogActions>
        </Dialog>
    );
};

export default Dialogue;
