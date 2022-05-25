import { VFC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface IDateCellProps {
    children?: ReactNode;
}

export const TextCell: VFC<IDateCellProps> = ({ children }) => {
    return (
        <Box data-loading sx={{ py: 1.5, px: 2 }}>
            <Box
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
