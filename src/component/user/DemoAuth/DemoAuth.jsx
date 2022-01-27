import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import useUser from '../../../hooks/api/getters/useUser/useUser';

import styles from './DemoAuth.module.scss';

import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import { LOGIN_BUTTON, LOGIN_EMAIL_ID } from '../../../testIds';
import { useHistory } from 'react-router-dom';
import useAuthApi from '../../../hooks/api/actions/useAuthApi/useAuthApi';
import useToast from '../../../hooks/useToast';

const DemoAuth = ({ authDetails }) => {
    const { demoLogin } = useAuthApi();
    const history = useHistory();
    const { refetch } = useUser();
    const [email, setEmail] = useState('');
    const { setToastApiError } = useToast();

    const handleSubmit = async evt => {
        evt.preventDefault();
        const user = { email };
        const path = evt.target.action;
        try {
            await demoLogin(path, user);
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
            <Logo className={styles.logo} />
            <div className={styles.container}>
                <h2>Access the Unleash demo instance</h2>
                <p>No further data or Credit Card required</p>
                <div className={styles.form}>
                    <TextField
                        value={email}
                        className={styles.emailField}
                        onChange={handleChange}
                        inputProps={{ 'data-test': 'email-input-field' }}
                        size="small"
                        variant="outlined"
                        label="Email"
                        name="email"
                        data-test={LOGIN_EMAIL_ID}
                        required
                        type="email"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        data-test={LOGIN_BUTTON}
                    >
                        Sign in
                    </Button>
                </div>
                <p>
                    By accessing our demo instance, you agree to the
                    Unleash&nbsp;
                    <a
                        href="https://www.unleash-hosted.com/tos/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Customer Terms of Service
                    </a>{' '}
                    and&nbsp;
                    <a
                        href="https://www.unleash-hosted.com/privacy-policy/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Privacy Policy
                    </a>
                </p>
            </div>
        </form>
    );
};

DemoAuth.propTypes = {
    authDetails: PropTypes.object.isRequired,
};

export default DemoAuth;
