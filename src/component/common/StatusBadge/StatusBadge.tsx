import { styled, useTheme } from '@mui/material';
import { ReactNode } from 'react';

const StyledStatusBadge = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5, 1),
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'inline-block',
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1.5),
    fontSize: theme.fontSizes.smallerBody,
    lineHeight: 1,
}));

interface IStatusBadgeProps {
    severity: 'success' | 'warning' | 'disabled' | 'primary';
    className?: string;
    children: ReactNode;
}

export const StatusBadge = ({
    severity,
    className,
    children,
}: IStatusBadgeProps) => {
    const theme = useTheme();
    const background = theme.palette.statusBadge[severity];
    const color =
        severity === 'disabled' ? theme.palette.text.secondary : undefined;
    const border =
        severity === 'disabled'
            ? `1px solid ${theme.palette.dividerAlternative}`
            : undefined;

    return (
        <StyledStatusBadge
            sx={{ background, color, border }}
            className={className}
        >
            {children}
        </StyledStatusBadge>
    );
};
