import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

interface ILinkCellProps {
    to: string;
}

export const LinkCell: FC<ILinkCellProps> = ({ children, to }) => (
    <Link component={RouterLink} to={to}>
        {children}
    </Link>
);
