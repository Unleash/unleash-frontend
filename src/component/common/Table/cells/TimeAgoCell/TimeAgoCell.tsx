import { Tooltip, Typography } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { VFC } from 'react';
import { formatDateYMD } from 'utils/formatDate';
import { TextCell } from '../TextCell/TextCell';
import TimeAgo from 'react-timeago';

interface ITimeAgoCellProps {
    value?: string | number | Date;
    emptyText?: string;
    children?: string | number | Date;
}

export const TimeAgoCell: VFC<ITimeAgoCellProps> = ({
    value,
    emptyText,
    children,
}) => {
    const { locationSettings } = useLocationSettings();

    const date = value ?? children;

    if (!date) return <TextCell>{emptyText}</TextCell>;

    return (
        <TextCell>
            <ConditionallyRender
                condition={Boolean(value || children)}
                show={
                    <Tooltip
                        title={`Last login: ${formatDateYMD(
                            date,
                            locationSettings.locale
                        )}`}
                        arrow
                    >
                        <Typography noWrap variant="body2" data-loading>
                            <TimeAgo
                                date={new Date(date)}
                                live={false}
                                title={''}
                            />
                        </Typography>
                    </Tooltip>
                }
            />
        </TextCell>
    );
};
