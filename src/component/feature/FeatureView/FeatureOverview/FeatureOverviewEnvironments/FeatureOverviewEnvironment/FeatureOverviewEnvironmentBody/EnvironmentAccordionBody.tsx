import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import FeatureOverviewEnvironmentStrategies from '../FeatureOverviewEnvironmentStrategies/FeatureOverviewEnvironmentStrategies';
import { IFeatureEnvironment } from 'interfaces/featureToggle';
import { FeatureStrategyEmpty } from 'component/feature/FeatureStrategy/FeatureStrategyEmpty/FeatureStrategyEmpty';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { useStyles } from './FeatureOverviewEnvironment.styles';
import { Alert } from '@mui/material';

interface IEnvironmentAccordionBodyProps {
    isDisabled: boolean;
    featureEnvironment?: IFeatureEnvironment;
}

const EnvironmentAccordionBody = ({
    featureEnvironment,
    isDisabled,
}: IEnvironmentAccordionBodyProps) => {
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    const { classes: styles } = useStyles();

    if (!featureEnvironment) {
        return null;
    }

    return (
        <div className={styles.accordionBody}>
            <div className={styles.accordionBodyInnerContainer}>
                <ConditionallyRender
                    condition={
                        featureEnvironment?.strategies.length > 0 && isDisabled
                    }
                    show={() => (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            This environment is disabled, which means that none
                            of your strategies are executing.
                        </Alert>
                    )}
                />
                <ConditionallyRender
                    condition={featureEnvironment?.strategies.length > 0}
                    show={
                        <>
                            <FeatureOverviewEnvironmentStrategies
                                strategies={featureEnvironment?.strategies}
                                environmentName={featureEnvironment.name}
                            />
                        </>
                    }
                    elseShow={
                        <FeatureStrategyEmpty
                            projectId={projectId}
                            featureId={featureId}
                            environmentId={featureEnvironment.name}
                        />
                    }
                />
            </div>
        </div>
    );
};
export default EnvironmentAccordionBody;
