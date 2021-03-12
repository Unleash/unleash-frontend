import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { Switch, Icon, IconButton } from '@material-ui/core';
import TimeAgo from 'react-timeago';
import Progress from '../progress-component';
import Status from '../status-component';
import FeatureType from './feature-type-container';
import ConditionallyRender from '../../common/conditionally-render';

import { UPDATE_FEATURE } from '../../../permissions';
import { calc, styles as commonStyles } from '../../common';
import styles from './list.module.scss';

const Feature = ({
    feature,
    toggleFeature,
    settings,
    metricsLastHour = { yes: 0, no: 0, isFallback: true },
    metricsLastMinute = { yes: 0, no: 0, isFallback: true },
    revive,
    hasPermission,
}) => {
    const { name, description, enabled, type, stale, createdAt } = feature;
    const { showLastHour = false } = settings;
    const isStale = showLastHour ? metricsLastHour.isFallback : metricsLastMinute.isFallback;
    const percent =
        1 *
        (showLastHour
            ? calc(metricsLastHour.yes, metricsLastHour.yes + metricsLastHour.no, 0)
            : calc(metricsLastMinute.yes, metricsLastMinute.yes + metricsLastMinute.no, 0));
    const featureUrl = toggleFeature === undefined ? `/archive/strategies/${name}` : `/features/strategies/${name}`;

    return (
        <ListItem>
            <span className={styles.listItemMetric}>
                <Progress strokeWidth={15} percentage={percent} isFallback={isStale} />
            </span>
            <span className={styles.listItemToggle}>
                <ConditionallyRender
                    condition={hasPermission(UPDATE_FEATURE)}
                    show={
                        <Switch
                            disabled={toggleFeature === undefined}
                            title={`Toggle ${name}`}
                            key="left-actions"
                            onChange={() => toggleFeature(!enabled, name)}
                            checked={enabled}
                        />
                    }
                    elseShow={<Switch disabled title={`Toggle ${name}`} key="left-actions" checked={enabled} />}
                />
            </span>
            <span className={classnames(styles.listItemLink)}>
                <Link to={featureUrl} className={classnames(commonStyles.listLink, commonStyles.truncate)}>
                    <span className={commonStyles.toggleName}>{name}&nbsp;</span>
                    <small className="mdl-color-text--blue-grey-300">
                        <TimeAgo date={createdAt} live={false} />
                    </small>
                    <div className="mdl-list__item-sub-title">
                        <span className={commonStyles.truncate}>{description}</span>
                    </div>
                </Link>
            </span>
            <span className={classnames(styles.listItemStrategies, commonStyles.hideLt920)}>
                <Status stale={stale} showActive={false} />
                <FeatureType type={type} />
            </span>
            <ConditionallyRender
                condition={revive && hasPermission(UPDATE_FEATURE)}
                show={
                    <IconButton onClick={() => revive(feature.name)}>
                        <Icon>undo</Icon>
                    </IconButton>
                }
                elseShow={<span />}
            />
        </ListItem>
    );
};

Feature.propTypes = {
    feature: PropTypes.object,
    toggleFeature: PropTypes.func,
    settings: PropTypes.object,
    metricsLastHour: PropTypes.object,
    metricsLastMinute: PropTypes.object,
    revive: PropTypes.func,
    hasPermission: PropTypes.func.isRequired,
};

export default memo(Feature);
