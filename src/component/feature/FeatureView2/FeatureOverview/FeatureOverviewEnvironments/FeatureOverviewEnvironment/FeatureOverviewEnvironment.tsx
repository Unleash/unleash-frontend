import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@material-ui/core';
import { Cloud, ExpandMore } from '@material-ui/icons';
import { IFeatureEnvironment } from '../../../../../../interfaces/featureToggle';

import { useStyles } from './FeatureOverviewEnvironment.styles';

interface IFeatureOverviewEnvironmentProps {
    env: IFeatureEnvironment;
}

const FeatureOverviewEnvironment = ({
    env,
}: IFeatureOverviewEnvironmentProps) => {
    const styles = useStyles();

    return (
        <div className={styles.featureOverviewEnvironment}>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    className={styles.accordionHeader}
                    expandIcon={<ExpandMore />}
                >
                    <div className={styles.headerTitle}>
                        <div className={styles.iconContainer}>
                            <Cloud className={styles.icon} />
                        </div>
                        {env.name}
                    </div>
                </AccordionSummary>

                <AccordionDetails>Hello world</AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FeatureOverviewEnvironment;
