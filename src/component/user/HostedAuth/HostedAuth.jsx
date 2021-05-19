import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useCommonStyles } from '../../../common.styles';
import { useStyles } from './HostedAuth.styles';
import { Link } from 'react-router-dom';
import useQueryParams from '../../../hooks/useQueryParams';
import AuthOptions from '../common/AuthOptions/AuthOptions';
import DividerText from '../../common/DividerText/DividerText';
import ConditionallyRender from '../../common/ConditionallyRender';

const PasswordAuth = ({ authDetails, passwordLogin }) => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const history = useHistory();
    const params = useQueryParams();
    const [username, setUsername] = useState(params.get('email') || '');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        usernameError: '',
        passwordError: '',
    });

    const handleSubmit = async evt => {
        evt.preventDefault();

        if (!username) {
            setErrors(prev => ({
                ...prev,
                usernameError: 'This is a required field',
            }));
        }
        if (!password) {
            setErrors(prev => ({
                ...prev,
                passwordError: 'This is a required field',
            }));
        }

        if (!password || !username) {
            return;
        }

        const user = { username, password };
        const path = evt.target.action;

        try {
            await passwordLogin(path, user);
            history.push(`/`);
        } catch (error) {
            if (error.statusCode === 404 || error.statusCode === 400) {
                setErrors(prev => ({
                    ...prev,
                    apiError: 'Invalid login details',
                }));
                setPassword('');
                setUsername('');
            } else {
                setErrors({
                    apiError: 'Unknown error while trying to authenticate.',
                });
            }
        }
    };

    const { usernameError, passwordError, apiError } = errors;
    const { options = [] } = authDetails;

    return (
        <div>
            <ConditionallyRender
                condition={options.length > 0}
                show={
                    <>
                        <AuthOptions options={options} />
                        <DividerText text="or signin with username" />
                    </>
                }
            />

            <form onSubmit={handleSubmit} action={authDetails.path}>
                <Typography variant="subtitle2" className={styles.apiError}>
                    {apiError}
                </Typography>
                <div
                    className={classnames(
                        styles.contentContainer,
                        commonStyles.contentSpacingY
                    )}
                >
                    <TextField
                        label="Username or email"
                        name="username"
                        type="string"
                        onChange={evt => setUsername(evt.target.value)}
                        value={username}
                        error={!!usernameError}
                        helperText={usernameError}
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        label="Password"
                        onChange={evt => setPassword(evt.target.value)}
                        name="password"
                        type="password"
                        value={password}
                        error={!!passwordError}
                        helperText={passwordError}
                        variant="outlined"
                        size="small"
                    />
                    <Grid container>
                        <Grid item xs={12}>
                            <Link to="/forgotten-password">
                                <Typography variant="body2">
                                    Forgot your password?
                                </Typography>
                            </Link>
                        </Grid>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={styles.button}
                        >
                            Sign in
                        </Button>
                    </Grid>

                    <DividerText text="Don't have an account?" />
                    <Button
                        className={styles.button}
                        variant="outlined"
                        element={'a'}
                        href="https://www.unleash-hosted.com/pricing"
                    >
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    );
};

PasswordAuth.propTypes = {
    authDetails: PropTypes.object.isRequired,
    passwordLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default PasswordAuth;
