import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Switch, Chip, ListItem } from 'react-mdl';
import Progress from '../feature/progress';
import { calc, styles as commonStyles } from '../common';

import styles from './feature.scss';

const UserFeature = ({
    feature,
    toggleFeature,
    settings,
    metricsLastHour = { yes: 0, no: 0, isFallback: true },
    metricsLastMinute = { yes: 0, no: 0, isFallback: true },
    userId
}) => {
    console.log(feature);
    const { name, description, enabled, strategies, togglable } = feature;

    const { showLastHour = false } = settings;
    const isStale = showLastHour ? metricsLastHour.isFallback : metricsLastMinute.isFallback;

    const percent =
        1 *
        (showLastHour
            ? calc(metricsLastHour.yes, metricsLastHour.yes + metricsLastHour.no, 0)
            : calc(metricsLastMinute.yes, metricsLastMinute.yes + metricsLastMinute.no, 0));

    return (
        <ListItem twoLine>
            <span className={styles.listItemMetric}>
                <Progress strokeWidth={15} percentage={percent} isFallback={isStale} />
            </span>
            <span className={styles.listItemToggle}>
                <Switch
                    title={`Toggle ${name}`}
                    key="left-actions"
                    onChange={() => toggleFeature(userId, name)}
                    checked={enabled}
                    disabled={!togglable}
                />
            </span>
            <span className={['mdl-list__item-primary-content', styles.listItemLink].join(' ')}>
                <Link
                    to={`/features/view/${name}`}
                    className={[commonStyles.listLink, commonStyles.truncate].join(' ')}
                >
                    {name}
                    <span className={['mdl-list__item-sub-title', commonStyles.truncate].join(' ')}>{description}</span>
                </Link>
            </span>
            <span className={[styles.listItemStrategies, commonStyles.hideLt920].join(' ')}>
            </span>
        </ListItem>
    );
};

UserFeature.propTypes = {
    feature: PropTypes.object,
    toggleFeature: PropTypes.func,
    settings: PropTypes.object,
    metricsLastHour: PropTypes.object,
    metricsLastMinute: PropTypes.object,
};

export default UserFeature;
