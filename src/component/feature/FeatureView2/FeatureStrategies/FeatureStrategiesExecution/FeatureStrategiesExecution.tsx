import { useTheme } from '@material-ui/core';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import { useStyles } from './FeatureStrategiesExecution.styles';

interface IFeatureStrategiesExecutionProps {
    rollout?: number;
}

const FeatureStrategiesExecution = ({
    rollout,
}: IFeatureStrategiesExecutionProps) => {
    const styles = useStyles();
    const theme = useTheme();

    let circle = {};

    if (rollout !== undefined) {
        circle = {
            height: '65px',
            width: '65px',
            borderRadius: '50%',
            backgroundColor: theme.palette.grey[200],
            backgroundImage: `conic-gradient(${theme.palette.primary.main} ${rollout}%, ${theme.palette.grey[200]} 1%)`,
        };
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Execution plan</h3>
            <ConditionallyRender
                condition={Boolean(rollout !== undefined)}
                show={
                    <>
                        <p className={styles.text}>
                            {rollout}% of your user base is included.
                        </p>

                        <div style={circle} />
                    </>
                }
            />{' '}
        </div>
    );
};

export default FeatureStrategiesExecution;
