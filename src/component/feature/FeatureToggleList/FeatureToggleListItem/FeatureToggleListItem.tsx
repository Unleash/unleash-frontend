import { memo } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Chip, ListItem, Tooltip } from '@material-ui/core';
import { Undo } from '@material-ui/icons';
import TimeAgo from 'react-timeago';
import { IAccessContext } from 'contexts/AccessContext';
import StatusChip from 'component/common/StatusChip/StatusChip';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { UPDATE_FEATURE } from 'component/providers/AccessProvider/permissions';
import { styles as commonStyles } from 'component/common'; // FIXME: remove
import { IFeatureToggle } from 'interfaces/featureToggle';
import { IFlags } from 'interfaces/uiConfig';
import { getTogglePath } from 'utils/routePathHelpers';
import FeatureStatus from 'component/feature/FeatureView/FeatureStatus/FeatureStatus';
import FeatureType from 'component/feature/FeatureView/FeatureType/FeatureType';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { useStyles } from './styles'; // FIXME: cleanup

interface IFeatureToggleListItemProps {
    feature: IFeatureToggle;
    onRevive?: (id: string) => void;
    hasAccess: IAccessContext['hasAccess'];
    flags?: IFlags;
    className?: string;
}

export const FeatureToggleListItem = memo<IFeatureToggleListItemProps>(
    ({ feature, onRevive, hasAccess, flags = {}, className, ...rest }) => {
        const styles = useStyles();

        const { projects } = useProjects();
        const isArchive = !!onRevive;

        const {
            name,
            description,
            type,
            stale,
            createdAt,
            project,
            lastSeenAt,
        } = feature;

        const projectExists = () => {
            let projectExist = projects.find(proj => proj.id === project);
            if (projectExist) {
                return true;
            }
            return false;
        };

        const reviveFeature = () => {
            if (projectExists() && onRevive) {
                onRevive(feature.name);
            }
        };

        return (
            <ListItem
                {...rest}
                className={classnames(styles.listItem, className)}
            >
                <span className={styles.listItemMetric}>
                    <FeatureStatus
                        lastSeenAt={lastSeenAt}
                        tooltipPlacement="left"
                    />
                </span>
                <span
                    className={classnames(
                        styles.listItemType,
                        commonStyles.hideLt600
                    )}
                >
                    <FeatureType type={type} />
                </span>
                <span className={classnames(styles.listItemLink)}>
                    <ConditionallyRender
                        condition={!isArchive}
                        show={
                            <Link
                                to={getTogglePath(feature.project, name)}
                                className={classnames(
                                    commonStyles.listLink,
                                    commonStyles.truncate
                                )}
                            >
                                <Tooltip title={description || ' '}>
                                    <span className={commonStyles.toggleName}>
                                        {name}&nbsp;
                                    </span>
                                </Tooltip>
                                {/* <span className={styles.listItemToggle}></span> */}
                                <span></span>
                                <small>
                                    <TimeAgo date={createdAt} live={false} />
                                </small>
                                <div>
                                    <span className={commonStyles.truncate}>
                                        <small>{description}</small>
                                    </span>
                                </div>
                            </Link>
                        }
                        elseShow={
                            <>
                                <Tooltip title={description || ' '}>
                                    <span className={commonStyles.toggleName}>
                                        {name}&nbsp;{' '}
                                    </span>
                                </Tooltip>
                                {/* <span className={styles.listItemToggle}></span> */}
                                <span></span>
                                <small>
                                    <TimeAgo date={createdAt} live={false} />
                                </small>
                                <div>
                                    <span className={commonStyles.truncate}>
                                        <small>{description}</small>
                                    </span>
                                </div>
                            </>
                        }
                    />
                </span>
                <span
                    className={classnames(
                        styles.listItemStrategies,
                        commonStyles.hideLt920
                    )}
                >
                    <StatusChip stale={stale} showActive={false} />
                    <Link
                        to={`/projects/${project}`}
                        style={{ textDecoration: 'none' }}
                        className={classnames({
                            [`${styles.disabledLink}`]: !projectExists(),
                        })}
                    >
                        <Chip
                            color="primary"
                            variant="outlined"
                            // className={styles.typeChip} // FIXME: cleanup
                            style={{ marginLeft: '8px', cursor: 'pointer' }}
                            title={`Project: ${project}`}
                            label={project}
                        />
                    </Link>
                </span>
                <ConditionallyRender
                    condition={isArchive}
                    show={
                        <PermissionIconButton
                            permission={UPDATE_FEATURE}
                            projectId={project}
                            disabled={
                                !hasAccess(UPDATE_FEATURE, project) ||
                                !projectExists()
                            }
                            onClick={reviveFeature}
                        >
                            <Undo />
                        </PermissionIconButton>
                    }
                />
            </ListItem>
        );
    }
);
