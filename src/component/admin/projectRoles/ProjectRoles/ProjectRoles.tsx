import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessContext from 'contexts/AccessContext';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { PageContent } from 'component/common/PageContent/PageContent';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import AdminMenu from 'component/admin/menu/AdminMenu';
import { useStyles } from './ProjectRoles.styles';
import ProjectRoleList from './ProjectRoleList/ProjectRoleList';
import { AdminAlert } from 'component/common/AdminAlert/AdminAlert';

const ProjectRoles = () => {
    const { hasAccess } = useContext(AccessContext);
    const { classes: styles } = useStyles();
    const navigate = useNavigate();

    return (
        <div>
            <AdminMenu />
            <PageContent
                bodyClass={styles.rolesListBody}
                headerContent={
                    <PageHeader
                        title="Project Roles"
                        actions={
                            <ConditionallyRender
                                condition={hasAccess(ADMIN)}
                                show={
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            navigate(
                                                '/admin/create-project-role'
                                            )
                                        }
                                    >
                                        New Project role
                                    </Button>
                                }
                                elseShow={
                                    <small>
                                        PS! Only admins can add/remove roles.
                                    </small>
                                }
                            />
                        }
                    />
                }
            >
                <ConditionallyRender
                    condition={hasAccess(ADMIN)}
                    show={<ProjectRoleList />}
                    elseShow={<AdminAlert />}
                />
            </PageContent>
        </div>
    );
};

export default ProjectRoles;
