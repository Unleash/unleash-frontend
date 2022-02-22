import React, { useState } from 'react';
import useFeatureStrategyApi from 'hooks/api/actions/useFeatureStrategyApi/useFeatureStrategyApi';
import { formatUnknownError } from 'utils/format-unknown-error';
import { useHistory } from 'react-router-dom';
import useToast from 'hooks/useToast';
import { formatFeaturePath } from '../FeatureStrategyEdit/FeatureStrategyEdit';
import Dialogue from '../../../common/Dialogue';
import { Alert } from '@material-ui/lab';
import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { DELETE_FEATURE_STRATEGY } from '../../../providers/AccessProvider/permissions';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import { STRATEGY_FORM_REMOVE_ID } from 'testIds';

interface IFeatureStrategyRemoveProps {
    projectId: string;
    featureId: string;
    environmentId: string;
    strategyId: string;
    disabled: boolean;
}

export const FeatureStrategyRemove = ({
    projectId,
    featureId,
    environmentId,
    strategyId,
    disabled,
}: IFeatureStrategyRemoveProps) => {
    const [openDialogue, setOpenDialogue] = useState(false);
    const { deleteStrategyFromFeature } = useFeatureStrategyApi();
    const { refetchFeature } = useFeature(projectId, featureId);
    const { setToastData, setToastApiError } = useToast();
    const { push } = useHistory();

    const onRemove = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            await deleteStrategyFromFeature(
                projectId,
                featureId,
                environmentId,
                strategyId
            );
            setToastData({
                title: 'Strategy deleted',
                type: 'success',
            });
            refetchFeature();
            push(formatFeaturePath(projectId, featureId));
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };

    return (
        <>
            <PermissionButton
                type="button"
                color="secondary"
                variant="text"
                onClick={() => setOpenDialogue(true)}
                permission={DELETE_FEATURE_STRATEGY}
                projectId={projectId}
                environmentId={environmentId}
                data-test={STRATEGY_FORM_REMOVE_ID}
                disabled={disabled}
            >
                Delete strategy
            </PermissionButton>
            <Dialogue
                title="Are you sure you want to delete this strategy?"
                open={openDialogue}
                primaryButtonText="Delete strategy"
                secondaryButtonText="Cancel"
                onClick={onRemove}
                onClose={() => setOpenDialogue(false)}
            >
                <Alert severity="error">
                    Deleting the strategy will change which users receive access
                    to the feature.
                </Alert>
            </Dialogue>
        </>
    );
};
