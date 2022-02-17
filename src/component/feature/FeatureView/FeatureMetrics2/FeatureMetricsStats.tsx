import { IFeatureMetricsRaw } from '../../../../interfaces/featureToggle';
import { useMemo } from 'react';
import { calculatePercentage } from '../../../../utils/calculate-percentage';
import { useStyles } from './FeatureMetricsStats.styles';
import { Grid } from '@material-ui/core';

interface IFeatureMetricsStatsRawProps {
    metrics: IFeatureMetricsRaw[];
    hoursBack: number;
}

export const FeatureMetricsStatsRaw = (props: IFeatureMetricsStatsRawProps) => {
    const totalYes = useMemo(() => {
        return props.metrics.reduce((acc, m) => acc + m.yes, 0);
    }, [props.metrics]);

    const totalNo = useMemo(() => {
        return props.metrics.reduce((acc, m) => acc + m.no, 0);
    }, [props.metrics]);

    return (
        <FeatureMetricsStats
            totalYes={totalYes}
            totalNo={totalNo}
            hoursBack={props.hoursBack}
        />
    );
};

interface IFeatureMetricsStatsProps {
    totalYes: number;
    totalNo: number;
    hoursBack: number;
}

export const FeatureMetricsStats = (props: IFeatureMetricsStatsProps) => {
    const styles = useStyles();

    const hoursSuffix =
        props.hoursBack === 1
            ? 'in the last hour'
            : `in the last ${props.hoursBack} hours`;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <article className={styles.item}>
                    <h3 className={styles.title}>Exposure</h3>
                    <p className={styles.value}>{props.totalYes}</p>
                    <p className={styles.text}>
                        Total exposure of the feature in the environment{' '}
                        {hoursSuffix}.
                    </p>
                </article>
            </Grid>
            <Grid item xs={12} sm={4}>
                <article className={styles.item}>
                    <h3 className={styles.title}>Exposure %</h3>
                    <p className={styles.value}>
                        {calculatePercentage(
                            props.totalYes + props.totalNo,
                            props.totalYes
                        )}
                        %
                    </p>
                    <p className={styles.text}>
                        % total exposure of the feature in the environment{' '}
                        {hoursSuffix}.
                    </p>
                </article>
            </Grid>
            <Grid item xs={12} sm={4}>
                <article className={styles.item}>
                    <h3 className={styles.title}>Requests</h3>
                    <p className={styles.value}>
                        {props.totalYes + props.totalNo}
                    </p>
                    <p className={styles.text}>
                        Total requests for the feature in the environment{' '}
                        {hoursSuffix}.
                    </p>
                </article>
            </Grid>
        </Grid>
    );
};
