import { Box, Tooltip, useTheme } from '@mui/material';
import { ReactComponent as NegatedIcon } from 'assets/icons/24_Negator.svg';
import { ReactComponent as NegatedIconOff } from 'assets/icons/24_Negator off.svg';
import { IConstraint } from 'interfaces/strategy';
import {
    StyledToggleButtonOff,
    StyledToggleButtonOn,
} from '../StyledToggleButton';
import { ConditionallyRender } from '../../../../ConditionallyRender/ConditionallyRender';
import { useContext } from 'react';
import UIContext from 'contexts/UIContext';

interface InvertedOperatorButtonProps {
    localConstraint: IConstraint;
    setInvertedOperator: () => void;
}

export const InvertedOperatorButton = ({
    localConstraint,
    setInvertedOperator,
}: InvertedOperatorButtonProps) => {
    const { mode } = useContext(UIContext);
    const theme = useTheme();

    return (
        <Tooltip
            title={
                Boolean(localConstraint.inverted)
                    ? 'Remove negation'
                    : 'Negate operator'
            }
            arrow
        >
            <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                <ConditionallyRender
                    condition={Boolean(localConstraint.inverted)}
                    show={
                        <StyledToggleButtonOn
                            onClick={setInvertedOperator}
                            disableRipple
                        >
                            <ConditionallyRender
                                condition={mode === 'dark'}
                                show={
                                    <NegatedIcon
                                        style={{
                                            fill: theme.palette.background
                                                .paper,
                                        }}
                                    />
                                }
                                elseShow={<NegatedIcon />}
                            />
                        </StyledToggleButtonOn>
                    }
                    elseShow={
                        <StyledToggleButtonOff
                            onClick={setInvertedOperator}
                            disableRipple
                        >
                            <ConditionallyRender
                                condition={mode === 'dark'}
                                show={
                                    <NegatedIconOff
                                        style={{
                                            fill: theme.palette.background
                                                .paper,
                                        }}
                                    />
                                }
                                elseShow={<NegatedIconOff />}
                            />
                        </StyledToggleButtonOff>
                    }
                />
            </Box>
        </Tooltip>
    );
};
