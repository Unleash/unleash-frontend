import Input from 'component/common/Input/Input';
import {TextField, Button, Switch, Typography, Autocomplete} from '@mui/material';
import {useStyles} from './ProjectAccessAssignForm.styles';
import React, {useState, useEffect} from 'react';
import {Add} from '@mui/icons-material';
import {ILegalValue} from 'interfaces/context';
import {ContextFormChip} from 'component/context/ContectFormChip/ContextFormChip';
import {ContextFormChipList} from 'component/context/ContectFormChip/ContextFormChipList';
import {CreateButton} from "../../../../common/CreateButton/CreateButton";
import {CREATE_CONTEXT_FIELD} from "../../../../providers/AccessProvider/permissions";
import {IProjectRole} from "../../../../../interfaces/role";
import {useUsers} from "../../../../../hooks/api/getters/useUsers/useUsers";
import {IUser} from "../../../../../interfaces/user";
import {useGroups} from "../../../../../hooks/api/getters/useGroups/useGroups";

interface IProjectAccessAssignForm {
    onCancel: () => void;
    roles: IProjectRole[];
}

const ENTER = 'Enter';

export const ProjectAccessAssignForm: React.FC<IProjectAccessAssignForm> = ({
                                                                                onCancel, roles
                                                                            }: IProjectAccessAssignForm) => {
    const {classes: styles} = useStyles();
    const [value, setValue] = useState('');
    const [valueDesc, setValueDesc] = useState('');
    const [valueFocused, setValueFocused] = useState(false);
    const {users} = useUsers();
    const {groups} = useGroups();
    const [selectedAssignees, setSelectedAssignees] = useState<IUser[]>([]);


    const options = [
        ...users.map(user => (
            {...user, type: 'USERS', name: user.email}
        )),
        ...groups.map(user => (
            {...user, type: 'GROUPS'}
        ))
    ]


    return (
        <form className={styles.form}>
            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    The user must have an Unleash root role before added to the project.
                </p>

                <Autocomplete
                    multiple
                    limitTags={10}
                    options={options.sort((a, b) => -b.type.localeCompare(a.type))}
                    groupBy={(option) => option.type}
                    getOptionLabel={(option) => option.name}
                    sx={{width: 300}}
                    onChange={(event, newValue, reason) => {
                        if (
                            event.type === 'keydown' &&
                            (event as React.KeyboardEvent).key === 'Backspace' &&
                            reason === 'removeOption'
                        ) {
                            return;
                        }
                        setSelectedAssignees(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="User/Group"/>}
                />
                <Autocomplete
                    options={roles}
                    getOptionLabel={(option) => option.name}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params} label="Role"/>}
                />

            </div>
            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => setOpen(true)}
                >
                    Assign user/group
                </Button>
                <Button onClick={onCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
