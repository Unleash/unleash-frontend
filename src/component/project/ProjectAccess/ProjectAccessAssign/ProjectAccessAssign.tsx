import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import {
    Autocomplete,
    Button,
    capitalize,
    Checkbox,
    styled,
    TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import useToast from 'hooks/useToast';
import useProjectAccess, {
    ENTITY_TYPE,
    IProjectAccess,
} from 'hooks/api/getters/useProjectAccess/useProjectAccess';
import { IProjectRole } from 'interfaces/role';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import FormTemplate from 'component/common/FormTemplate/FormTemplate';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { SidebarModal } from 'component/common/SidebarModal/SidebarModal';
import { formatUnknownError } from 'utils/formatUnknownError';
import { IUser } from 'interfaces/user';
import { IGroup } from 'interfaces/group';
import { useUsers } from 'hooks/api/getters/useUsers/useUsers';
import { useGroups } from 'hooks/api/getters/useGroups/useGroups';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { ProjectRoleDescription } from './ProjectRoleDescription/ProjectRoleDescription';
import { useAccess } from '../../../../hooks/api/getters/useAccess/useAccess';

const StyledForm = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

const StyledInputDescription = styled('p')(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const StyledAutocompleteWrapper = styled('div')(({ theme }) => ({
    '& > div:first-of-type': {
        width: '100%',
        maxWidth: theme.spacing(50),
        marginBottom: theme.spacing(2),
    },
}));

const StyledButtonContainer = styled('div')(() => ({
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
}));

const StyledCancelButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(3),
}));

const StyledGroupOption = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& > span:last-of-type': {
        color: theme.palette.text.secondary,
    },
}));

const StyledUserOption = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& > span:first-of-type': {
        color: theme.palette.text.secondary,
    },
}));

const StyledRoleOption = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& > span:last-of-type': {
        fontSize: theme.fontSizes.smallerBody,
        color: theme.palette.text.secondary,
    },
}));

interface IAccessOption {
    id: number;
    entity: IUser | IGroup;
    type: ENTITY_TYPE;
}

interface IProjectAccessAssignProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selected?: IProjectAccess;
    accesses: IProjectAccess[];
    roles: IProjectRole[];
    entityType: string;
}

