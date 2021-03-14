import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

const SimpleAuthenticationComponent = ({ insecureLogin, loadInitialData, history, authDetails }) => {
    const [email, setEmail] = useState("")


    const handleSubmit = evt => {
        evt.preventDefault();
        const user = { email };
        const path = evt.target.action;

        insecureLogin(path, user)
        .then(loadInitialData)
        .then(() => history.push(`/`));
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value)
    }

 
        
        return (
            <form onSubmit={handleSubmit} action={authDetails.path}>
                <p>{authDetails.message}</p>
                <p>
                    This instance of Unleash is not set up with a secure authentication provider. You can read more
                    about{' '}
                    <a href="https://github.com/Unleash/unleash/blob/master/docs/securing-unleash.md" target="_blank">
                        securing Unleash on GitHub
                    </a>
                </p>
                <TextField value={email} onChange={handleChange} inputProps={{"data-test": "email-input-field"}} size="small" variant="outlined" label="Email" name="email" required type="email" />
                <br />

                <div style={{ textAlign: 'center' }}>
                    <Button raised type="submit" colored data-test="login-submit">
                        Sign in
                    </Button>
                </div>
            </form>
        );
}

SimpleAuthenticationComponent.propTypes = {
        authDetails: PropTypes.object.isRequired,
        insecureLogin: PropTypes.func.isRequired,
        loadInitialData: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
}

export default SimpleAuthenticationComponent;
