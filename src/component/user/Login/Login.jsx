import { useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import AuthenticationContainer from '../authentication-container';
import ConditionallyRender from '../../common/ConditionallyRender';

import { useStyles } from './Login.styles';
import useQueryParams from '../../../hooks/useQueryParams';
import ResetPasswordSuccess from '../common/ResetPasswordSuccess/ResetPasswordSuccess';
import StandaloneLayout from '../common/StandaloneLayout/StandaloneLayout';

const Login = ({ history, loadInitialData, isUnauthorized, authDetails }) => {
    const theme = useTheme();
    const styles = useStyles();
    const smallScreen = useMediaQuery(theme.breakpoints.up('md'));
    const query = useQueryParams();

    useEffect(() => {
        if (isUnauthorized()) {
            loadInitialData();
        } else {
            history.push('features');
        }
        /* eslint-disable-next-line */
    }, [authDetails]);

    const resetPassword = query.get('reset') === 'true';

    return (
        <StandaloneLayout>
            <div>
                <h2 className={styles.title}>Login</h2>
                <ConditionallyRender
                    condition={resetPassword}
                    show={<ResetPasswordSuccess />}
                />
                <div className={styles.loginFormContainer}>
                    <AuthenticationContainer history={history} />
                </div>
            </div>
        </StandaloneLayout>
    );
};

export default Login;
