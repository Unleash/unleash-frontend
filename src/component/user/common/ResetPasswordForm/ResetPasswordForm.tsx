import { Button, TextField, Typography } from '@material-ui/core';
import classnames from 'classnames';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../common.styles';
import ConditionallyRender from '../../../common/ConditionallyRender';
import PasswordChecker from './PasswordChecker/PasswordChecker';
import { useStyles } from './ResetPasswordForm.styles';

interface IResetPasswordProps {
    token: string;
}

const ResetPasswordForm = ({ token }: IResetPasswordProps) => {
    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={classnames(
                commonStyles.contentSpacingY,
                styles.container
            )}
        >
            <PasswordChecker password={password} />
            <TextField
                variant="outlined"
                size="small"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                data-loading
            />
            <TextField
                variant="outlined"
                size="small"
                type="password"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={e => setConfirmPassword(e.target.value)}
                data-loading
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={styles.button}
                data-loading
            >
                Submit
            </Button>
        </form>
    );
};

export default ResetPasswordForm;
