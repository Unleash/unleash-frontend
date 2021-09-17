import { IStrategy } from '../../../../../interfaces/strategy';

import Accordion from '@material-ui/core/Accordion';
import {
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Tooltip,
    debounce,
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
import { useContext, useEffect, useState } from 'react';

interface IFeatureStrategyAccordionProps {
    strategy: IStrategy;
    hideActions?: boolean;
    expanded?: boolean;
    setStrategyParams: () => any;
    index?: number;
}

const FeatureStrategyAccordion = ({
    strategy,
    expanded = false,
    hideActions = false,
    setStrategyParams,
}: IFeatureStrategyAccordionProps) => {
    const styles = useStyles();
    const strategyName = getHumanReadbleStrategyName(strategy.name);
    const Icon = getFeatureStrategyIcon(strategy.name);
    const [parameters, setParameters] = useState(strategy.parameters);

    const debouncedStrategyParams = debounce(setStrategyParams, 250);

    useEffect(() => {
        setStrategyParams(parameters);
    }, []);

    const updateParameters = (field: string, value: any) => {
        setParameters(prev => ({ ...prev, [field]: value }));
        debouncedStrategyParams(parameters);
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
                                                console.log('DELETING');
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Copy strategy">
                                        <IconButton
                                            onClick={e => {
                                                e.stopPropagation();
                                                console.log('COPYING');
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
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureStrategyAccordion;
