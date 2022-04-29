import { VFC } from 'react';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMD, formatDateYMDHMS } from 'utils/formatDate';
import ConditionallyRender from 'component/common/ConditionallyRender';
import { Tooltip } from '@material-ui/core';

interface IDateCellProps {
    date?: Date | null;
}

export const DateCell: VFC<IDateCellProps> = ({ date }) => {
    const { locationSettings } = useLocationSettings();

    return (
        <ConditionallyRender
            condition={Boolean(date)}
            show={
                <Tooltip
                    title={formatDateYMDHMS(
                        date as Date,
                        locationSettings.locale
                    )}
                    arrow
                >
                    <span>
                        {formatDateYMD(date as Date, locationSettings.locale)}
                    </span>
                </Tooltip>
            }
        />
    );
};
