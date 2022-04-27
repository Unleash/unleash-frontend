import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import styles from './SimpleAuth.module.scss';
import { useHistory } from 'react-router-dom';
import { useAuthApi } from 'hooks/api/actions/useAuthApi/useAuthApi';
import { useAuthUser } from 'hooks/api/getters/useAuth/useAuthUser';
import { LOGIN_BUTTON, LOGIN_EMAIL_ID } from 'utils/testIds';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';

const SimpleAuth = ({ authDetails, redirect }) => {
    const [email, setEmail] = useState('');
    const { refetchUser } = useAuthUser();
    const { emailAuth } = useAuthApi();
    const history = useHistory();
    const { setToastApiError } = useToast();

    const handleSubmit = async evt => {
        evt.preventDefault();

        try {
            await emailAuth(authDetails.path, email);
            refetchUser();
            history.push(redirect);
        } catch (error) {
            setToastApiError(formatUnknownError(error));
        }
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
                    inputProps={{ 'data-testid': 'email-input-field' }}
                    size="small"
                    variant="outlined"
                    label="Email"
                    name="email"
                    id="email"
                    required
                    type="email"
                    data-testid={LOGIN_EMAIL_ID}
                    autoFocus
                />
                <br />

                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        data-testid={LOGIN_BUTTON}
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
    redirect: PropTypes.string.isRequired,
};

export default SimpleAuth;