export const ProjectAccessAssign = ({
    open,
    setOpen,
    selected,
    accesses,
    roles,
    entityType,
}: IProjectAccessAssignProps) => {
    const projectId = useRequiredPathParam('projectId');
    const { refetchProjectAccess } = useProjectAccess(projectId);
    const { addAccessToProject, changeUserRole, changeGroupRole, loading } =
        useProjectApi();
    const { users = [], groups = [] } = useAccess();
    const edit = Boolean(selected);

    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();

    const [selectedOptions, setSelectedOptions] = useState<IAccessOption[]>([]);
    const [role, setRole] = useState<IProjectRole | null>(
        roles.find(({ id }) => id === selected?.entity.roleId) ?? null
    );

    useEffect(() => {
        setRole(roles.find(({ id }) => id === selected?.entity.roleId) ?? null);
    }, [roles, selected]);

    const payload = useMemo(
        () => ({
            users: selectedOptions
                ?.filter(({ type }) => type === ENTITY_TYPE.USER)
                .map(({ id }) => ({ id })),
            groups: selectedOptions
                ?.filter(({ type }) => type === ENTITY_TYPE.GROUP)
                .map(({ id }) => ({ id })),
        }),
        [selectedOptions]
    );

    const options = useMemo(
        () => [
            ...groups
                .filter(
                    (group: IGroup) =>
                        edit ||
                        !accesses.some(
                            ({ entity: { id }, type }) =>
                                group.id === id && type === ENTITY_TYPE.GROUP
                        )
                )
                .map((group: IGroup) => ({
                    id: group.id,
                    entity: group,
                    type: ENTITY_TYPE.GROUP,
                })),
            ...users
                .filter(
                    (user: IUser) =>
                        edit ||
                        !accesses.some(
                            ({ entity: { id }, type }) =>
                                user.id === id && type === ENTITY_TYPE.USER
                        )
                )
                .map((user: IUser) => ({
                    id: user.id,
                    entity: user,
                    type: ENTITY_TYPE.USER,
                })),
        ],
        [users, accesses, edit, groups]
    );

    useEffect(() => {
        const selectedOption =
            options.filter(
                ({ id, type }) =>
                    id === selected?.entity.id && type === selected?.type
            ) || [];
        setSelectedOptions(selectedOption);
        setRole(roles.find(({ id }) => id === selected?.entity.roleId) || null);
    }, [open, selected, options, roles]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!role) return;

        try {
            if (!edit) {
                await addAccessToProject(projectId, role.id, payload);
            } else if (selected?.type === ENTITY_TYPE.USER) {
                await changeUserRole(projectId, role.id, selected.entity.id);
            } else if (selected?.type === ENTITY_TYPE.GROUP) {
                await changeGroupRole(projectId, role.id, selected.entity.id);
            }
            refetchProjectAccess();
            setOpen(false);
            setToastData({
                title: `${selectedOptions.length} ${
                    selectedOptions.length === 1 ? 'access' : 'accesses'
                } ${!edit ? 'assigned' : 'edited'} successfully`,
                type: 'success',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };

    const formatApiCode = () => {
        if (edit) {
            return `curl --location --request ${edit ? 'PUT' : 'POST'} '${
                uiConfig.unleashUrl
            }/api/admin/projects/${projectId}/${
                selected?.type === ENTITY_TYPE.USER ? 'users' : 'groups'
            }/${selected?.entity.id}/roles/${role?.id}' \\
            --header 'Authorization: INSERT_API_KEY'`;
        }
        return `curl --location --request ${edit ? 'PUT' : 'POST'} '${
            uiConfig.unleashUrl
        }/api/admin/projects/${projectId}/role/${role?.id}/access' \\
        --header 'Authorization: INSERT_API_KEY' \\
        --header 'Content-Type: application/json' \\
        --data-raw '${JSON.stringify(payload, undefined, 2)}'`;
    };

    const renderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: IAccessOption,
        selected: boolean
    ) => {
        let optionGroup;
        let optionUser;
        if (option.type === ENTITY_TYPE.GROUP) {
            optionGroup = option.entity as IGroup;
        } else {
            optionUser = option.entity as IUser;
        }
        return (
            <li {...props}>
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                <ConditionallyRender
                    condition={option.type === ENTITY_TYPE.GROUP}
                    show={
                        <StyledGroupOption>
                            <span>{optionGroup?.name}</span>
                            <span>{optionGroup?.userCount} users</span>
                        </StyledGroupOption>
                    }
                    elseShow={
                        <StyledUserOption>
                            <span>
                                {optionUser?.name || optionUser?.username}
                            </span>
                            <span>{optionUser?.email}</span>
                        </StyledUserOption>
                    }
                />
            </li>
        );
    };

    const renderRoleOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: IProjectRole
    ) => (
        <li {...props}>
            <StyledRoleOption>
                <span>{option.name}</span>
                <span>{option.description}</span>
            </StyledRoleOption>
        </li>
    );

    return (
        <SidebarModal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            label={`${!edit ? 'Assign' : 'Edit'} ${entityType} access`}
        >
            <FormTemplate
                loading={loading}
                modal
                title={`${!edit ? 'Assign' : 'Edit'} ${entityType} access`}
                description="Custom project roles allow you to fine-tune access rights and permissions within your projects."
                documentationLink="https://docs.getunleash.io/how-to/how-to-create-and-assign-custom-project-roles"
                documentationLinkLabel="Project access documentation"
                formatApiCode={formatApiCode}
            >
                <StyledForm onSubmit={handleSubmit}>
                    <div>
                        <StyledInputDescription>
                            Select the {entityType}
                        </StyledInputDescription>
                        <StyledAutocompleteWrapper>
                            <Autocomplete
                                size="small"
                                multiple
                                limitTags={10}
                                disableCloseOnSelect
                                disabled={edit}
                                value={selectedOptions}
                                onChange={(event, newValue, reason) => {
                                    if (
                                        event.type === 'keydown' &&
                                        (event as React.KeyboardEvent).key ===
                                            'Backspace' &&
                                        reason === 'removeOption'
                                    ) {
                                        return;
                                    }
                                    setSelectedOptions(newValue);
                                }}
                                options={options}
                                groupBy={option => option.type}
                                renderOption={(props, option, { selected }) =>
                                    renderOption(props, option, selected)
                                }
                                getOptionLabel={(option: IAccessOption) => {
                                    if (option.type === ENTITY_TYPE.USER) {
                                        const optionUser =
                                            option.entity as IUser;
                                        return (
                                            optionUser.email ||
                                            optionUser.name ||
                                            optionUser.username ||
                                            ''
                                        );
                                    } else {
                                        return option.entity.name;
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={capitalize(entityType)}
                                    />
                                )}
                            />
                        </StyledAutocompleteWrapper>
                        <StyledInputDescription>
                            Select the role to assign for this project
                        </StyledInputDescription>
                        <StyledAutocompleteWrapper>
                            <Autocomplete
                                size="small"
                                value={role}
                                onChange={(_, newValue) => setRole(newValue)}
                                options={roles}
                                renderOption={renderRoleOption}
                                getOptionLabel={option => option.name}
                                renderInput={params => (
                                    <TextField {...params} label="Role" />
                                )}
                            />
                        </StyledAutocompleteWrapper>
                        <ConditionallyRender
                            condition={Boolean(role?.id)}
                            show={<ProjectRoleDescription roleId={role?.id!} />}
                        />
                    </div>

                    <StyledButtonContainer>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Assign {entityType}
                        </Button>
                        <StyledCancelButton
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </StyledCancelButton>
                    </StyledButtonContainer>
                </StyledForm>
            </FormTemplate>
        </SidebarModal>
    );
};
