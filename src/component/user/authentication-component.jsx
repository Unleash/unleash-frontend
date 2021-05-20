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

class AuthComponent extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        demoLogin: PropTypes.func.isRequired,
        insecureLogin: PropTypes.func.isRequired,
        passwordLogin: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };

    render() {
        const authDetails = this.props.user.authDetails;
        // const authDetails = {
        //     type: HOSTED_TYPE,
        //     options: [
        //         { type: 'google', message: 'Sign in with Google' },
        //         { type: 'github', message: 'Sign in with github' },
        //     ],
        // };
        if (!authDetails) return null;

        let content;
        if (authDetails.type === PASSWORD_TYPE) {
            content = (
                <PasswordAuth
                    passwordLogin={this.props.passwordLogin}
                    authDetails={authDetails}
                    history={this.props.history}
                />
            );
        } else if (authDetails.type === SIMPLE_TYPE) {
            content = (
                <SimpleAuth
                    insecureLogin={this.props.insecureLogin}
                    authDetails={authDetails}
                    history={this.props.history}
                />
            );
        } else if (authDetails.type === DEMO_TYPE) {
            content = (
                <DemoAuth
                    demoLogin={this.props.demoLogin}
                    authDetails={authDetails}
                    history={this.props.history}
                />
            );
        } else if (authDetails.type === HOSTED_TYPE) {
            content = (
                <HostedAuth
                    passwordLogin={this.props.passwordLogin}
                    authDetails={authDetails}
                    history={this.props.history}
                />
            );
        } else {
            content = (
                <AuthenticationCustomComponent authDetails={authDetails} />
            );
        }
        return <div>{content}</div>;
    }
}

export default AuthComponent;
