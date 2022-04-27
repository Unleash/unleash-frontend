import { Portal } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useThemeStyles } from 'themes/themeStyles';
import UIContext from 'contexts/UIContext';
import { useStyles } from './ToastRenderer.styles';
import AnimateOnMount from '../AnimateOnMount/AnimateOnMount';
import Toast from './Toast/Toast';
import { IToast } from 'interfaces/toast';

const ToastRenderer = () => {
    const { toastData, setToast } = useContext(UIContext);
    const commonStyles = useThemeStyles();
    const styles = useStyles();

    const hide = () => {
        setToast((prev: IToast) => ({ ...prev, show: false }));
    };

    useEffect(() => {
        if (!toastData.autoHideDuration) return;
        let timeout = setTimeout(() => {
            hide();
        }, toastData.autoHideDuration);

        return () => {
            clearTimeout(timeout);
        };
        /* eslint-disable-next-line */
    }, [toastData?.show]);

    return (
        <Portal>
            <AnimateOnMount
                mounted={Boolean(toastData?.show)}
                start={commonStyles.fadeInBottomStartWithoutFixed}
                enter={commonStyles.fadeInBottomEnter}
                leave={commonStyles.fadeInBottomLeave}
                container={styles.toastWrapper}
            >
                <Toast {...toastData} />
            </AnimateOnMount>
        </Portal>
    );
};

export default ToastRenderer;
