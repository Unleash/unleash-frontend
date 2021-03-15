import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Modal from 'react-modal';
import SimpleAuth from './SimpleAuth/SimpleAuth';
import AuthenticationCustomComponent from './authentication-custom-component';
import AuthenticationPasswordComponent from './authentication-password-component';

const SIMPLE_TYPE = 'unsecure';
const PASSWORD_TYPE = 'password';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 99999,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        padding: 0,
        overflow: 'none',
    },
};

class AuthComponent extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        insecureLogin: PropTypes.func.isRequired,
        passwordLogin: PropTypes.func.isRequired,
        loadInitialData: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };

    render() {
        const authDetails = this.props.user.authDetails;
        if (!authDetails) return null;

        let content;
        if (authDetails.type === PASSWORD_TYPE) {
            content = (
                <AuthenticationPasswordComponent
                    passwordLogin={this.props.passwordLogin}
                    authDetails={authDetails}
                    loadInitialData={this.props.loadInitialData}
                    history={this.props.history}
                />
            );
        } else if (authDetails.type === SIMPLE_TYPE) {
            content = (
                <SimpleAuth
                    insecureLogin={this.props.insecureLogin}
                    authDetails={authDetails}
                    loadInitialData={this.props.loadInitialData}
                    history={this.props.history}
                />
            );
        } else {
            content = <AuthenticationCustomComponent authDetails={authDetails} />;
        }
        return (
            <div>
                <Modal isOpen={this.props.user.showDialog} contentLabel="test" style={customStyles}>
                    <Card shadow={0}>
                        <CardHeader
                            expand
                            style={{
                                color: '#fff',
                                background: 'rgb(96, 125, 139)',
                            }}
                        >
                            Action Required
                        </CardHeader>
                        <CardContent>{content}</CardContent>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default AuthComponent;
