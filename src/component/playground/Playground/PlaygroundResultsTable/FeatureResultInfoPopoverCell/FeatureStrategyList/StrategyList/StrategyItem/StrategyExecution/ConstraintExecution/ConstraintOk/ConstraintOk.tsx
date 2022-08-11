import { CheckCircleOutline } from '@mui/icons-material';
import { styled } from '@mui/material';

const StyledCheckOutline = styled(CheckCircleOutline)(({ theme }) => ({
    color: theme.palette.success.main,
}));

export const ConstraintOk = () => {
    return <StyledCheckOutline />;
};
