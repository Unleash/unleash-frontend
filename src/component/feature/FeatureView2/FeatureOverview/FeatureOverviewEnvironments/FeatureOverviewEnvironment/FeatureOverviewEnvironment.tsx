import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Badge,
} from '@material-ui/core';
import { ExpandMore, Add } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import useFeatureMetrics from '../../../../../../hooks/api/getters/useFeatureMetrics/useFeatureMetrics';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import { getFeatureMetrics } from '../../../../../../utils/get-feature-metrics';
import { getFeatureStrategyIcon } from '../../../../../../utils/strategy-names';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import DisabledIndicator from '../../../../../common/DisabledIndicator/DisabledIndicator';
import EnvironmentIcon from '../../../../../common/EnvironmentIcon/EnvironmentIcon';
import PermissionIconButton from '../../../../../common/PermissionIconButton/PermissionIconButton';
import StringTruncator from '../../../../../common/StringTruncator/StringTruncator';
import { UPDATE_FEATURE } from '../../../../../providers/AccessProvider/permissions';

import { useStyles } from './FeatureOverviewEnvironment.styles';
import FeatureOverviewEnvironmentBody from './FeatureOverviewEnvironmentBody/FeatureOverviewEnvironmentBody';
import FeatureOverviewEnvironmentFooter from './FeatureOverviewEnvironmentFooter/FeatureOverviewEnvironmentFooter';
import FeatureOverviewEnvironmentMetrics from './FeatureOverviewEnvironmentMetrics/FeatureOverviewEnvironmentMetrics';

interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
}

const FeatureOverviewEnvironment = ({
    env,
}: IFeatureOverviewEnvironmentProps) => {
    const styles = useStyles();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { metrics } = useFeatureMetrics(projectId, featureId);
    const { feature } = useFeature(projectId, featureId);
    const history = useHistory();

    const featureMetrics = getFeatureMetrics(feature?.environments, metrics);
    const environmentMetric = featureMetrics.find(
        featureMetric => featureMetric.environment === env.name
    );
    const featureEnvironment = feature?.environments.find(
        featureEnvironment => featureEnvironment.name === env.name
    );

    const getOverviewText = () => {
        if (env.enabled) {
            return `${environmentMetric?.yes} received this feature
                                because the following strategies are executing`;
        }
        return `This environment is disabled, which means that none of your strategies are executing`;
    };

    const strategiesLink = `/projects/${projectId}/features2/${featureId}/strategies?environment=${featureEnvironment?.name}&addStrategy=true`;

    const renderStratigiesIcons = () => {
        let result = [];
        const counts = {};
        // we get number of occurence of each strategy
        featureEnvironment?.strategies.forEach(strategy => {
            counts[strategy.name] = (counts[strategy.name] || 0) + 1;
        });
        // we filter the strategies by name
        const filterdStrategies = [
            ...new Map(
                featureEnvironment?.strategies.map(strategy => [
                    strategy.name,
                    strategy,
                ])
            ).values(),
        ];

        filterdStrategies.map(strategy => {
            let obj = {
                name: String,
                Icon: React.ElementType,
                count: Number,
            };
            obj.name = strategy.name;
            obj.Icon = getFeatureStrategyIcon(strategy.name);
            obj.count = counts[strategy.name];
            return result.push(obj);
        });
        return result;
    };
    return (
        <div className={styles.featureOverviewEnvironment}>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    className={styles.accordionHeader}
                    expandIcon={<ExpandMore />}
                >
                    <div className={styles.headerTitle} data-loading>
                        <EnvironmentIcon
                            enabled={env.enabled}
                            className={styles.headerIcon}
                        />
                        Feature toggle execution for&nbsp;
                        <StringTruncator
                            text={env.name}
                            className={styles.truncator}
                            maxWidth="100"
                        />
                        <ConditionallyRender
                            condition={renderStratigiesIcons()?.length !== 0}
                            show={
                                <div
                                    className={styles.stratigiesIconsContainer}
                                >
                                    {renderStratigiesIcons()?.map(
                                        ({ name, Icon, count }) => (
                                            <Badge
                                                key={name}
                                                badgeContent={count}
                                                color="secondary"
                                                overlap="circular"
                                                classes={{
                                                    colorSecondary: [
                                                        styles.badgeColor,
                                                    ],
                                                }}
                                            >
                                                <div
                                                    className={
                                                        styles.strategyIconContainer
                                                    }
                                                >
                                                    <Icon
                                                        className={
                                                            styles.strategyIcon
                                                        }
                                                    />
                                                </div>
                                            </Badge>
                                        )
                                    )}
                                    <PermissionIconButton
                                        onClick={() =>
                                            history.push(strategiesLink)
                                        }
                                        tooltip="Add strategy"
                                        permission={UPDATE_FEATURE}
                                        projectId={projectId}
                                    >
                                        <Add />
                                    </PermissionIconButton>
                                </div>
                            }
                            elseShow={
                                <div
                                    className={styles.noStratigiesInfoContainer}
                                >
                                    <p className={styles.strategiesText}>
                                        No strategies defined on this toggle
                                    </p>
                                </div>
                            }
                        />
                        <ConditionallyRender
                            condition={!env.enabled}
                            show={
                                <DisabledIndicator
                                    className={styles.disabledIndicatorPos}
                                />
                            }
                        />
                    </div>

                    <FeatureOverviewEnvironmentMetrics
                        environmentMetric={environmentMetric}
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <div className={styles.accordionContainer}>
                        <FeatureOverviewEnvironmentBody
                            featureEnvironment={featureEnvironment}
                            getOverviewText={getOverviewText}
                        />
                        <FeatureOverviewEnvironmentFooter
                            env={env}
                            environmentMetric={environmentMetric}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureOverviewEnvironment;
