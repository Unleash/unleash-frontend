import { ReactNode } from 'react';
import { Modal, Backdrop, Slide } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { useStyles } from 'component/common/SidebarModal/SidebarModal.styles';

interface ISidebarModalProps {
    open: boolean;
    onClose: () => void;
    label: string;
    children: ReactNode;
}

const TRANSITION_DURATION = 250;

export const SidebarModal = ({
    open,
    onClose,
    label,
    children,
}: ISidebarModalProps) => {
    const styles = useStyles();

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            aria-label={label}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: TRANSITION_DURATION }}
        >
            <Fade timeout={TRANSITION_DURATION} in={open}>
                <div>
                    <Slide
                        timeout={TRANSITION_DURATION}
                        direction="left"
                        in={open}
                    >
                        <div className={styles.modal}>{children}</div>
                    </Slide>
                </div>
            </Fade>
        </Modal>
    );
};
