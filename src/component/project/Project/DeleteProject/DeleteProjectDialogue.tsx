import { Dialogue } from '../../../common/Dialogue/Dialogue';
import React from 'react';
import { formatUnknownError } from '../../../../utils/formatUnknownError';
import useProjectApi from '../../../../hooks/api/actions/useProjectApi/useProjectApi';
import useProjects from '../../../../hooks/api/getters/useProjects/useProjects';
import useToast from '../../../../hooks/useToast';

interface IDeleteProjectDialogueProps {
    project: string;
    open: boolean;
    onClose?: (e: React.SyntheticEvent, reason?: string) => void;
    onFinish?: () => void;
    onSuccess?: () => void;
}

export const DeleteProjectDialogue = ({
    open,
    onClose,
    project,
    onFinish,
    onSuccess,
}: IDeleteProjectDialogueProps) => {
    const { deleteProject } = useProjectApi();
    const { refetch: refetchProjectOverview } = useProjects();
    const { setToastData, setToastApiError } = useToast();
    return (
        <Dialogue
            open={open}
            onClick={async (e: React.SyntheticEvent) => {
                e.preventDefault();
                try {
                    await deleteProject(project);
                    refetchProjectOverview();
                    setToastData({
                        title: 'Deleted project',
                        type: 'success',
                        text: 'Successfully deleted project',
                    });
                    if (onSuccess) {
                        onSuccess();
                    }
                } catch (ex: unknown) {
                    setToastApiError(formatUnknownError(ex));
                }
                if (onFinish) {
                    onFinish();
                }
            }}
            onClose={onClose}
            title="Really delete project"
        />
    );
};
