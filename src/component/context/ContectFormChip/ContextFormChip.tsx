import { useStyles } from 'component/context/ContectFormChip/ContextFormChip.styles';
import { Cancel } from '@material-ui/icons';

interface IContextFormChipProps {
    label: string;
    description?: string;
    onRemove: () => void;
}

export const ContextFormChip = ({
    label,
    description,
    onRemove,
}: IContextFormChipProps) => {
    const styles = useStyles();

    return (
        <li className={styles.container}>
            <div>
                <div className={styles.label}>{label}</div>
                {description && (
                    <div className={styles.description}>{description}</div>
                )}
            </div>
            <button onClick={onRemove} className={styles.button}>
                <Cancel titleAccess="Remove" />
            </button>
        </li>
    );
};
