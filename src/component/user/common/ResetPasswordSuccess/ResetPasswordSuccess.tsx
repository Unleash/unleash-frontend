import { Alert, AlertTitle } from '@material-ui/lab';

const ResetPasswordSuccess = () => {
    return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            You successfully reset your password. Login to start using Unleash.
        </Alert>
    );
};

export default ResetPasswordSuccess;
