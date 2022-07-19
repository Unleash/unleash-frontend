import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import React from 'react';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import useFeatureMetrics from 'hooks/api/getters/useFeatureMetrics/useFeatureMetrics';
import { IFeatureEnvironment } from 'interfaces/featureToggle';
import { getFeatureMetrics } from 'utils/getFeatureMetrics';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import EnvironmentIcon from 'component/common/EnvironmentIcon/EnvironmentIcon';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { useStyles } from './FeatureOverviewEnvironment.styles';
import EnvironmentAccordionBody from './FeatureOverviewEnvironmentBody/EnvironmentAccordionBody';
import FeatureOverviewEnvironmentFooter from './FeatureOverviewEnvironmentFooter/FeatureOverviewEnvironmentFooter';
import FeatureOverviewEnvironmentMetrics from './FeatureOverviewEnvironmentMetrics/FeatureOverviewEnvironmentMetrics';
import { FeatureStrategyMenu } from 'component/feature/FeatureStrategy/FeatureStrategyMenu/FeatureStrategyMenu';
import { FEATURE_ENVIRONMENT_ACCORDION } from 'utils/testIds';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { StatusBadge } from 'component/common/StatusBadge/StatusBadge';
import { FeatureStrategyIcons } from 'component/feature/FeatureStrategy/FeatureStrategyIcons/FeatureStrategyIcons';

interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
}

const FeatureOverviewEnvironment = ({
    env,
}: IFeatureOverviewEnvironmentProps) => {
    const { classes: styles } = useStyles();
    const projectId = useRequiredPathParam('projectId');
    const featureId = useRequiredPathParam('featureId');
    const { metrics } = useFeatureMetrics(projectId, featureId);
    const { feature } = useFeature(projectId, featureId);

    const featureMetrics = getFeatureMetrics(feature?.environments, metrics);
    const environmentMetric = featureMetrics.find(
        featureMetric => featureMetric.environment === env.name
    );
    const featureEnvironment = feature?.environments.find(
        featureEnvironment => featureEnvironment.name === env.name
    );

    return (
        <div className={styles.featureOverviewEnvironment}>
            <Accordion
                className={styles.accordion}
                data-testid={`${FEATURE_ENVIRONMENT_ACCORDION}_${env.name}`}
            >
                <AccordionSummary
                    className={styles.accordionHeader}
                    expandIcon={<ExpandMore titleAccess="Toggle" />}
                >
                    <div className={styles.header} data-loading>
                        <div className={styles.headerTitle}>
                            <EnvironmentIcon
                                enabled={env.enabled}
                                className={styles.headerIcon}
                            />
                            <p>
                                Feature toggle execution for&nbsp;
                                <StringTruncator
                                    text={env.name}
                                    className={styles.truncator}
                                    maxWidth="100"
                                    maxLength={15}
                                />
                            </p>
                        </div>
                        <div className={styles.container}>
                            <FeatureStrategyMenu
                                label="Add strategy"
                                projectId={projectId}
                                featureId={featureId}
                                environmentId={env.name}
                                variant="text"
                            />
                            <FeatureStrategyIcons
                                strategies={featureEnvironment?.strategies}
                            />
                        </div>
                        <ConditionallyRender
                            condition={!env.enabled}
                            show={
                                <StatusBadge
                                    severity="warning"
                                    className={styles.disabledIndicatorPos}
                                >
                                    Disabled
                                </StatusBadge>
                            }
                        />
                    </div>

                    <FeatureOverviewEnvironmentMetrics
                        environmentMetric={environmentMetric}
                    />
                </AccordionSummary>

                <AccordionDetails className={styles.accordionDetails}>
                    <EnvironmentAccordionBody
                        featureEnvironment={featureEnvironment}
                        isDisabled={!env.enabled}
                    />
                    <ConditionallyRender
                        condition={
                            (featureEnvironment?.strategies?.length || 0) > 0
                        }
                        show={
                            <FeatureOverviewEnvironmentFooter
                                // env={env}
                                environmentMetric={environmentMetric}
                            />
                        }
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureOverviewEnvironment;
