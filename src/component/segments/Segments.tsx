import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ProjectRoleList from 'component/admin/project-roles/ProjectRoles/ProjectRoleList/ProjectRoleList';
import ConditionallyRender from 'component/common/ConditionallyRender';
import HeaderTitle from 'component/common/HeaderTitle';
import PageContent from 'component/common/PageContent';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SegmentsList } from './SegmentList/SegmentList';

export const Segment = () => {
    const { hasAccess } = useContext(AccessContext);
    const history = useHistory();
    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title="Segments"
                    actions={
                        <PermissionButton
                            onClick={() => history.push('/test')}
                            permission={ADMIN}
                        >
                            New Segment
                        </PermissionButton>
                    }
                />
            }
        >
            <SegmentsList />
        </PageContent>
    );
};
