import { VFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

interface ILinkCellProps {
    to: string;
    __search?: string;
    children?: string;
}

export const LinkCell: VFC<ILinkCellProps> = ({ children, to, __search }) => (
    <Link component={RouterLink} to={to} data-loading>
        <ConditionallyRender
            condition={Boolean(__search) && Boolean(children)}
            show={<Highlighter search={__search!}>{children!}</Highlighter>}
            elseShow={children}
        />
    </Link>
);
