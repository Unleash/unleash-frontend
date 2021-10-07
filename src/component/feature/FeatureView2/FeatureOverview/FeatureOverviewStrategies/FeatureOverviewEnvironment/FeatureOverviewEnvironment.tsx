import { Cloud } from '@material-ui/icons';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';
import { Switch, Tooltip } from '@material-ui/core';
import { useStyles } from './FeatureOverviewEnvironment.styles';
import FeatureOverviewStrategyCard from './FeatureOverviewStrategyCard/FeatureOverviewStrategyCard';
import classNames from 'classnames';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import useFeatureApi from '../../../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import { useHistory, useParams, Link } from 'react-router-dom';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import useToast from '../../../../../../hooks/useToast';
import FeatureViewEnvironment from '../../../FeatureViewEnvironment/FeatureViewEnvironment';

interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
    refetch: () => void;
}

const FeatureOverviewEnvironment = ({
    env,
    refetch,
}: IFeatureOverviewEnvironmentProps) => {
    const { featureId, projectId } = useParams<IFeatureViewParams>();

    const styles = useStyles();
    const history = useHistory();

    const handleClick = () => {
        history.push(
            `/projects/${projectId}/features2/${featureId}/strategies?environment=${env.name}`
        );
    };

    const renderStrategies = () => {
        const { strategies } = env;

        return strategies.map(strategy => {
            return (
                <FeatureOverviewStrategyCard
                    strategy={strategy}
                    key={strategy.id}
                    onClick={handleClick}
                />
            );
        });
    };

    return (
        <FeatureViewEnvironment env={env}>
            <div className={styles.strategiesContainer}>
                {renderStrategies()}
            </div>
        </FeatureViewEnvironment>
    );
};

export default FeatureOverviewEnvironment;
