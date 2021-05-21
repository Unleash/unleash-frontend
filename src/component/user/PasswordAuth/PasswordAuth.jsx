import { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@material-ui/core';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useHistory } from 'react-router';
import { useCommonStyles } from '../../../common.styles';
import { useStyles } from './PasswordAuth.styles';
import useQueryParams from '../../../hooks/useQueryParams';
import AuthOptions from '../common/AuthOptions/AuthOptions';
import DividerText from '../../common/DividerText/DividerText';
import SecondaryLoginActions from '../common/SecondaryLoginActions/SecondaryLoginActions';

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

    const renderLoginForm = () => {
        const { usernameError, passwordError, apiError } = errors;

        return (
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
                        autoComplete="true"
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
                        autoComplete="true"
                        size="small"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: '150px', margin: '1rem auto' }}
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        );
    };

    const renderWithOptions = options => (
        <>
            <AuthOptions options={options} />
            <DividerText text="Or signin with username" />
            {renderLoginForm()}
            <SecondaryLoginActions />
        </>
    );

    const { options = [] } = authDetails;

    return (
        <>
            <ConditionallyRender
                condition={options.length > 0}
                show={renderWithOptions(options)}
                elseShow={renderLoginForm()}
            />
        </>
    );
};

PasswordAuth.propTypes = {
    authDetails: PropTypes.object.isRequired,
    passwordLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default PasswordAuth;
