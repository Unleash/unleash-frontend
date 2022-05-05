import { VFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';

interface ILinkCellProps {
    to: string;
    __search?: string;
    children?: string;
}

export const LinkCell: VFC<ILinkCellProps> = ({ children, to }) => {
    const search = useSearchHighlightContext();

    return (
        <Link component={RouterLink} to={to} data-loading underline="hover">
            <ConditionallyRender
                condition={Boolean(search) && Boolean(children)}
                show={<Highlighter search={search!}>{children!}</Highlighter>}
                elseShow={children}
            />
        </Link>
    );
};
