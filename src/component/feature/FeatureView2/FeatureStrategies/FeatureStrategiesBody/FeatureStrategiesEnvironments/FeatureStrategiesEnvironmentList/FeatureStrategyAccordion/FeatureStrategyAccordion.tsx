import { IStrategy } from '../../../../../../../../interfaces/strategy';

import Accordion from '@material-ui/core/Accordion';
import {
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    getFeatureStrategyIcon,
    getHumanReadbleStrategyName,
} from '../../../../../../../../utils/strategy-names';
import { useStyles } from './FeatureStrategyAccordion.styles';
import ConditionallyRender from '../../../../../../../common/ConditionallyRender';
import { Delete, FileCopy } from '@material-ui/icons';

interface IFeatureStrategyAccordionProps {
    strategy: IStrategy;
}

const FeatureStrategyAccordion = ({
    strategy,
}: IFeatureStrategyAccordionProps) => {
    const styles = useStyles();
    const strategyName = getHumanReadbleStrategyName(strategy.name);
    const Icon = getFeatureStrategyIcon(strategy.name);

    const { parameters } = strategy;

    return (
        <div className={styles.container}>
            <Accordion className={styles.accordion}>
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
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                    </p>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureStrategyAccordion;
