import React from 'react';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { colors } from 'themes/colors';
import { ReactComponent as FeatureEnabledIcon } from 'assets/icons/isenabled-true.svg';
import { ReactComponent as FeatureDisabledIcon } from 'assets/icons/isenabled-false.svg';
import { Chip, styled } from '@mui/material';
import {ConditionallyRender} from "../../../common/ConditionallyRender/ConditionallyRender";

interface IFeatureStatusCellProps {
    enabled: boolean;
}

const FalseChip = styled(Chip)(() => ({
    width: 80,
    borderRadius: '5px',
    border: `1px solid ${colors.red['700']}`,
    backgroundColor: colors.red['200'],
    ['& .MuiChip-label']: {
        color: colors.red['700'],
    },
    ['& .MuiChip-icon']: {
        color: colors.red['700'],
    },
}));

const TrueChip = styled(Chip)(() => ({
    width: 80,
    borderRadius: '5px',
    border: `1px solid ${colors.green['700']}`,
    backgroundColor: colors.green['100'],
    ['& .MuiChip-label']: {
        color: colors.green['700'],
    },
    ['& .MuiChip-icon']: {
        color: colors.green['700'],
    },
}));

export const FeatureStatusCell = ({ enabled }: IFeatureStatusCellProps) => {
    const icon = (<ConditionallyRender condition={enabled}
                         show={<FeatureEnabledIcon stroke={colors.green['600']} stroke-width="0.25" />}
                         elseShow={<FeatureDisabledIcon stroke={colors.red['700']} stroke-width="0.25" />} />)

    const label = enabled ? 'True' : 'False';

    return (
        <TextCell>
            <ConditionallyRender condition={enabled}
                                 show={ <TrueChip icon={icon} label={label} />}
                                 elseShow={<FalseChip icon={icon} label={label} />} />
        </TextCell>
    );
};
