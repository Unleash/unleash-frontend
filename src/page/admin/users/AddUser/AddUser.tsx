import { useState } from 'react';
import Dialogue from '../../../../component/common/Dialogue';
import IRole from '../../../../interfaces/role';
import AddUserForm from './AddUserForm/AddUserForm';

interface IAddUserProps {
    showDialog: boolean;
    closeDialog: () => void;
    addUser: (data: any) => any;
    validatePassword: () => boolean;
    roles: IRole[];
}

interface IAddUserFormData {
    name: string;
    email: string;
    rootRole: number;
}

const EDITOR_ROLE_ID = 2;

const initialData = { email: '', name: '', rootRole: EDITOR_ROLE_ID };

const AddUser = ({
    showDialog,
    closeDialog,
    addUser,
    roles,
}: IAddUserProps) => {
    const [data, setData] = useState<IAddUserFormData>(initialData);
    const [error, setError] = useState({});

    const submit = async (e: Event) => {
        e.preventDefault();
        if (!data.email) {
            setError({ general: 'You must specify the email address' });
            return;
        }

        if (!data.rootRole) {
            setError({ general: 'You must specify a role for the user' });
            return;
        }

        try {
            await addUser(data);
            setData(initialData);
            setError({});
            closeDialog();
        } catch (error) {
            const msg = error.message || 'Could not create user';
            setError({ general: msg });
        }
    };

    const onCancel = (e: Event) => {
        e.preventDefault();
        setData(initialData);
        setError({});
        closeDialog();
    };

    return (
        <Dialogue
            onClick={e => {
                submit(e);
            }}
            open={showDialog}
            onClose={onCancel}
            primaryButtonText="Add user"
            secondaryButtonText="Cancel"
            title="Add team member"
            fullWidth
        >
            <AddUserForm
                data={data}
                setData={setData}
                roles={roles}
                submit={submit}
                error={error}
            />
        </Dialogue>
    );
};

export default AddUser;
