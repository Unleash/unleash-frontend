import { useContext } from 'react';
import UsersList from './UsersList/UsersList';
import AdminMenu from '../menu/AdminMenu';
import PageContent from 'component/common/PageContent/PageContent';
import AccessContext from 'contexts/AccessContext';
import ConditionallyRender from 'component/common/ConditionallyRender';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import { Alert } from '@material-ui/lab';
import HeaderTitle from 'component/common/HeaderTitle';
import { Button, IconButton } from '@material-ui/core';
import { Search, FilterList } from '@material-ui/icons';
import { useStyles } from './UserAdmin.styles';
import { useHistory } from 'react-router-dom';

const UsersAdmin = () => {
    const { hasAccess } = useContext(AccessContext);
    const history = useHistory();
    const styles = useStyles();

    return (
        <div>
            <AdminMenu />
            <PageContent
                bodyClass={styles.userListBody}
                headerContent={
                    <HeaderTitle
                        title="Users"
                        actions={
                            <ConditionallyRender
                                condition={hasAccess(ADMIN)}
                                show={
                                    <>
                                        <IconButton // TODO: Consider moving these actions to a new component. Maybe TableActions or something.
                                            aria-label="Search users"
                                            title="Search users"
                                            onClick={() => {}}
                                        >
                                            <Search />
                                        </IconButton>
                                        <IconButton
                                            aria-label="Filter users"
                                            title="Filter users"
                                            onClick={() => {}}
                                        >
                                            <FilterList />
                                        </IconButton>
                                        <div
                                            className={styles.verticalSeparator}
                                        ></div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                history.push(
                                                    '/admin/create-user'
                                                )
                                            }
                                        >
                                            New user
                                        </Button>
                                    </>
                                }
                                elseShow={
                                    <small>
                                        PS! Only admins can add/remove users.
                                    </small>
                                }
                            />
                        }
                    />
                }
            >
                <ConditionallyRender
                    condition={hasAccess(ADMIN)}
                    show={<UsersList />}
                    elseShow={
                        <Alert severity="error">
                            You need instance admin to access this section.
                        </Alert>
                    }
                />
            </PageContent>
        </div>
    );
};

export default UsersAdmin;
