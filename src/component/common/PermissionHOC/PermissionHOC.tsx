import { useContext, FC, ReactElement } from 'react';
import { TooltipProps } from '@mui/material';
import AccessContext from 'contexts/AccessContext';
import { TooltipResolver } from 'component/common/TooltipResolver/TooltipResolver';
import { formatAccessText } from 'utils/formatAccessText';
import { useId } from 'hooks/useId';

type IPermissionHOCProps = Omit<TooltipProps, 'children' | 'title'> & {
    permission: string;
    projectId?: string;
    environmentId?: string;
    tooltip?: string;
    children: ({ hasAccess }: { hasAccess?: boolean }) => ReactElement;
};

const PermissionHOC: FC<IPermissionHOCProps> = ({
    permission,
    projectId,
    children,
    environmentId,
    tooltip,
    ...rest
}) => {
    const { hasAccess } = useContext(AccessContext);
    let access;

    if (projectId && environmentId) {
        access = hasAccess(permission, projectId, environmentId);
    } else if (projectId) {
        access = hasAccess(permission, projectId);
    } else {
        access = hasAccess(permission);
    }

    return (
        <TooltipResolver {...rest} title={formatAccessText(access, tooltip)}>
            {children({ hasAccess: access })}
        </TooltipResolver>
    );
};

export default PermissionHOC;
