import { useParams } from 'react-router';
import { IFeatureViewParams } from '../../../../interfaces/params';
import { useFeatureMetricsRaw } from '../../../../hooks/api/getters/useFeatureMetricsRaw/useFeatureMetricsRaw';
import PageContent from '../../../common/PageContent';
import { useEffect, useMemo, useState } from 'react';
import { FeatureMetricsHours } from './FeatureMetricsHours/FeatureMetricsHours';
import { IFeatureMetricsRaw } from '../../../../interfaces/featureToggle';
import { Box, Grid, styled } from '@material-ui/core';
import { FeatureMetricsContent } from './FeatureMetricsContent/FeatureMetricsContent';
import { useQueryStringNumberState } from '../../../../hooks/useQueryStringNumberState';
import { useQueryStringState } from '../../../../hooks/useQueryStringState';
import { FeatureMetricsChips } from './FeatureMetricsChips/FeatureMetricsChips';

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
        return new Set(cachedMetrics?.map(metric => metric.environment));
    }, [cachedMetrics]);

    const applications = useMemo(() => {
        return new Set(cachedMetrics?.map(metric => metric.appName));
    }, [cachedMetrics]);

    const filteredMetrics = useMemo(() => {
        return cachedMetrics
            ?.filter(metric => metric.environment === environment)
            .filter(metric => metric.appName === application);
    }, [cachedMetrics, environment, application]);

    if (!filteredMetrics) {
        return null;
    }

    return (
        <PageContent headerContent="">
            <Grid
                container
                component="header"
                spacing={2}
                alignItems="flex-end"
            >
                <Grid item xs={12} md={5}>
                    {environments.size > 0 && (
                        <FeatureMetricsChips
                            title="Environments"
                            values={environments}
                            value={environment}
                            setValue={setEnvironment}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={5}>
                    {applications.size > 0 && (
                        <FeatureMetricsChips
                            title="Applications"
                            values={applications}
                            value={application}
                            setValue={setApplication}
                        />
                    )}
                </Grid>
                <Grid item xs={12} md={2}>
                    <MobileMarginTop>
                        <FeatureMetricsHours
                            hoursBack={hoursBack}
                            setHoursBack={setHoursBack}
                        />
                    </MobileMarginTop>
                </Grid>
            </Grid>
            <FeatureMetricsContent
                metrics={filteredMetrics}
                hoursBack={hoursBack}
            />
        </PageContent>
    );
};

const MobileMarginTop = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
    },
}));

export default FeatureMetrics;
