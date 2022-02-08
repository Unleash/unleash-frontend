import { useEffect } from 'react';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useStyles } from './Login.styles';
import useQueryParams from '../../../hooks/useQueryParams';
import ResetPasswordSuccess from '../common/ResetPasswordSuccess/ResetPasswordSuccess';
import StandaloneLayout from '../common/StandaloneLayout/StandaloneLayout';
import { DEMO_TYPE } from '../../../constants/authTypes';
import { useAuth } from '../../../hooks/api/getters/useAuth/useAuth';
import { useHistory } from 'react-router';
import Authentication from "../Authentication/Authentication";

const Login = () => {
    const styles = useStyles();
    const { auth } = useAuth();
    const query = useQueryParams();
    const history = useHistory();

    useEffect(() => {
        if (auth?.permissions.length) {
            history.push('features');
        }
        /* eslint-disable-next-line */
    }, [auth?.permissions.length]);

    const resetPassword = query.get('reset') === 'true';
    return (
        <StandaloneLayout>
            <div className={styles.loginFormContainer}>
                <ConditionallyRender
                    condition={auth?.authDetails?.type !== DEMO_TYPE}
                    show={
                        <h2 className={styles.title}>
                            Login to continue the great work
                        </h2>
                    }
                />

                <ConditionallyRender
                    condition={resetPassword}
                    show={<ResetPasswordSuccess />}
                />
                <Authentication />
            </div>
        </StandaloneLayout>
    );
};

export default Login;
