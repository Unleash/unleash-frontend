import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    TextField,
    CircularProgress,
    Grid,
    Button,
    InputAdornment,
    SelectChangeEvent,
} from '@mui/material';
import {Search} from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import {ProjectRoleSelect} from '../ProjectRoleSelect/ProjectRoleSelect';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import useToast from 'hooks/useToast';
import useProjectAccess, {
    IProjectAccessUser,
} from 'hooks/api/getters/useProjectAccess/useProjectAccess';
import {IProjectRole} from 'interfaces/role';
import {ConditionallyRender} from 'component/common/ConditionallyRender/ConditionallyRender';
import {useRequiredPathParam} from 'hooks/useRequiredPathParam';
import {CreateUnleashContext} from "../../../context/CreateUnleashContext/CreateUnleashContext";
import {SidebarModal} from "../../../common/SidebarModal/SidebarModal";
import FormTemplate from "../../../common/FormTemplate/FormTemplate";
import {ContextForm} from "../../../context/ContextForm/ContextForm";
import {CreateButton} from "../../../common/CreateButton/CreateButton";
import {CREATE_CONTEXT_FIELD} from "../../../providers/AccessProvider/permissions";
import useUiConfig from "../../../../hooks/api/getters/useUiConfig/useUiConfig";
import {ProjectAccessAssignForm} from "./ProjectAccessAssignForm/ProjectAccessAssignForm";
import {useUsers} from "../../../../hooks/api/getters/useUsers/useUsers";
import {useGroupForm} from "../../../admin/groups/hooks/useGroupForm";
import {useProjectAccessForm} from "../../hooks/useProjectAccessForm";
import {formatUnknownError} from "../../../../utils/formatUnknownError";

