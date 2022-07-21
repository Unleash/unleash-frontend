import { Alert } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { StrategyDraggableItem } from './StrategyDraggableItem/StrategyDraggableItem';
import { IFeatureEnvironment } from 'interfaces/featureToggle';
import { FeatureStrategyEmpty } from 'component/feature/FeatureStrategy/FeatureStrategyEmpty/FeatureStrategyEmpty';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { useStyles } from './EnvironmentAccordionBody.styles';
import { useState } from 'react';

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
    const [strategies, setStrategies] = useState(
        featureEnvironment?.strategies || []
    );
    const { classes: styles } = useStyles();

    if (!featureEnvironment) {
        return null;
    }

    const onDragAndDrop = (from: number, to: number, dropped?: boolean) => {
        if (from !== to && dropped) {
            const newStrategies = [...strategies];
            const movedStrategy = newStrategies.splice(from, 1)[0];
            newStrategies.splice(to, 0, movedStrategy);
            setStrategies(newStrategies);
        }
    };

    return (
        <div className={styles.accordionBody}>
            <div className={styles.accordionBodyInnerContainer}>
                <ConditionallyRender
                    condition={strategies.length > 0 && isDisabled}
                    show={() => (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            This environment is disabled, which means that none
                            of your strategies are executing.
                        </Alert>
                    )}
                />
                <ConditionallyRender
                    condition={strategies.length > 0}
                    show={
                        <>
                            {strategies.map((strategy, index) => (
                                <StrategyDraggableItem
                                    onDragAndDrop={onDragAndDrop}
                                    strategy={strategy}
                                    index={index}
                                    environmentName={featureEnvironment.name}
                                />
                            ))}
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
