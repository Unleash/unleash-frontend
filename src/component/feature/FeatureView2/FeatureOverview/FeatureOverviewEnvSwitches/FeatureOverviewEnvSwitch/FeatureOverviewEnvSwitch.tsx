import { useParams } from 'react-router';
import { ENVIRONMENT_STRATEGY_ERROR } from '../../../../../../constants/apiErrors';
import useFeatureApi from '../../../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import useToast from '../../../../../../hooks/useToast';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import PermissionSwitch from '../../../../../common/PermissionSwitch/PermissionSwitch';
import StringTruncator from '../../../../../common/StringTruncator/StringTruncator';
import { UPDATE_FEATURE_ENVIRONMENT } from '../../../../../providers/AccessProvider/permissions';

interface IFeatureOverviewEnvSwitchProps {
    env: IFeatureEnvironment;
    callback?: () => void;
    text?: string;
    showInfoBox?: () => void;
}

const FeatureOverviewEnvSwitch = ({
    env,
    callback,
    text,
    showInfoBox,
}: IFeatureOverviewEnvSwitchProps) => {
    const { featureId, projectId } = useParams<IFeatureViewParams>();
    const { toggleFeatureEnvironmentOn, toggleFeatureEnvironmentOff } =
        useFeatureApi();
    const { refetch } = useFeature(projectId, featureId);
    const { setToastData, setToastApiError } = useToast();

    const handleToggleEnvironmentOn = async () => {
        try {
            await toggleFeatureEnvironmentOn(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                title: 'Environment turned on',
                text: 'Successfully turned environment on. Strategies are executing in this environment.',
            });
            refetch();
            if (callback) {
                callback();
            }
        } catch (e: any) {
            if (e.message === ENVIRONMENT_STRATEGY_ERROR) {
                showInfoBox(true);
            } else {
                setToastApiError(e.message);
            }
        }
    };

    const handleToggleEnvironmentOff = async () => {
        try {
            await toggleFeatureEnvironmentOff(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                title: 'Environment turned off',
                text: 'Successfully turned environment off. Strategies are no longer executing in this environment.',
            });
            refetch();
            if (callback) {
                callback();
            }
        } catch (e: any) {
            setToastApiError(e.message);
        }
    };

    const toggleEnvironment = async (e: React.ChangeEvent) => {
        if (env.enabled) {
            await handleToggleEnvironmentOff();
            return;
        }
        await handleToggleEnvironmentOn();
    };

    let content = text ? (
        text
    ) : (
        <>
            {' '}
            <span data-loading>{env.enabled ? 'enabled' : 'disabled'} in</span>
            &nbsp;
            <StringTruncator text={env.name} maxWidth="120" />
        </>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <PermissionSwitch
                permission={UPDATE_FEATURE_ENVIRONMENT}
                projectId={projectId}
                checked={env.enabled}
                onChange={toggleEnvironment}
                environmentId={env.name}
                tooltip={''}
            />
            {content}
        </div>
    );
};

export default FeatureOverviewEnvSwitch;