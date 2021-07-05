import { useRef } from 'react';
import { Switch, TableCell, TableRow } from '@material-ui/core';
import { useHistory } from 'react-router';
import useProject from '../../../../hooks/api/getters/useProject/useProject';
import { IEnvironments } from '../../../../interfaces/featureToggle';
import { formatApiPath } from '../../../../utils/format-path';
import { getFeatureTypeIcons } from '../../../../utils/get-feature-type-icons';
import { useStyles } from '../FeatureToggleListNew.styles';
import useToggleFeatureByEnv from '../../../../hooks/api/actions/useToggleFeatureByEnv/useToggleFeatureByEnv';

interface IFeatureToggleListNewItemProps {
    name: string;
    type: string;
    environments: IEnvironments;
    projectId: string;
}

const FeatureToggleListNewItem = ({
    name,
    type,
    environments,
    projectId,
}: IFeatureToggleListNewItemProps) => {
    const { refetch } = useProject(projectId);
    const { toggleFeatureByEnvironment, errors } = useToggleFeatureByEnv(
        projectId,
        name
    );
    const styles = useStyles();
    const history = useHistory();
    const ref = useRef(null);

    const onClick = (e: Event) => {
        if (!ref.current?.contains(e.target)) {
            history.push(`/features/strategies/${name}`);
        }
    };

    const IconComponent = getFeatureTypeIcons(type);

    return (
        <TableRow onClick={onClick} className={styles.tableRow}>
            <TableCell className={styles.tableCell} align="left">
                <span data-loading>{name}</span>
            </TableCell>
            <TableCell className={styles.tableCell} align="left">
                <div className={styles.tableCellType}>
                    <IconComponent data-loading className={styles.icon} />{' '}
                    <span data-loading>{type}</span>
                </div>
            </TableCell>
            {environments.map((env: any) => {
                return (
                    <TableCell
                        className={styles.tableCell}
                        align="center"
                        key={env.name}
                    >
                        <span data-loading style={{ display: 'block' }}>
                            <Switch
                                checked={env.enabled}
                                ref={ref}
                                onClick={() =>
                                    toggleFeatureByEnvironment(
                                        env.name,
                                        env.enabled
                                    )
                                }
                            />
                        </span>
                    </TableCell>
                );
            })}
        </TableRow>
    );
};

export default FeatureToggleListNewItem;
