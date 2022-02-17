import { IFeatureMetricsRaw } from '../../../../interfaces/featureToggle';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { useLocationSettings } from '../../../../hooks/useLocationSettings';
import { formatFullDateTimeWithLocale } from '../../../common/util';
import { useMemo } from 'react';

export const FEATURE_METRICS_TABLE_ID = 'feature-metrics-table-id';

interface IFeatureMetricsTableProps {
    metrics: IFeatureMetricsRaw[];
}

export const FeatureMetricsTable = (props: IFeatureMetricsTableProps) => {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { locationSettings } = useLocationSettings();

    const sortedMetrics = useMemo(() => {
        return [...props.metrics].sort((a, b) => {
            return b.timestamp.localeCompare(a.timestamp);
        });
    }, [props.metrics]);

    if (sortedMetrics.length === 0) {
        return null;
    }

    return (
        <Table id={FEATURE_METRICS_TABLE_ID}>
            <TableHead>
                <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell hidden={smallScreen}>Application</TableCell>
                    <TableCell hidden={smallScreen}>Environment</TableCell>
                    <TableCell align="right">Requested</TableCell>
                    <TableCell align="right">Exposed</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedMetrics.map(m => (
                    <TableRow key={m.timestamp}>
                        <TableCell>
                            {formatFullDateTimeWithLocale(
                                m.timestamp,
                                locationSettings.locale
                            )}
                        </TableCell>
                        <TableCell hidden={smallScreen}>{m.appName}</TableCell>
                        <TableCell hidden={smallScreen}>
                            {m.environment}
                        </TableCell>
                        <TableCell align="right">{m.yes + m.no}</TableCell>
                        <TableCell align="right">{m.yes}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
