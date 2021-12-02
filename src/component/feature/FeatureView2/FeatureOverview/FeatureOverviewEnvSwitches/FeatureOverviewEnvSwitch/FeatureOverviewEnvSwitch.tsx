import { useParams } from 'react-router';
import useFeatureApi from '../../../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import { TSetToastData } from '../../../../../../hooks/useToast';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import PermissionSwitch from '../../../../../common/PermissionSwitch/PermissionSwitch';
import StringTruncator from '../../../../../common/StringTruncator/StringTruncator';
import { UPDATE_FEATURE } from '../../../../../providers/AccessProvider/permissions';

interface IFeatureOverviewEnvSwitchProps {
    env: IFeatureEnvironment;
    setToastData: TSetToastData;
    callback?: () => void;
    text?: string;
}

const FeatureOverviewEnvSwitch = ({
    env,
    setToastData,
    callback,
    text,
}: IFeatureOverviewEnvSwitchProps) => {
    const { featureId, projectId } = useParams<IFeatureViewParams>();
    const { toggleFeatureEnvironmentOn, toggleFeatureEnvironmentOff } =
        useFeatureApi();
    const { refetch } = useFeature(projectId, featureId);

    const handleToggleEnvironmentOn = async () => {
        try {
            await toggleFeatureEnvironmentOn(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                show: true,
                text: 'Successfully turned environment on.',
            });
            refetch();
            if (callback) {
                callback();
            }
        } catch (e: any) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    const handleToggleEnvironmentOff = async () => {
        try {
            await toggleFeatureEnvironmentOff(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                show: true,
                text: 'Successfully turned environment off.',
            });
            refetch();
            if (callback) {
                callback();
            }
        } catch (e: any) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
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
            <StringTruncator text={env.name} maxWidth="150" color="#817afe" />
            &nbsp;
            <span data-loading>is {env.enabled ? 'enabled' : 'disabled'}</span>
        </>
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <PermissionSwitch
                permission={UPDATE_FEATURE}
                projectId={projectId}
                checked={env.enabled}
                onChange={toggleEnvironment}
                tooltip={''}
            />
            {content}
        </div>
    );
};

export default FeatureOverviewEnvSwitch;
