import { useStyles } from './ConstraintAccordion.styles';
import { TrackChanges } from '@mui/icons-material';

interface IConstraintIconProps {
    style: React.CSSProperties;
}

export const ConstraintIcon = ({ style = {} }: IConstraintIconProps) => {
    const { classes: styles } = useStyles();

    return (
        <div className={styles.constraintIconContainer} style={style}>
            <TrackChanges className={styles.constraintIcon} />
        </div>
    );
};
