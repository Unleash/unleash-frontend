import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import styles from './SimpleAuth.module.scss';
import { useAuth } from '../../../hooks/api/getters/useAuth/useAuth';
import { useHistory } from "react-router-dom";
import { useAuthApi } from "../../../hooks/api/actions/useAuthApi/useAuthApi";

const SimpleAuth = ({ authDetails }) => {
    const [email, setEmail] = useState('');
    const { refetchAuth } = useAuth();
    const { emailAuth } = useAuthApi();
    const history = useHistory();

    const handleSubmit = evt => {
        evt.preventDefault();

        emailAuth(authDetails.path, email).then(() => {
            refetchAuth();
            history.push(`/`);
        });
    };

    const handleChange = e => {
        const value = e.target.value;
        setEmail(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.container}>
                <p>{authDetails.message}</p>
                <p>
                    This instance of Unleash is not set up with a secure
                    authentication provider. You can read more about{' '}
                    <a
                        href="https://github.com/Unleash/unleash/blob/master/docs/securing-unleash.md"
                        target="_blank"
                        rel="noreferrer"
                    >
                        securing Unleash on GitHub
                    </a>
                </p>
                <TextField
                    value={email}
                    onChange={handleChange}
                    inputProps={{ 'data-test': 'email-input-field' }}
                    size="small"
                    variant="outlined"
                    label="Email"
                    name="email"
                    required
                    type="email"
                />
                <br />

                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        data-test="login-submit"
                        className={styles.button}
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </form>
    );
};

SimpleAuth.propTypes = {
    authDetails: PropTypes.object.isRequired,
};

export default SimpleAuth;
