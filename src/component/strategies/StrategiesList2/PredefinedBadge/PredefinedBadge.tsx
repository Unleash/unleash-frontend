import { styled } from '@mui/material';

export const PredefinedBadge = () => {
    return <StyledBadge>Predefined</StyledBadge>;
};

const StyledBadge = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.3, 1.25),
    backgroundColor: theme.palette.predefinedBadgeColor,
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'inline-block',
    borderRadius: '3px',
    marginLeft: '12.5px',
}));
