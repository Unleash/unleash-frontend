import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, DialogTitle, DialogContent } from '@material-ui/core';
import { trim } from '../../../component/common/util';
import { modalStyles } from './util';
import Dialogue from '../../../component/common/Dialogue/Dialogue';
import commonStyles from '../../../component/common/common.module.scss';

function ChangePassword({ showDialog, closeDialog, changePassword, validatePassword, user = {} }) {
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: trim(e.target.value),
        });
    };

    const submit = async e => {
        e.preventDefault();
        if (!data.password || data.password.length < 8) {
            setError({ password: 'You must specify a password with at least 8 chars.' });
            return;
        }
        if (!(data.password === data.confirm)) {
            setError({ confirm: 'Passwords does not match' });
            return;
        }

        try {
            await changePassword(user, data.password);
            setData({});
            closeDialog();
        } catch (error) {
            const msg = error.message || 'Could not update password';
            setError({ general: msg });
        }
    };

    const onPasswordBlur = async e => {
        e.preventDefault();
        setError({ password: '' });
        if (data.password) {
            try {
                await validatePassword(data.password);
            } catch (error) {
                const msg = error.message || '';
                setError({ password: msg });
            }
        }
    };

    const onCancel = e => {
        e.preventDefault();
        setData({});
        closeDialog();
    };

    return (
        <Dialogue
            open={showDialog}
            onClick={submit}
            style={modalStyles}
            onClose={onCancel}
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
        >
            <form onSubmit={submit}>
                <DialogTitle>Update password</DialogTitle>
                <DialogContent
                    className={commonStyles.contentSpacing}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <p>User: {user.username || user.email}</p>
                    <p style={{ color: 'red' }}>{error.general}</p>
                    <TextField
                        label="New password"
                        name="password"
                        type="password"
                        value={data.password}
                        error={error.password !== undefined}
                        helperText={error.password}
                        onChange={updateField}
                        onBlur={onPasswordBlur}
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        label="Confirm password"
                        name="confirm"
                        type="password"
                        value={data.confirm}
                        error={error.confirm !== undefined}
                        helperText={error.confirm}
                        onChange={updateField}
                        variant="outlined"
                        size="small"
                    />
                </DialogContent>
            </form>
        </Dialogue>
    );
}

ChangePassword.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    validatePassword: PropTypes.func.isRequired,
    user: PropTypes.object,
};

export default ChangePassword;
