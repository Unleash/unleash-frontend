import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import PercentageCircle from '../../../../common/PercentageCircle/PercentageCircle';
import { useStyles } from './FeatureEnvironmentMetrics.styles';

const FeatureEnvironmentMetrics = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h2 className={styles.title}>Traffic in dev</h2>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>

            <div className={styles.bodyContainer}>
                <div>
                    <div className={styles.trueCountContainer}>
                        <span className={styles.trueCount} />
                        <p className={styles.paragraph}>
                            41 received this feature
                        </p>
                    </div>

                    <div className={styles.falseCountContainer}>
                        <span className={styles.falseCount} />
                        <p className={styles.paragraph}>
                            13 did not receive this feature
                        </p>
                    </div>
                </div>
                <PercentageCircle
                    percentage={75}
                    styles={{ height: '60px', width: '60px' }}
                />
            </div>
        </div>
    );
};

export default FeatureEnvironmentMetrics;
