import { Tooltip } from '@material-ui/core';
import { useParams } from 'react-router';
import useFeatureApi from '../../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import useToast from '../../../../../hooks/useToast';
import { IFeatureViewParams } from '../../../../../interfaces/params';
import FeatureOverviewEnvSwitch from './FeatureOverviewEnvSwitch/FeatureOverviewEnvSwitch';
import { useStyles } from './FeatureOverviewEnvSwitches.styles';

const FeatureOverviewEnvSwitches = () => {
    const styles = useStyles();
    const { featureId, projectId } = useParams<IFeatureViewParams>();
    const { toggleFeatureEnvironmentOn, toggleFeatureEnvironmentOff } =
        useFeatureApi();
    const { refetch, feature } = useFeature(projectId, featureId);
    const { toast, setToastData } = useToast();

    const handleToggleEnvironmentOn = async () => {
        try {
            await toggleFeatureEnvironmentOn(projectId, featureId, env.name);
            setToastData({
                type: 'success',
                show: true,
                text: 'Successfully turned environment on.',
            });
            refetch();
        } catch (e) {
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
        } catch (e) {
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

    const renderEnvironmentSwitches = () => {
        return feature?.environments.map(env => {
            return (
                <FeatureOverviewEnvSwitch
                    env={env}
                    setToastData={setToastData}
                />
            );
        });
    };

    return (
        <div className={styles.container}>
            <Tooltip
                arrow
                title="Environments can be switched off for a single toggle. Resulting in all calls towards the toggle to return false."
            >
                <h3 className={styles.header}>Toggle environments</h3>
            </Tooltip>
            {renderEnvironmentSwitches()}
            {toast}
        </div>
    );
};

export default FeatureOverviewEnvSwitches;
