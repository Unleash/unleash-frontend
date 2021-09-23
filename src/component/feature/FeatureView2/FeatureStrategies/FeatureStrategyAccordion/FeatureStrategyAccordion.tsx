import {
    IConstraint,
    IParameter,
    IStrategy,
} from '../../../../../interfaces/strategy';

import Accordion from '@material-ui/core/Accordion';
import {
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Tooltip,
    debounce,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    getFeatureStrategyIcon,
    getHumanReadbleStrategyName,
} from '../../../../../utils/strategy-names';
import { useStyles } from './FeatureStrategyAccordion.styles';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import { Delete, FileCopy } from '@material-ui/icons';
import FeatureStrategyAccordionBody from './FeatureStrategyAccordionBody/FeatureStrategyAccordionBody';
import {
    memo,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import cloneDeep from 'lodash.clonedeep';
import FeatureStrategiesUIContext from '../../../../../contexts/FeatureStrategiesUIContext';

interface IFeatureStrategyAccordionProps {
    strategy: IStrategy;
    hideActions?: boolean;
    expanded?: boolean;
    setStrategyParams: (paremeters: IParameter, strategyId?: string) => any;
    setStrategyConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
    index?: number;
    setDelDialog: React.Dispatch<
        SetStateAction<{ strategyId: string; show: boolean }>
    >;
    dirty?: boolean;
    originalParams?: IParameter;
    discardChanges: () => void;
    updateStrategy?: (strategyId: string) => void;
}

const equalProps = (prevProps, nextProps) => {
    const keys = Object.keys(nextProps?.parameters || []);
    let equal = true;

    keys.forEach(key => {
        if (prevProps.parameters[key] !== nextProps.parameters[key]) {
            equal = false;
        }
    });

    keys.forEach(key => {
        if (prevProps.originalParams[key] !== nextProps.originalParams[key]) {
            equal = false;
        }
    });

    if (nextProps.dirty !== prevProps.dirty) {
        return false;
    }

    return equal;
};

const FeatureStrategyAccordion = ({
    strategy,
    expanded = false,
    hideActions = false,
    setStrategyParams,
    setDelDialog,
    parameters,
    constraints,
    setStrategyConstraints,
    children,
}: IFeatureStrategyAccordionProps) => {
    const styles = useStyles();
    const strategyName = getHumanReadbleStrategyName(strategy.name);
    const Icon = getFeatureStrategyIcon(strategy.name);

    const updateParameters = (field: string, value: any) => {
        setStrategyParams({ ...parameters, [field]: value });
    };

    const updateConstraints = (constraints: IConstraint[]) => {
        setStrategyConstraints(constraints);
    };

    return (
        <div className={styles.container}>
            <Accordion className={styles.accordion} defaultExpanded={expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="strategy-content"
                    id={strategy.name}
                >
                    <div className={styles.accordionSummary}>
                        <p className={styles.accordionHeader}>
                            <Icon className={styles.icon} /> {strategyName}
                        </p>

                        <ConditionallyRender
                            condition={Boolean(parameters?.rollout)}
                            show={
                                <p className={styles.rollout}>
                                    Rolling out to {parameters?.rollout}%
                                </p>
                            }
                        />
                        <ConditionallyRender
                            condition={!hideActions}
                            show={
                                <div className={styles.accordionActions}>
                                    <Tooltip title="Delete strategy">
                                        <IconButton
                                            onClick={e => {
                                                e.stopPropagation();
                                                setDelDialog({
                                                    strategyId: strategy.id,
                                                    show: true,
                                                });
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Copy strategy">
                                        <IconButton
                                            onClick={e => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <FileCopy />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            }
                        />
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <FeatureStrategyAccordionBody
                        strategy={{ ...strategy, parameters }}
                        updateParameters={updateParameters}
                        updateConstraints={updateConstraints}
                        constraints={constraints}
                        setStrategyConstraints={setStrategyConstraints}
                    >
                        {children}
                    </FeatureStrategyAccordionBody>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureStrategyAccordion;
