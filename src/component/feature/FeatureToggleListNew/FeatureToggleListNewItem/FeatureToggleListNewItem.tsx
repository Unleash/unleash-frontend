import { useRef } from 'react';
import {
    Switch,
    TableCell,
    TableRow,
} from '@material-ui/core';
import { useHistory } from 'react-router';

import { useStyles } from '../FeatureToggleListNew.styles';
import useToggleFeatureByEnv from '../../../../hooks/api/actions/useToggleFeatureByEnv/useToggleFeatureByEnv';
import { IEnvironments } from '../../../../interfaces/featureToggle';
import useToast from '../../../../hooks/useToast';
import { getTogglePath } from '../../../../utils/route-path-helpers';
import { SyntheticEvent } from 'react-router/node_modules/@types/react';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import FeatureStatus from '../../FeatureView2/FeatureStatus/FeatureStatus';
import FeatureType from '../../FeatureView2/FeatureType/FeatureType';
import classNames from 'classnames';

interface IFeatureToggleListNewItemProps {
    name: string;
    type: string;
    environments: IFeatureEnvironment[];
    projectId: string;
    lastSeenAt?: Date;
}

const FeatureToggleListNewItem = ({
    name,
    lastSeenAt,
    type,
    environments,
    projectId,
}: IFeatureToggleListNewItemProps) => {
    const { toast, setToastData } = useToast();
    const { toggleFeatureByEnvironment } = useToggleFeatureByEnv(
        projectId,
        name,
    );
    const { uiConfig } = useUiConfig();
    

    const styles = useStyles();
    const history = useHistory();
    const ref = useRef(null);

    const onClick = (e: SyntheticEvent) => {
        if (!ref.current?.contains(e.target)) {
            history.push(getTogglePath(projectId, name, uiConfig.flags.E));
        }
    };

    const handleToggle = (env: IEnvironments, e: SyntheticEvent) => {
        toggleFeatureByEnvironment(env.name, env.enabled)
            .then(() => {
                setToastData({
                    show: true,
                    type: 'success',
                    text: 'Successfully updated toggle status.',
                });
            })
            .catch(e => {
                setToastData({
                    show: true,
                    type: 'error',
                    text: e.toString(),
                });
            });
    };

    

    return (
        <>
            <TableRow className={styles.tableRow}>
                <TableCell className={classNames(
                                styles.tableCell,
                                styles.tableCellStatus)} align="left" onClick={onClick}>
                    <FeatureStatus lastSeenAt={lastSeenAt} />
                </TableCell>
                <TableCell className={classNames(
                                styles.tableCell,
                                styles.tableCellType)} align="center" onClick={onClick}>
                    <FeatureType type={type} />
                </TableCell>
                <TableCell className={classNames(
                                styles.tableCell, styles.tableCellName)} align="left" onClick={onClick}>
                    <span data-loading>{name}</span>
                </TableCell>
                

                {environments.map((env: IEnvironments) => {
                    return (
                        <TableCell
                            className={classNames(
                                styles.tableCell,
                                styles.tableCellEnv)}
                            align="center"
                            key={env.name}
                        >
                            <span data-loading style={{ display: 'block' }}>
                                <Switch
                                    checked={env.enabled}
                                    ref={ref}
                                    onClick={handleToggle.bind(this, env)}
                                />
                            </span>
                        </TableCell>
                    );
                })}
            </TableRow>
            {toast}
        </>
    );
};

export default FeatureToggleListNewItem;
