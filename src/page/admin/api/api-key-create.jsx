import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, MenuItem } from '@material-ui/core';
import Dialogue from '../../../component/common/Dialogue/Dialogue';
import DropdownMenu from '../../../component/common/dropdown-menu';

function CreateApiKey({ addKey }) {
    const [type, setType] = useState('CLIENT');
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState();
    const [error, setError] = useState();

    const toggle = evt => {
        evt.preventDefault();
        setShow(!show);
    };

    const submit = async e => {
        e.preventDefault();
        if (!username) {
            setError('You must define a username');
            return;
        }
        await addKey({ username, type });
        setUsername('');
        setType('CLIENT');
        setShow(false);
    };

    return (
        <div style={{ margin: '5px' }}>
            <Dialogue
                onClick={() => {
                    submit();
                    setShow(false);
                }}
                open={show}
                primaryButtonText="Create new key"
                onClose={toggle}
                secondaryButtonText="Cancel"
                title="Add new API key"
            >
                <form onSubmit={submit}>
                    <TextField
                        value={username}
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                        label="Username"
                        style={{ width: '200px' }}
                        error={error !== undefined}
                        helperText={error}
                        variant="outlined"
                        size="small"
                    />
                    <DropdownMenu
                        renderOptions={() => [
                            <MenuItem value="CLIENT" key="apikey_client" title="Client">
                                Client
                            </MenuItem>,
                            <MenuItem value="ADMIN" key="apikey_admin" title="Admin">
                                Admin
                            </MenuItem>,
                        ]}
                        callback={e => setType(e.target.value)}
                        value={type}
                        label="API key type"
                    />
                </form>
            </Dialogue>
            <Button onClick={toggle} variant="contained" color="primary">
                Add new API key
            </Button>
        </div>
    );
}

CreateApiKey.propTypes = {
    addKey: PropTypes.func.isRequired,
};

export default CreateApiKey;
