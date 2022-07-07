import React from 'react';
import { Chip } from '@mui/material';
import { TextCell } from '../../common/Table/cells/TextCell/TextCell';
import { colors } from '../../../themes/colors';
import { ReactComponent as FeatureEnabledIcon } from 'assets/icons/isenabled-true.svg';
import { ReactComponent as FeatureDisabledIcon } from 'assets/icons/isenabled-false.svg';

interface Props {
    enabled: boolean;
}

export const FeatureStatusCell = ({ enabled }: Props) => {
    const bgColor = enabled ? colors.green['100'] : colors.red['200'];
    const color = enabled ? colors.green['700'] : colors.red['700'];

    const icon = enabled ? (
        <FeatureEnabledIcon stroke={colors.green['600']} stroke-width="0.25" />
    ) : (
        <FeatureDisabledIcon stroke={colors.red['700']} stroke-width="0.25" />
    );
    const label = enabled ? 'True' : 'False';

    return (
        <TextCell>
            <Chip
                icon={icon}
                label={label}
                color={enabled ? 'success' : 'error'}
                sx={{
                    width: 70,
                    borderRadius: '5px',
                    border: `1px solid ${color}`,
                    backgroundColor: bgColor,
                    ['& .MuiChip-label']: {
                        color: color,
                    },
                    ['& .MuiChip-icon']: {
                        color: color,
                    },
                }}
            />
        </TextCell>
    );
};
