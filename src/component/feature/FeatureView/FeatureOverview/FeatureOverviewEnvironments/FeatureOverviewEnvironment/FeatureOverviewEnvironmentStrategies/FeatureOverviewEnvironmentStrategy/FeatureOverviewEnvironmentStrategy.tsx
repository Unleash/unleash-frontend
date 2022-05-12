import { Edit } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { IFeatureStrategy } from 'interfaces/strategy';
import {
    getFeatureStrategyIcon,
    formatStrategyName,
} from 'utils/strategyNames';
import PermissionHOC from 'component/common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE_STRATEGY } from 'component/providers/AccessProvider/permissions';
import FeatureOverviewExecution from 'component/feature/FeatureView/FeatureOverview/FeatureOverviewExecution/FeatureOverviewExecution';
import { useStyles } from './FeatureOverviewEnvironmentStrategy.styles';
import { formatEditStrategyPath } from 'component/feature/FeatureStrategy/FeatureStrategyEdit/FeatureStrategyEdit';
import { FeatureStrategyRemove } from 'component/feature/FeatureStrategy/FeatureStrategyRemove/FeatureStrategyRemove';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';

interface IFeatureOverviewEnvironmentStrategyProps {
    environmentId: string;
    strategy: IFeatureStrategy;
}

const FeatureOverviewEnvironmentStrategy = ({
    environmentId,
    strategy,
}: IFeatureOverviewEnvironmentStrategyProps) => {
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    const theme = useTheme();
    const { classes: styles } = useStyles();
    const Icon = getFeatureStrategyIcon(strategy.name);
    const { parameters, constraints } = strategy;

    const editStrategyPath = formatEditStrategyPath(
        projectId,
        featureId,
        environmentId,
        strategy.id
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Icon className={styles.icon} />
                <StringTruncator
                    maxWidth="150"
                    maxLength={15}
                    text={formatStrategyName(strategy.name)}
                />
                <div className={styles.actions}>
                    <PermissionHOC
                        permission={UPDATE_FEATURE_STRATEGY}
                        environmentId={environmentId}
                        projectId={projectId}
                        component={Link}
                        to={editStrategyPath}
                        tooltip="Edit strategy"
                    >
                        <Edit />
                    </PermissionHOC>
                    <FeatureStrategyRemove
                        projectId={projectId}
                        featureId={featureId}
                        environmentId={environmentId}
                        strategyId={strategy.id}
                        icon
                    />
                </div>
            </div>
            <div className={styles.body}>
                <FeatureOverviewExecution
                    parameters={parameters}
                    strategy={strategy}
                    constraints={constraints}
                    percentageFill={theme.palette.grey[200]}
                />
            </div>
        </div>
    );
};

export default FeatureOverviewEnvironmentStrategy;
