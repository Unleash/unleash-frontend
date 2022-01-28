import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

import styles from './SimpleAuth.module.scss';
import useUser from '../../../hooks/api/getters/useUser/useUser';
import useAuthApi from '../../../hooks/api/actions/useAuthApi/useAuthApi';
import useToast from '../../../hooks/useToast';
import { useHistory } from 'react-router-dom';
import { formatPath } from '../../../utils/format-path';

const SimpleAuth = ({ authDetails }) => {
    const { insecureLogin } = useAuthApi();
    const [email, setEmail] = useState('');
    const { refetch } = useUser();
    const { setToastApiError } = useToast();
    const history = useHistory();

    const handleSubmit = async evt => {
        evt.preventDefault();
        const user = { email };
        try {
            await insecureLogin(formatPath(authDetails?.path), user);
            refetch();
            history.push(`/`);
        } catch (e) {
            setToastApiError(e.toString());
        }
    };

    const handleChange = e => {
        const value = e.target.value;
        setEmail(value);
    };

    return (
        <form onSubmit={handleSubmit} action={authDetails.path}>
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