interface IProjectAccessAddUserProps {
    roles: IProjectRole[];
    modal?: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

export const ProjectAccessAssign = ({roles, modal, onCancel}: IProjectAccessAddUserProps) => {
    const projectId = useRequiredPathParam('projectId');
    const [user, setUser] = useState<IProjectAccessUser | undefined>();
    const [role, setRole] = useState<IProjectRole | undefined>();
    const [options, setOptions] = useState<IProjectAccessUser[]>([]);
    const [loading, setLoading] = useState(false);
    const {setToastData} = useToast();
    const [open, setOpen] = useState(false);
    const {refetchProjectAccess, access} = useProjectAccess(projectId);
    const {uiConfig} = useUiConfig();

    const {searchProjectUser, addUserToRole} = useProjectApi();

    useEffect(() => {
        if (roles.length > 0) {
            const regularRole = roles.find(
                r => r.name.toLowerCase() === 'regular'
            );
            setRole(regularRole || roles[0]);
        }
    }, [roles]);

    const {
        setGroups,
        groups,
        users,
        setUsers,
        getProjectAccessPayload,
        clearErrors,
        errors,
    } = useProjectAccessForm();


    const handleBlur = () => {
        if (options.length > 0) {
            const user = options[0];
            setUser(user);
        }
    };

    const handleSelectUser = (
        evt: ChangeEvent<{}>,
        selectedUser: string | IProjectAccessUser | null
    ) => {
        setOptions([]);

        if (typeof selectedUser === 'string' || selectedUser === null) {
            return;
        }

        if (selectedUser?.id) {
            setUser(selectedUser);
        }
    };

    const handleRoleChange = (evt: SelectChangeEvent) => {
        const roleId = Number(evt.target.value);
        const role = roles.find(role => role.id === roleId);
        if (role) {
            setRole(role);
        }
    };

    const getOptionLabel = (option: IProjectAccessUser | string) => {
        if (option && typeof option !== 'string') {
            return `${option.name || option.username || '(Empty name)'} <${
                option.email || option.username
            }>`;
        } else return '';
    };


    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/projects/:projectId/role/:roleId/access' \\
        --header 'Authorization: INSERT_API_KEY' \\
        --header 'Content-Type: application/json' \\
        --data-raw '${JSON.stringify(getProjectAccessPayload(), undefined, 2)}'`;
    };
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();

        const payload = getProjectAccessPayload();
        try {
            // const group = await createGroup(payload);
            // navigate(`/admin/groups/${group.id}`);
            setToastData({
                title: 'Permissions assigned successfully',
                text: 'Now you can start using your group.',
                confetti: true,
                type: 'success',
            });
        } catch (error: unknown) {
            // setToastApiError(formatUnknownError(error));
        }
    };


    return (
        <FormTemplate
            loading={loading}
            title="Assign user / group"
            description="Text about user and group access"
            documentationLink="https://docs.getunleash.io"
            documentationLinkLabel="Learn more"
            formatApiCode={formatApiCode}
            modal={modal}
        >
            <ProjectAccessAssignForm
                // errors={errors}
                handleSubmit={handleSubmit}
                roles={roles}
                handleCancel={onCancel}
                // contextName={contextName}
                // setContextName={setContextName}
                // contextDesc={contextDesc}
                // setContextDesc={setContextDesc}
                // legalValues={legalValues}
                // setLegalValues={setLegalValues}
                // stickiness={stickiness}
                // setStickiness={setStickiness}
                // mode="Create"
                // validateContext={validateContext}
                // setErrors={setErrors}
                // clearErrors={clearErrors}
            >
            </ProjectAccessAssignForm>
        </FormTemplate>
    );

    // return (
    //     <>
    //         <Grid container spacing={3} alignItems="flex-end">
    //             {/*<Grid item>*/}
    //             {/*    <Autocomplete*/}
    //             {/*        id="add-user-component"*/}
    //             {/*        style={{ width: 300 }}*/}
    //             {/*        noOptionsText="No users found."*/}
    //             {/*        onChange={handleSelectUser}*/}
    //             {/*        onBlur={() => handleBlur()}*/}
    //             {/*        value={user || ''}*/}
    //             {/*        freeSolo*/}
    //             {/*        isOptionEqualToValue={() => true}*/}
    //             {/*        filterOptions={o => o}*/}
    //             {/*        getOptionLabel={getOptionLabel}*/}
    //             {/*        options={options}*/}
    //             {/*        loading={loading}*/}
    //             {/*        renderInput={params => (*/}
    //             {/*            <TextField*/}
    //             {/*                {...params}*/}
    //             {/*                label="User"*/}
    //             {/*                variant="outlined"*/}
    //             {/*                size="small"*/}
    //             {/*                name="search"*/}
    //             {/*                onChange={handleQueryUpdate}*/}
    //             {/*                InputProps={{*/}
    //             {/*                    ...params.InputProps,*/}
    //             {/*                    startAdornment: (*/}
    //             {/*                        <InputAdornment position="start">*/}
    //             {/*                            <Search />*/}
    //             {/*                        </InputAdornment>*/}
    //             {/*                    ),*/}
    //             {/*                    endAdornment: (*/}
    //             {/*                        <>*/}
    //             {/*                            <ConditionallyRender*/}
    //             {/*                                condition={loading}*/}
    //             {/*                                show={*/}
    //             {/*                                    <CircularProgress*/}
    //             {/*                                        color="inherit"*/}
    //             {/*                                        size={20}*/}
    //             {/*                                    />*/}
    //             {/*                                }*/}
    //             {/*                            />*/}
    //
    //             {/*                            {params.InputProps.endAdornment}*/}
    //             {/*                        </>*/}
    //             {/*                    ),*/}
    //             {/*                }}*/}
    //             {/*            />*/}
    //             {/*        )}*/}
    //             {/*    />*/}
    //             {/*</Grid>*/}
    //             {/*<Grid item>*/}
    //             {/*    <ProjectRoleSelect*/}
    //             {/*        labelId="add-user-select-role-label"*/}
    //             {/*        id="add-user-select-role"*/}
    //             {/*        placeholder="Project role"*/}
    //             {/*        value={role?.id || -1}*/}
    //             {/*        onChange={handleRoleChange}*/}
    //             {/*        roles={roles}*/}
    //             {/*    />*/}
    //             {/*</Grid>*/}
    //
    //         </Grid>
    //     </>
    // );
};
