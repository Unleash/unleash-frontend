import { Button, TextField } from '@material-ui/core';
import { useCommonStyles } from '../../../../common.styles';

const ChangePasswordForm = () => {
    const commonStyles = useCommonStyles();
    return (
        <div
            className={commonStyles.contentSpacingY}
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '300px',
            }}
        >
            <TextField
                variant="outlined"
                size="small"
                type="password"
                placeholder="Password"
            />
            <TextField
                variant="outlined"
                size="small"
                type="password"
                placeholder="Confirm password"
            />
            <Button
                variant="contained"
                color="primary"
                style={{ width: '150px' }}
            >
                Sign in
            </Button>
        </div>
    );
};

export default ChangePasswordForm;
