import { FiberManualRecord } from '@material-ui/icons';
import { useStyles } from './SegmentFormStepList.styles';
import React from 'react';

interface ISegmentFormStepListProps {
    total: number;
    current: number;
}

export const SegmentFormStepList: React.FC<ISegmentFormStepListProps> = ({
    total,
    current,
}) => {
    const styles = useStyles();

    const calculatePosition = () => {
        return 20 * (current - 1);
    };

    const renderCircles = () => {
        return (
            <>
                <FiberManualRecord className={styles.emptyCircle} />
                <FiberManualRecord className={styles.emptyCircle} />
                <FiberManualRecord
                    style={{
                        position: 'absolute',
                        left: '102px',
                        transition: 'transform 0.3s ease',
                        transform: `translateX(${calculatePosition()}px)`,
                    }}
                    className={styles.filledCircle}
                />
            </>
        );
    };
    return (
        <div className={styles.stepsContainer}>
            <span className={styles.stepsText}>
                Step {current} of {total}
            </span>
            {renderCircles()}
        </div>
    );
};
