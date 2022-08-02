import { Fragment, useMemo, VFC } from 'react';
import { Box, Chip } from '@mui/material';
import { IFeatureStrategy } from 'interfaces/strategy';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import PercentageCircle from 'component/common/PercentageCircle/PercentageCircle';
import { StrategySeparator } from 'component/common/StrategySeparator/StrategySeparator';
import { ConstraintItem } from './ConstraintItem/ConstraintItem';
import { useStrategies } from 'hooks/api/getters/useStrategies/useStrategies';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { FeatureOverviewSegment } from 'component/feature/FeatureView/FeatureOverview/FeatureOverviewSegment/FeatureOverviewSegment';
import { ConstraintAccordionList } from 'component/common/ConstraintAccordion/ConstraintAccordionList/ConstraintAccordionList';
import { useStyles } from './StrategyExecution.styles';
import {
    parseParameterString,
    parseParameterNumber,
    parseParameterStrings,
} from 'utils/parseParameter';

interface IStrategyExecutionProps {
    strategy: IFeatureStrategy;
    percentageFill?: string;
}

const NoItems: VFC = () => (
    <Box sx={{ px: 3, color: 'text.disabled' }}>
        This strategy does not have constraints or parameters.
    </Box>
);

export const StrategyExecution: VFC<IStrategyExecutionProps> = ({
    strategy,
}) => {
    const { parameters, constraints = [] } = strategy;
    const { classes: styles } = useStyles();
    const { strategies } = useStrategies();
    const { uiConfig } = useUiConfig();
    const { segments } = useSegments(strategy.id);

    const definition = strategies.find(strategyDefinition => {
        return strategyDefinition.name === strategy.name;
    });

    const renderParameters = useMemo(() => {
        if (!parameters || definition?.editable) return null;

        return Object.keys(parameters).map(key => {
            switch (key) {
                case 'rollout':
                case 'Rollout':
                    return (
                        <Box
                            className={styles.summary}
                            key={key}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <PercentageCircle
                                hideNumber
                                percentage={parseParameterNumber(
                                    parameters[key]
                                )}
                                styles={{
                                    width: '2rem',
                                    height: '2rem',
                                    marginRight: '1rem',
                                }}
                            />
                            <div>
                                <Chip
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    label={`${parameters[key]}%`}
                                />{' '}
                                of your base{' '}
                                {constraints.length > 0
                                    ? 'who match constraints'
                                    : ''}{' '}
                                is included.
                            </div>
                        </Box>
                    );
                case 'userIds':
                case 'UserIds':
                    const users = parseParameterStrings(parameters[key]);
                    return (
                        <ConstraintItem key={key} value={users} text="user" />
                    );
                case 'hostNames':
                case 'HostNames':
                    const hosts = parseParameterStrings(parameters[key]);
                    return (
                        <ConstraintItem key={key} value={hosts} text={'host'} />
                    );
                case 'IPs':
                    const IPs = parseParameterStrings(parameters[key]);
                    return <ConstraintItem key={key} value={IPs} text={'IP'} />;
                case 'stickiness':
                case 'groupId':
                    return null;
                default:
                    return null;
            }
        });
    }, [parameters, definition, constraints, styles]);

    const renderCustomStrategy = useMemo(() => {
        if (!parameters || !definition?.editable) return null;

        return definition?.parameters.map((param: any, index: number) => {
            const notLastItem = index !== definition?.parameters?.length - 1;
            switch (param?.type) {
                case 'list':
                    const values = parseParameterStrings(
                        strategy?.parameters[param.name]
                    );
                    return (
                        <Fragment key={param?.name}>
                            <ConstraintItem value={values} text={param.name} />
                            <ConditionallyRender
                                condition={notLastItem}
                                show={<StrategySeparator text="AND" />}
                            />
                        </Fragment>
                    );
                case 'percentage':
                    return (
                        <Fragment key={param?.name}>
                            <div>
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    label={`${
                                        strategy?.parameters[param.name]
                                    }%`}
                                />{' '}
                                of your base{' '}
                                {constraints?.length > 0
                                    ? 'who match constraints'
                                    : ''}{' '}
                                is included.
                            </div>
                            <PercentageCircle
                                percentage={parseParameterNumber(
                                    strategy.parameters[param.name]
                                )}
                            />
                            <ConditionallyRender
                                condition={notLastItem}
                                show={<StrategySeparator text="AND" />}
                            />
                        </Fragment>
                    );
                case 'boolean':
                    return (
                        <Fragment key={param.name}>
                            <p key={param.name}>
                                <StringTruncator
                                    maxLength={15}
                                    maxWidth="150"
                                    text={param.name}
                                />{' '}
                                {strategy.parameters[param.name]}
                            </p>
                            <ConditionallyRender
                                condition={
                                    typeof strategy.parameters[param.name] !==
                                    'undefined'
                                }
                                show={
                                    <ConditionallyRender
                                        condition={notLastItem}
                                        show={<StrategySeparator text="AND" />}
                                    />
                                }
                            />
                        </Fragment>
                    );
                case 'string':
                    const value = parseParameterString(
                        strategy.parameters[param.name]
                    );
                    return (
                        <ConditionallyRender
                            condition={
                                typeof strategy.parameters[param.name] !==
                                'undefined'
                            }
                            key={param.name}
                            show={
                                <>
                                    <p className={styles.valueContainer}>
                                        <StringTruncator
                                            maxWidth="150"
                                            maxLength={15}
                                            text={param.name}
                                        />
                                        <span className={styles.valueSeparator}>
                                            is set to
                                        </span>
                                        <StringTruncator
                                            maxWidth="300"
                                            text={value}
                                            maxLength={50}
                                        />
                                    </p>
                                    <ConditionallyRender
                                        condition={notLastItem}
                                        show={<StrategySeparator text="AND" />}
                                    />
                                </>
                            }
                        />
                    );
                case 'number':
                    const number = parseParameterNumber(
                        strategy.parameters[param.name]
                    );
                    return (
                        <ConditionallyRender
                            condition={number !== undefined}
                            key={param.name}
                            show={
                                <>
                                    <p className={styles.valueContainer}>
                                        <StringTruncator
                                            maxLength={15}
                                            maxWidth="150"
                                            text={param.name}
                                        />
                                        <span className={styles.valueSeparator}>
                                            is set to
                                        </span>
                                        <StringTruncator
                                            maxWidth="300"
                                            text={String(number)}
                                            maxLength={50}
                                        />
                                    </p>
                                    <ConditionallyRender
                                        condition={notLastItem}
                                        show={<StrategySeparator text="AND" />}
                                    />
                                </>
                            }
                        />
                    );
                case 'default':
                    return null;
            }
            return null;
        });
    }, [parameters, definition, strategy, constraints, styles]);

    if (!parameters) {
        return <NoItems />;
    }

    const listItems = [
        Boolean(uiConfig.flags.SE) && segments && segments.length > 0 && (
            <FeatureOverviewSegment strategyId={strategy.id} />
        ),
        constraints.length > 0 && (
            <ConstraintAccordionList
                constraints={constraints}
                showLabel={false}
            />
        ),
        strategy.name === 'default' && (
            <>
                <ConditionallyRender
                    condition={constraints.length > 0 || Boolean(segments)}
                    show={<StrategySeparator text="AND" />}
                />
                <Box sx={{ width: '100%' }} className={styles.summary}>
                    The standard strategy is{' '}
                    <Chip
                        variant="outlined"
                        size="small"
                        color="success"
                        label="ON"
                    />{' '}
                    for all users.
                </Box>
            </>
        ),
        Boolean(renderParameters) &&
            (renderParameters as any[])?.length > 0 &&
            renderParameters,
        Boolean(renderCustomStrategy) &&
            (renderCustomStrategy as any[])?.length > 0 &&
            renderCustomStrategy,
    ].filter(Boolean);

    return (
        <ConditionallyRender
            condition={listItems.length > 0}
            show={
                <>
                    {listItems.map((item, index) => (
                        <Fragment key={index}>
                            <ConditionallyRender
                                condition={index > 0}
                                show={<StrategySeparator text="AND" />}
                            />
                            {item}
                        </Fragment>
                    ))}
                </>
            }
            elseShow={<NoItems />}
        />
    );
};
