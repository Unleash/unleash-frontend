import { VFC } from 'react';
import PermissionSwitch from 'component/common/PermissionSwitch/PermissionSwitch';
import { UPDATE_STRATEGY } from 'component/providers/AccessProvider/permissions';
import { Tooltip } from '@mui/material';

interface IStrategySwitchProps {
    deprecated: boolean;
    onToggle: (state: boolean) => void;
    disabled?: boolean;
}

export const StrategySwitch: VFC<IStrategySwitchProps> = ({
    deprecated,
    disabled,
    onToggle,
}) => {
    const onClick = () => {
        onToggle(deprecated);
    };

    return (
        <Tooltip
            title={
                deprecated
                    ? 'Excluded from strategy list'
                    : 'Included in strategy list'
            }
            arrow
        >
            <PermissionSwitch
                checked={!deprecated}
                permission={UPDATE_STRATEGY}
                onClick={onClick}
                disabled={disabled}
            />
        </Tooltip>
    );
};
