import FeatureViewMetaData from './FeatureViewMetaData/FeatureViewMetaData';
import FeatureOverviewStrategies from './FeatureOverviewStrategies/FeatureOverviewStrategies';
import FeatureOverviewTags from './FeatureOverviewTags/FeatureOverviewTags';
import FeatureEnvironmentMetrics from './FeatureEnvironmentMetrics/FeatureEnvironmentMetrics';

import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';
import { useParams } from 'react-router';
import { IFeatureViewParams } from '../../../../interfaces/params';

import { useStyles } from './FeatureOverview.styles';
import { useEffect, useState } from 'react';
import { IEnvironmentMetrics } from '../../../../interfaces/environments';
import FeatureOverviewMetrics from './FeatureOverviewMetrics/FeatureOverviewMetrics';

const data = {
    version: 1,
    maturity: 'experimental',
    lastHourUsage: [
        {
            environment: 'default',
            timestamp: '2021-10-07 10:00:00',
            yes: 250,
            no: 60,
        },
        {
            environment: 'production',
            timestamp: '2021-10-07 10:00:00',
            yes: 200,
            no: 500,
        },
        {
            environment: 'development',
            timestamp: '2021-10-07 10:00:00',
            yes: 0,
            no: 0,
        },
    ],
    seenApplications: ['web', 'backend-api', 'commerce'],
};

const FeatureOverview = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div>
                <FeatureViewMetaData />
                <FeatureOverviewTags />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.trafficContainer}>
                    <FeatureOverviewMetrics />
                </div>
                <FeatureOverviewStrategies />
            </div>
        </div>
    );
};

export default FeatureOverview;
