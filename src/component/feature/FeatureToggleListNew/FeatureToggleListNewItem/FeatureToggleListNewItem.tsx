import { Switch, TableCell, TableRow } from '@material-ui/core';
import classnames from 'classnames';
import { useHistory } from 'react-router';
import { getFeatureTypeIcons } from '../../../../utils/get-feature-type-icons';
import { useStyles } from '../FeatureToggleListNew.styles';

interface IFeatureToggleListNewItemProps {
    name: string;
    type: string;
}

const FeatureToggleListNewItem = ({
    name,
    type,
}: IFeatureToggleListNewItemProps) => {
    const styles = useStyles();
    const history = useHistory();

    const onClick = () => {
        history.push(`/features/strategies/${name}`);
    };

    const IconComponent = getFeatureTypeIcons(type);

    return (
        <TableRow onClick={onClick} className={styles.tableRow}>
            <TableCell className={styles.tableCell} align="left">
                {name}
            </TableCell>
            <TableCell className={classnames(styles.tableCell)} align="left">
                <div className={styles.tableCellType}>
                    <IconComponent className={styles.icon} /> {type}
                </div>
            </TableCell>
            <TableCell className={styles.tableCell} align="center">
                <Switch checked />
            </TableCell>
            <TableCell className={styles.tableCell} align="center">
                <Switch checked />
            </TableCell>
        </TableRow>
    );
};

export default FeatureToggleListNewItem;
