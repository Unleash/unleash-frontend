import React, { useEffect, useState } from 'react';
import {
    TextField,
    CircularProgress,
    Grid,
    Button,
    InputAdornment,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';
import ProjectRoleSelect from '../ProjectRoleSelect/ProjectRoleSelect';
import useProjectApi from '../../../../hooks/api/actions/useProjectApi/useProjectApi';
import { useParams } from 'react-router-dom';
import useToast from '../../../../hooks/useToast';
import useProjectAccess from '../../../../hooks/api/getters/useProjectAccess/useProjectAccess';
import IRole from '../../../../interfaces/role';
import { IUser } from '../../../../interfaces/user';
import { E } from '../../../common/flags';

interface IProjectAccessAddUserProps {
    roles: IRole[];
}

const ProjectAccessAddUser = ({ roles }: IProjectAccessAddUserProps) => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState();
    const [role, setRole] = useState<IRole>({
        id: -1,
        name: '',
        project: '',
        description: '',
        type: '',
    });
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState(false);
    const { setToastData } = useToast();
    const { refetchProjectAccess, access } = useProjectAccess(id);

    const { searchProjectUser, addUserToRole } = useProjectApi();

    useEffect(() => {
        if (roles.length > 0) {
            const regularRole = roles.find(
                r => r.name.toLowerCase() === 'regular'
            );
            setRole(regularRole || roles[0]);
        }
    }, [roles]);

    const search = async (q: string) => {
        if (q.length > 1) {
            setLoading(true);
            // TODO: Do not hard-code fetch here.
            const result = await searchProjectUser(q);
            const users = await result.json();
            const filtredUsers = users.filter((selectedUser: IUser) => {
                const selected = access.users.find(
                    (user: IUser) => user.id === selectedUser.id
                );
                return selected ? false : true;
            });
            setOptions(filtredUsers);
        } else {
            setOptions([]);
        }
        setLoading(false);
    };

    const handleQueryUpdate = (evt: { target: { value: string } }) => {
        const q = evt.target.value;
        search(q);
        if (options.length === 1) {
            setSelect(true);
            return;
        }
        setSelect(false);
    };

<<<<<<< HEAD
    const handleSelectUser = (evt, selectedUser) => {
=======
    const handleSelectUser = (evt: Event, value) => {
>>>>>>> 0bbcaaf6 (fix: remove some ts errors)
        setOptions([]);
        if (selectedUser?.id) {
            setUser(selectedUser);
        }
    };

    const handleRoleChange = evt => {
        const roleId = +evt.target.value;
        const role = roles.find(r => r.id === roleId);
        setRole(role);
    };

    const handleSubmit = async (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        try {
            await addUserToRole(id, role.id, user.id);
            refetchProjectAccess();
            setUser(undefined);
            setOptions([]);
            setToastData({
                type: 'success',
                title: 'Added user to project',
                text: `User added to the project with the role of ${role.name}`,
            });
        } catch (e: any) {
            let error;

            if (
                e
                    .toString()
                    .includes(`User already has access to project=${id}`)
            ) {
                error = `User already has access to project ${id}`;
            } else {
                error = e.toString() || 'Server problems when adding users.';
            }
            setToastData({
                type: 'error',
                title: error,
            });
        }
    };

    return (
        <>
            <Alert severity="info" style={{ marginBottom: '20px' }}>
                The user must have an Unleash root role before added to the
                project.
            </Alert>
            <Grid container spacing={3} alignItems="flex-end">
                <Grid item>
                    <Autocomplete
                        id="add-user-component"
                        style={{ width: 300 }}
                        noOptionsText="No users found."
                        onChange={handleSelectUser}
                        autoSelect={select}
                        value={user || ''}
                        freeSolo
                        getOptionSelected={() => true}
                        filterOptions={o => o}
                        getOptionLabel={option => {
                            if (option) {
                                return `${option.name || '(Empty name)'} <${
                                    option.email || option.username
                                }>`;
                            } else return '';
                        }}
                        options={options}
                        loading={loading}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="User"
                                variant="outlined"
                                size="small"
                                name="search"
                                onChange={handleQueryUpdate}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item>
                    <ProjectRoleSelect
                        labelId="add-user-select-role-label"
                        id="add-user-select-role"
                        placeholder="Project role"
                        value={role.id || ''}
                        onChange={handleRoleChange}
                        roles={roles}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!user}
                        onClick={handleSubmit}
                    >
                        Add user
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectAccessAddUser;
