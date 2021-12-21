import { useContext, useEffect } from 'react';
import { useCommonStyles } from '../../../common.styles';
import UIContext from '../../../contexts/UIContext';
import AnimateOnMount from '../AnimateOnMount/AnimateOnMount';
import ConfirmScreen from './ConfirmScreen/ConfirmScreen';

const UpdatedResource = () => {
    const { updatedResource, setUpdatedResource } = useContext(UIContext);
    const commonStyles = useCommonStyles();

    useEffect(() => {
        let timeout = setTimeout(() => {
            setUpdatedResource(prev => ({ ...prev, show: false }));
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [updatedResource.show]);

    return (
        <AnimateOnMount
            start={commonStyles.fadeInBottomStartNoPosition}
            enter={commonStyles.fadeInBottomEnter}
            leave={commonStyles.fadeInBottomLeave}
            mounted={Boolean(updatedResource?.show)}
        >
            <ConfirmScreen
                title={updatedResource?.title}
                text={updatedResource?.text}
            />
        </AnimateOnMount>
    );
};

export default UpdatedResource;
