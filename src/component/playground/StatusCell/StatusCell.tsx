import React from 'react';
import { Chip } from '@mui/material';
import { TextCell } from '../../common/Table/cells/TextCell/TextCell';
import { colors } from '../../../themes/colors';
import { ReactComponent as FeatureEnabledIcon } from 'assets/icons/isenabled-true.svg';
import { ReactComponent as FeatureDisabledIcon } from 'assets/icons/isenabled-false.svg';

interface Props {
    enabled: boolean;
}

export const StatusCell = ({ enabled }: Props) => {
    const bgColor = enabled ? colors.green['600'] : colors.red['700'];
    const color = enabled ? colors.green['900'] : colors.red['900'];

    const icon = enabled ? <FeatureEnabledIcon /> : <FeatureDisabledIcon />;
    const label = enabled ? 'True' : 'False';

    return (
        <TextCell>
            <Chip
                icon={icon}
                label={label}
                sx={{
                    borderRadius: '5px',
                    border: `1px solid ${color}`,
                    color: color,
                    backgroundColor: bgColor,
                }}
            />
        </TextCell>
    );
};
