import { FiberManualRecord } from '@material-ui/icons';
import { useStyles } from './SegmentFormStepList.styles';
import React from 'react';
import classNames from 'classnames';

interface ISegmentFormStepListProps {
    total: number;
    current: number;
}

export const SegmentFormStepList: React.FC<ISegmentFormStepListProps> = ({
    total,
    current,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                <span className={styles.stepsText}>
                    Step {current} of {total}
                </span>
                {Array.from({ length: total }).map((v, i) => (
                    <FiberManualRecord
                        key={i}
                        className={classNames(
                            styles.circle,
                            i === current - 1 && styles.filledCircle
                        )}
                    />
                ))}
            </div>
        </div>
    );
};
