import { useParams } from 'react-router';
import { IFeatureViewParams } from '../../../../interfaces/params';
import { useFeatureMetricsRaw } from '../../../../hooks/api/getters/useFeatureMetricsRaw/useFeatureMetricsRaw';
import PageContent from '../../../common/PageContent';
import { useEffect, useMemo, useState } from 'react';
import { FeatureMetricsEnvironment } from './FeatureMetricsEnvironment';
import { FeatureMetricsApplication } from './FeatureMetricsApplication';
import { FeatureMetricsHours } from './FeatureMetricsHours';
import { IFeatureMetricsRaw } from '../../../../interfaces/featureToggle';
import { Box, Grid } from '@material-ui/core';
import { FeatureMetricsContent } from './FeatureMetricsContent';
import { useQueryStringNumberState } from '../../../../hooks/useQueryStringNumberState';
import { useQueryStringState } from '../../../../hooks/useQueryStringState';

export const FeatureMetrics = () => {
    const defaultHoursBack = 48;
    const [hoursBack = defaultHoursBack, setHoursBack] =
        useQueryStringNumberState('hoursBack');

    const { featureId } = useParams<IFeatureViewParams>();
    const { featureMetrics } = useFeatureMetricsRaw(featureId, hoursBack);

    // Keep a cache of the fetched metrics so that we can
    // show the cached result while fetching new metrics.
    const [cachedMetrics, setCachedMetrics] = useState<
        Readonly<IFeatureMetricsRaw[]> | undefined
    >(featureMetrics);

    useEffect(() => {
        featureMetrics && setCachedMetrics(featureMetrics);
    }, [featureMetrics]);

    const defaultEnvironment = cachedMetrics?.[0]?.environment;
    const defaultApplication = cachedMetrics?.[0]?.appName;
    const [environment = defaultEnvironment, setEnvironment] =
        useQueryStringState('environment');
    const [application = defaultApplication, setApplication] =
        useQueryStringState('application');

    const environments = useMemo(() => {
        return new Set(cachedMetrics?.map(m => m.environment));
    }, [cachedMetrics]);

    const applications = useMemo(() => {
        return new Set(cachedMetrics?.map(m => m.appName));
    }, [cachedMetrics]);

    const filteredMetrics = useMemo(() => {
        return cachedMetrics
            ?.filter(m => m.environment === environment)
            .filter(m => m.appName === application);
    }, [cachedMetrics, environment, application]);

    if (!filteredMetrics) {
        return null;
    }

    return (
        <PageContent headerContent="">
            <Grid container component="header" spacing={2}>
                <Grid item xs={12} md={4}>
                    <FeatureMetricsHours
                        hoursBack={hoursBack}
                        setHoursBack={setHoursBack}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FeatureMetricsEnvironment
                        environments={environments}
                        environment={environment}
                        setEnvironment={setEnvironment}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FeatureMetricsApplication
                        applications={applications}
                        application={application}
                        setApplication={setApplication}
                    />
                </Grid>
            </Grid>
            <Box mt={4}>
                <FeatureMetricsContent
                    metrics={filteredMetrics}
                    hoursBack={hoursBack}
                />
            </Box>
        </PageContent>
    );
};

export default FeatureMetrics;