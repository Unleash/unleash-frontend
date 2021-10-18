import React from 'react';
import PropTypes from 'prop-types';
import SimpleAuth from './SimpleAuth/SimpleAuth';
import AuthenticationCustomComponent from './authentication-custom-component';
import PasswordAuth from './PasswordAuth/PasswordAuth';
import HostedAuth from './HostedAuth/HostedAuth';
import DemoAuth from './DemoAuth';

import {
    SIMPLE_TYPE,
    DEMO_TYPE,
    PASSWORD_TYPE,
    HOSTED_TYPE,
} from '../../constants/authTypes';
import SecondaryLoginActions from './common/SecondaryLoginActions/SecondaryLoginActions';
import useUser from '../../hooks/api/getters/useUser/useUser';

const AuthComponent = ({
    insecureLogin,
    passwordLogin,
    demoLogin,
    history,
}) => {
    const { authDetails } = useUser();

    if (!authDetails) return null;

    let content;
    if (authDetails.type === PASSWORD_TYPE) {
        content = (
            <>
                <PasswordAuth
                    passwordLogin={passwordLogin}
                    authDetails={authDetails}
                    history={history}
                />
                <SecondaryLoginActions />
            </>
        );
    } else if (authDetails.type === SIMPLE_TYPE) {
        content = (
            <SimpleAuth
                insecureLogin={insecureLogin}
                authDetails={authDetails}
                history={history}
            />
        );
    } else if (authDetails.type === DEMO_TYPE) {
        content = (
            <DemoAuth
                demoLogin={demoLogin}
                authDetails={authDetails}
                history={history}
            />
        );
    } else if (authDetails.type === HOSTED_TYPE) {
        content = (
            <>
                <HostedAuth
                    passwordLogin={passwordLogin}
                    authDetails={authDetails}
                    history={history}
                />
                <SecondaryLoginActions />
            </>
        );
    } else {
        content = <AuthenticationCustomComponent authDetails={authDetails} />;
    }
    return <>{content}</>;
};

export default AuthComponent;
