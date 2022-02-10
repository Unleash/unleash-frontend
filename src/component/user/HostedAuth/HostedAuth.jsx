import { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useCommonStyles } from '../../../common.styles';
import { useStyles } from './HostedAuth.styles';
import useQueryParams from '../../../hooks/useQueryParams';
import AuthOptions from '../common/AuthOptions/AuthOptions';
import DividerText from '../../common/DividerText/DividerText';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useAuth } from '../../../hooks/api/getters/useAuth/useAuth';
import PasswordField from '../../common/PasswordField/PasswordField';
import { useAuthApi } from "../../../hooks/api/actions/useAuthApi/useAuthApi";

const HostedAuth = ({ authDetails }) => {
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const { refetchAuth } = useAuth();
    const history = useHistory();
    const params = useQueryParams();
    const { passwordAuth } = useAuthApi()
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

        try {
            await passwordAuth(authDetails.path, username, password);
            refetchAuth();
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
        <>
            <ConditionallyRender
                condition={options.length > 0}
                show={
                    <>
                        <AuthOptions options={options} />
                        <DividerText text="or signin with username" />
                    </>
                }
            />

            <ConditionallyRender
                condition={!authDetails.defaultHidden}
                show={
                    <form onSubmit={handleSubmit}>
                        <Typography
                            variant="subtitle2"
                            className={styles.apiError}
                        >
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
                            <PasswordField
                                label="Password"
                                onChange={evt => setPassword(evt.target.value)}
                                name="password"
                                value={password}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                            <Grid container>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={styles.button}
                                >
                                    Sign in
                                </Button>
                            </Grid>
                        </div>
                    </form>
                }
            />
        </>
    );
};

HostedAuth.propTypes = {
    authDetails: PropTypes.object.isRequired,
};

export default HostedAuth;
