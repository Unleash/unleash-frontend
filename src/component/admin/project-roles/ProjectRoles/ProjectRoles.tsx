import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AccessContext from '../../../../contexts/AccessContext';
import ConditionallyRender from '../../../common/ConditionallyRender';
import HeaderTitle from '../../../common/HeaderTitle';
import PageContent from '../../../common/PageContent';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import AdminMenu from '../../menu/AdminMenu';
import { useStyles } from './ProjectRoles.styles';
import ProjectRoleList from './ProjectRoleList/ProjectRoleList';
import UnleashContext from '../../../../contexts/UnleashContext';

const ProjectRoles = () => {
    const { hasAccess } = useContext(AccessContext);
    const { isEnabled } = useContext(UnleashContext);

    const styles = useStyles();
    const history = useHistory();

    return (
        <div>
            <AdminMenu history={history} />
            <PageContent
                bodyClass={styles.rolesListBody}
                headerContent={
                    <HeaderTitle
                        title="Project Roles"
                        actions={
                            <ConditionallyRender
                                condition={hasAccess(ADMIN)}
                                show={
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            history.push(
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
                    condition={hasAccess(ADMIN) && isEnabled('project-roles')}
                    show={<ProjectRoleList />}
                    elseShow={
                        <div>
                            {' '}
                            <h3
                                style={{
                                    marginBottom: '1rem',
                                    maxWidth: '600px',
                                    fontWeight: 'normal',
                                }}
                            >
                                This is a paid feature. If you want access to
                                project roles, this will upgrade you to an
                                enterprise plan. Based on your current number of
                                users this will cost you X amount per month:
                            </h3>
                            <Button color="primary" variant="contained">
                                Upgrade to enterprise
                            </Button>
                        </div>
                    }
                />
            </PageContent>
        </div>
    );
};

export default ProjectRoles;
