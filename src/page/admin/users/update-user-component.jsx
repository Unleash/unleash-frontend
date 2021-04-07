import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialogue from '../../../component/common/Dialogue';
import {
    TextField,
    DialogTitle,
    DialogContent,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
} from '@material-ui/core';
import commonStyles from '../../../component/common/common.module.scss';

function AddUser({ user, showDialog, closeDialog, updateUser }) {
    const [data, setData] = useState({
        id: user.id,
        email: user.email || '',
        rootRole: user.rootRole,
        name: user.name || '',
    });
    const [error, setError] = useState({});

    if (!user) {
        return null;
    }

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const submit = async e => {
        e.preventDefault();

        try {
            await updateUser(data);
            closeDialog();
        } catch (error) {
            setError({ general: 'Could not update user' });
        }
    };

    const onCancel = e => {
        e.preventDefault();
        closeDialog();
    };

    return (
        <Dialogue
            onClick={e => {
                submit(e);
            }}
            open={showDialog}
            onClose={onCancel}
            primaryButtonText="Update user"
            secondaryButtonText="Cancel"
        >
            <form onSubmit={submit}>
                <DialogTitle>Edit user</DialogTitle>

                <DialogContent
                    className={commonStyles.contentSpacing}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <p>{error.general}</p>
                    <TextField
                        label="Full name"
                        name="name"
                        value={data.name}
                        error={error.name}
                        type="name"
                        variant="outlined"
                        size="small"
                        onChange={updateField}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        contentEditable="false"
                        editable="false"
                        readOnly
                        value={data.email}
                        variant="outlined"
                        size="small"
                        type="email"
                    />
                    <br />
                    <br />
                    <FormControl>
                        <FormLabel component="legend">Root Role</FormLabel>
                        <RadioGroup name="rootRole" value={data.rootRole} onChange={updateField}>
                            <FormControlLabel label="Regular" control={<Radio />} value="Regular" />
                            <FormControlLabel label="Admin" control={<Radio />} value="Admin" />
                            <FormControlLabel label="Read-only" control={<Radio />} value="Read" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
            </form>
        </Dialogue>
    );
}

AddUser.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object,
};

export default AddUser;
