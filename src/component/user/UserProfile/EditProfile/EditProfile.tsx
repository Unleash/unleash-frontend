import React, { SyntheticEvent, useState } from 'react';
import { Button, Typography } from '@mui/material';
import classnames from 'classnames';
import { useStyles } from './EditProfile.styles';
import { useCommonStyles } from 'themes/commonStyles';
import PasswordChecker from 'component/user/common/ResetPasswordForm/PasswordChecker/PasswordChecker';
import PasswordMatcher from 'component/user/common/ResetPasswordForm/PasswordMatcher/PasswordMatcher';
import { Alert } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import useLoading from 'hooks/useLoading';
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    UNAUTHORIZED,
} from 'constants/statusCodes';
import { formatApiPath } from 'utils/formatPath';
import PasswordField from 'component/common/PasswordField/PasswordField';
import { headers } from 'utils/apiUtils';

interface IEditProfileProps {
    setEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdatedPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile = ({
    setEditingProfile,
    setUpdatedPassword,
}: IEditProfileProps) => {
    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const [loading, setLoading] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const ref = useLoading(loading);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!validPassword || password !== confirmPassword) {
            setError(
                'Password is not valid, or your passwords do not match. Please provide a password with length over 10 characters, an uppercase letter, a lowercase letter, a number and a symbol.'
            );
        } else {
            setLoading(true);
            setError('');
            try {
                const path = formatApiPath('api/admin/user/change-password');
                const res = await fetch(path, {
                    headers,
                    body: JSON.stringify({ password, confirmPassword }),
                    method: 'POST',
                    credentials: 'include',
                });
                handleResponse(res);
            } catch (e: any) {
                setError(e);
            }
        }
        setLoading(false);
    };

    const handleResponse = (res: Response) => {
        if (res.status === BAD_REQUEST) {
            setError(
                'Password could not be accepted. Please make sure you are inputting a valid password.'
            );
        }

        if (res.status === UNAUTHORIZED) {
            setError('You are not authorized to make this request.');
        }

        if (res.status === NOT_FOUND) {
            setError(
                'The resource you requested could not be found on the server.'
            );
        }

        if (res.status === OK) {
            setEditingProfile(false);
            setUpdatedPassword(true);
        }
    };

    return (
        <div className={styles.container} ref={ref}>
            <Typography
                variant="body1"
                className={styles.editProfileTitle}
                data-loading
            >
                Update password
            </Typography>
            <ConditionallyRender
                condition={Boolean(error)}
                show={
                    <Alert data-loading severity="error">
                        {error}
                    </Alert>
                }
            />
            <form
                className={classnames(
                    styles.form,
                    commonStyles.contentSpacingY
                )}
            >
                <PasswordChecker
                    password={password}
                    callback={setValidPassword}
                    data-loading
                />
                <PasswordField
                    data-loading
                    label="Password"
                    name="password"
                    value={password}
                    autoComplete="on"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
                <PasswordField
                    data-loading
                    label="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    autoComplete="on"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmPassword(e.target.value)
                    }
                />
                <PasswordMatcher
                    data-loading
                    started={Boolean(password && confirmPassword)}
                    matchingPasswords={password === confirmPassword}
                />
                <Button
                    data-loading
                    variant="contained"
                    color="primary"
                    className={styles.button}
                    type="submit"
                    onClick={submit}
                >
                    Save
                </Button>
                <Button
                    data-loading
                    className={styles.button}
                    type="submit"
                    onClick={() => setEditingProfile(false)}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default EditProfile;
