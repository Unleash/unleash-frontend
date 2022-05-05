import { useStyles } from './FeatureSeenCell.styles';
import TimeAgo from 'react-timeago';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Tooltip } from '@mui/material';
import React from 'react';

function generateUnit(unit?: string): string {
    switch (unit) {
        case 'second':
            return 's';
        case 'minute':
            return 'm';
        case 'hour':
            return 'h';
        case 'day':
            return 'D';
        case 'week':
            return 'W';
        case 'month':
            return 'M';
        case 'year':
            return 'Y';
        default:
            return '';
    }
}

function getColor(unit?: string): string {
    // FIXME: theme
    switch (unit) {
        case 'second':
            return '#98E3AF';
        case 'minute':
            return '#98E3AF';
        case 'hour':
            return '#98E3AF';
        case 'day':
            return '#98E3AF';
        case 'week':
            return '#ECD875';
        case 'month':
            return '#F5A69A';
        case 'year':
            return '#F5A69A';
        default:
            return '#F7F7FA'; // grey-30
    }
}

interface IFeatureSeenCellProps {
    value?: string | Date | null;
}

export const FeatureSeenCell = ({
    value: lastSeenAt,
}: IFeatureSeenCellProps) => {
    const { classes: styles } = useStyles();

    const Wrapper = (
        props: React.PropsWithChildren<{ color: string; toolTip: string }>
    ) => (
        <Tooltip title={props.toolTip} arrow>
            <div
                className={styles.container}
                style={{ background: props.color }}
                data-loading
            >
                {props.children}
            </div>
        </Tooltip>
    );

    return (
        <ConditionallyRender
            condition={Boolean(lastSeenAt)}
            show={
                <TimeAgo
                    date={lastSeenAt!}
                    title=""
                    live={false}
                    formatter={(
                        value: number,
                        unit: string,
                        suffix: string
                    ) => {
                        return (
                            <Wrapper
                                toolTip={`Last usage reported ${value} ${unit}${
                                    value !== 1 ? 's' : ''
                                } ${suffix}`}
                                color={getColor(unit)}
                            >
                                {value}
                                {generateUnit(unit)}
                            </Wrapper>
                        );
                    }}
                />
            }
            elseShow={
                <Wrapper
                    toolTip="No usage reported from connected applications"
                    color={getColor()}
                >
                    &ndash;
                </Wrapper>
            }
        />
    );
};
