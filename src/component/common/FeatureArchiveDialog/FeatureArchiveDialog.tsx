import { VFC } from 'react';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import useProject from 'hooks/api/getters/useProject/useProject';
import useFeatureApi from 'hooks/api/actions/useFeatureApi/useFeatureApi';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';

interface IFeatureArchiveDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onAbort: () => void;
    projectId: string;
    featureId: string;
}

export const FeatureArchiveDialog: VFC<IFeatureArchiveDialogProps> = ({
    isOpen,
    onAbort,
    onConfirm,
    projectId,
    featureId,
}) => {
    const { archiveFeatureToggle } = useFeatureApi();
    const { setToastData, setToastApiError } = useToast();

    const archiveToggle = async () => {
        try {
            await archiveFeatureToggle(projectId, featureId);
            setToastData({
                text: 'Your feature toggle has been archived',
                type: 'success',
                title: 'Feature archived',
            });
            onConfirm();
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
            onAbort();
        }
    };

    return (
        <Dialogue
            onClick={() => archiveToggle()}
            open={isOpen}
            onClose={onAbort}
            primaryButtonText="Archive toggle"
            secondaryButtonText="Cancel"
            title="Archive feature toggle"
        >
            Are you sure you want to archive this feature toggle?
        </Dialogue>
    );
};
