import { Backdrop, ClickAwayListener, Portal } from '@material-ui/core';
import { useCommonStyles } from 'common.styles';
import { useHistory } from 'react-router-dom';
import AnimateOnMount from '../AnimateOnMount/AnimateOnMount';

interface ISlideOutFormContainerProps {
    open: boolean;
    closeModal: (callback: () => void) => void;
}

export const SlideoutFormContainer: React.FC<ISlideOutFormContainerProps> = ({
    children,
    closeModal,
    open,
}) => {
    const commonStyles = useCommonStyles();
    const { goBack } = useHistory();

    return (
        <Portal>
            <Backdrop open={open} style={{ width: '100%', zIndex: 1000 }}>
                <ClickAwayListener
                    onClickAway={() => closeModal(() => goBack())}
                >
                    <AnimateOnMount
                        start={commonStyles.fadeInRight}
                        enter={commonStyles.fadeInRightEnter}
                        leave={commonStyles.fadeInRightLeave}
                        mounted={open}
                    >
                        {children}
                    </AnimateOnMount>
                </ClickAwayListener>
            </Backdrop>
        </Portal>
    );
};
