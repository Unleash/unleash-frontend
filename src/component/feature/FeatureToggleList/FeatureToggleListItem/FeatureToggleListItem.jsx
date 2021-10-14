import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import { Chip, IconButton, ListItem } from '@material-ui/core';
import { Undo } from '@material-ui/icons';

import TimeAgo from 'react-timeago';
import Status from '../../status-component';
import ConditionallyRender from '../../../common/ConditionallyRender/ConditionallyRender';

import { UPDATE_FEATURE } from '../../../AccessProvider/permissions';
import { styles as commonStyles } from '../../../common';

import { useStyles } from './styles';
import { getTogglePath } from '../../../../utils/route-path-helpers';
import FeatureStatus from '../../FeatureView2/FeatureStatus/FeatureStatus';
import FeatureType from '../../FeatureView2/FeatureType/FeatureType';



const FeatureToggleListItem = ({
    feature,
    toggleFeature,
    settings,
    metricsLastHour = { yes: 0, no: 0, isFallback: true },
    metricsLastMinute = { yes: 0, no: 0, isFallback: true },
    revive,
    hasAccess,
    flags = {},
    ...rest
}) => {
    const styles = useStyles();

    const isArchive = !!revive;

    const { name, description, type, stale, createdAt, project, lastSeenAt } =
        feature;
   
    return (
        <ListItem
            {...rest}
            className={classnames(styles.listItem, rest.className)}
        >
            <span className={styles.listItemMetric}>
                <FeatureStatus lastSeenAt={lastSeenAt} />
            </span>
            <span className={classnames(styles.listItemType, commonStyles.hideLt600)}>
                <FeatureType type={type} />
            </span>
            <span className={classnames(styles.listItemLink)}>
                <ConditionallyRender condition={!isArchive} show={
                    <Link
                        to={getTogglePath(feature.project, name, flags.E)}
                        className={classnames(
                            commonStyles.listLink,
                            commonStyles.truncate
                        )}
                    >
                        <span className={commonStyles.toggleName}>
                            {name}&nbsp;
                        </span>
                        <span className={styles.listItemToggle}>
                        </span>
                        <small>
                            <TimeAgo date={createdAt} live={false} />
                        </small>
                        <div>
                            <span className={commonStyles.truncate}>
                                <small>{description}</small>
                            </span>
                        </div>
                    </Link>
                } elseShow={
                    <>
                        <span className={commonStyles.toggleName}>
                            {name}&nbsp;
                        </span>
                        <span className={styles.listItemToggle}>
                        </span>
                        <small>
                            <TimeAgo date={createdAt} live={false} />
                        </small>
                        <div>
                            <span className={commonStyles.truncate}>
                                <small>{description}</small>
                            </span>
                        </div>
                    </>
                }/>


                
            </span>
            <span
                className={classnames(
                    styles.listItemStrategies,
                    commonStyles.hideLt920
                )}
            >
                <Status stale={stale} showActive={false} />
                <Chip color="primary" variant="outlined" className={styles.typeChip} style={{marginLeft: '8px'}} title={`Project: ${project}`} label={project}/>
            </span>
            <ConditionallyRender
                condition={revive}
                show={
                    <ConditionallyRender
                        condition={hasAccess(UPDATE_FEATURE, project)}
                        show={
                            <IconButton onClick={() => revive(feature.name)}>
                                <Undo />
                            </IconButton>
                        }
                        elseShow={<span style={{ width: '48px ' }} />}
                    />
                }
            />
        </ListItem>
    );
};

FeatureToggleListItem.propTypes = {
    feature: PropTypes.object,
    toggleFeature: PropTypes.func,
    settings: PropTypes.object,
    metricsLastHour: PropTypes.object,
    metricsLastMinute: PropTypes.object,
    revive: PropTypes.func,
    hasAccess: PropTypes.func.isRequired,
    flags: PropTypes.object,
};

export default memo(FeatureToggleListItem);
