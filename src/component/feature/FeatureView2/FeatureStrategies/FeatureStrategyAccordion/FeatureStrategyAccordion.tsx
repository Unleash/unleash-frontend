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

    const { constraints: prevConstraints } = prevProps.originalParams;
    const { constraints: currentConstraints } = nextProps.originalParams;

    prevConstraints.forEach((prevConstraint, index) => {
        if (prevConstraint !== currentConstraints[index]) {
            equal = false;
        }
    });

    if (nextProps.dirty !== prevProps.dirty) {
        return false;
    }

    return equal;
};

const FeatureStrategyAccordion = memo(
    ({
        strategy,
        expanded = false,
        hideActions = false,
        setStrategyParams,
        setDelDialog,
        dirty = false,
        updateStrategy,
        discardChanges,
        originalParams,
        setStrategyConstraints,
    }: IFeatureStrategyAccordionProps) => {
        const styles = useStyles();
        const strategyName = getHumanReadbleStrategyName(strategy.name);
        const Icon = getFeatureStrategyIcon(strategy.name);
        const [parameters, setParameters] = useState(strategy.parameters);
        const [localStrategyConstraints, setLocalStrategyConstraints] =
            useState(strategy.constraints);

        const debouncedStrategyParams = debounce(setStrategyParams, 250);

        useEffect(() => {
            setStrategyParams(parameters, strategy.id);
        }, []);

        const updateParameters = (field: string, value: any) => {
            setParameters(prev => ({ ...prev, [field]: value }));

            if (field === 'rollout') {
                debouncedStrategyParams(
                    { ...parameters, [field]: value },
                    strategy.id
                );
            } else {
                setStrategyParams(
                    { ...parameters, [field]: value },
                    strategy.id
                );
            }
        };

        const handleDiscardChanges = () => {
            discardChanges(strategy.id);
            console.log(originalParams);
            setParameters(originalParams?.parameters);
            setLocalStrategyConstraints([
                ...cloneDeep(originalParams?.constraints),
            ]);
        };

        return (
            <div className={styles.container}>
                <Accordion
                    className={styles.accordion}
                    defaultExpanded={expanded}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="strategy-content"
                        id={strategy.name}
                    >
                        <ConditionallyRender
                            condition={dirty}
                            show={
                                <div className={styles.unsaved}>
                                    Unsaved changes
                                </div>
                            }
                        />
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
                            constraints={localStrategyConstraints}
                            setLocalStrategyConstraints={
                                setLocalStrategyConstraints
                            }
                            setStrategyConstraints={setStrategyConstraints}
                        >
                            <ConditionallyRender
                                condition={dirty && updateStrategy}
                                show={
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '1rem',
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginRight: '1rem' }}
                                            onClick={() =>
                                                updateStrategy(strategy.id)
                                            }
                                        >
                                            Save changes
                                        </Button>
                                        <Button onClick={handleDiscardChanges}>
                                            Discard changes
                                        </Button>
                                    </div>
                                }
                            />{' '}
                        </FeatureStrategyAccordionBody>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    },
    equalProps
);

export default FeatureStrategyAccordion;
