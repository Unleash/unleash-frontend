import { useStyles } from './FeatureStrategyEmpty.styles';
import { FeatureStrategyMenu } from '../FeatureStrategyMenu/FeatureStrategyMenu';
import { Link } from 'react-router-dom';

interface IFeatureStrategyEmptyProps {
    projectId: string;
    featureId: string;
    environmentId: string;
}

export const FeatureStrategyEmpty = ({
    projectId,
    featureId,
    environmentId,
}: IFeatureStrategyEmptyProps) => {
    const { classes: styles } = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                You have not defined any strategies yet.
            </div>
            <p className={styles.description}>
                Strategies added in this environment will only be executed if
                the SDK is using an{' '}
                <Link to="/admin/api">API key configured</Link> for this
                environment.
            </p>
            <FeatureStrategyMenu
                label="Add your first strategy"
                projectId={projectId}
                featureId={featureId}
                environmentId={environmentId}
            />
        </div>
    );
};
