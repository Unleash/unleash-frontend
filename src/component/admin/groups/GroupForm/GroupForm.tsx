import { FC } from 'react';
import { Button, styled } from '@mui/material';
import { UG_DESC_ID, UG_NAME_ID } from 'utils/testIds';
import Input from 'component/common/Input/Input';
import { IGroupUser } from 'interfaces/group';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { GroupFormUsersSelect } from './GroupFormUsersSelect/GroupFormUsersSelect';
import { GroupFormUsersTable } from './GroupFormUsersTable/GroupFormUsersTable';

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

const StyledInputDescription = styled('p')(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const StyledInput = styled(Input)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.spacing(50),
    marginBottom: theme.spacing(2),
}));

const StyledButtonContainer = styled('div')(() => ({
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
}));

const StyledCancelButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(3),
}));

interface IGroupForm {
    name: string;
    description: string;
    users: IGroupUser[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setUsers: React.Dispatch<React.SetStateAction<IGroupUser[]>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: 'Create' | 'Edit';
    clearErrors: () => void;
}

export const GroupForm: FC<IGroupForm> = ({
    name,
    description,
    users,
    setName,
    setDescription,
    setUsers,
    handleSubmit,
    handleCancel,
    errors,
    mode,
    clearErrors,
    children,
}) => (
    <StyledForm onSubmit={handleSubmit}>
        <div>
            <StyledInputDescription>
                What would you like to call your group?
            </StyledInputDescription>
            <StyledInput
                autoFocus
                label="Name"
                id="group-name"
                error={Boolean(errors.name)}
                errorText={errors.name}
                onFocus={() => clearErrors()}
                value={name}
                onChange={e => setName(e.target.value)}
                data-testid={UG_NAME_ID}
            />
            <StyledInputDescription>
                How would you describe your group?
            </StyledInputDescription>
            <StyledInput
                multiline
                rows={4}
                label="Description"
                placeholder="A short description of the group"
                value={description}
                onChange={e => setDescription(e.target.value)}
                data-testid={UG_DESC_ID}
            />
            <ConditionallyRender
                condition={mode === 'Create'}
                show={
                    <>
                        <StyledInputDescription>
                            Add users to this group
                        </StyledInputDescription>
                        <GroupFormUsersSelect
                            users={users}
                            setUsers={setUsers}
                        />
                        <GroupFormUsersTable
                            users={users}
                            setUsers={setUsers}
                        />
                    </>
                }
            />
        </div>

        <StyledButtonContainer>
            {children}
            <StyledCancelButton onClick={handleCancel}>
                Cancel
            </StyledCancelButton>
        </StyledButtonContainer>
    </StyledForm>
);
