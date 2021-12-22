import { Check } from '@material-ui/icons';
import { useStyles } from './CheckMarkBadge.styles';
import classnames from 'classnames';

const CheckMarkBadge = ({ className }) => {
    const styles = useStyles();
    return (
        <div className={classnames(styles.badge, className)}>
            <Check className={styles.check} />
        </div>
    );
};

export default CheckMarkBadge;
