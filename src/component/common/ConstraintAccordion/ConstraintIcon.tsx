import { useStyles } from './ConstraintAccordion.styles';
import { TrackChanges } from '@mui/icons-material';

export const ConstraintIcon = () => {
    const styles = useStyles();

    return (
        <div className={styles.constraintIconContainer}>
            <TrackChanges className={styles.constraintIcon} />
        </div>
    );
};
