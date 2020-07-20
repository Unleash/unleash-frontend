import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'react-mdl';
import Modal from 'react-modal';
import AuthenticationSimpleComponent from './authentication-simple-component';
import AuthenticationCustomComponent from './authentication-custom-component';
import AuthenticationPasswordComponent from './authentication-password-component';
import AuthenticationUploanComponent from './authentication-uploan-component';
import { iframeEventBinder } from '../../data/helper'

const SIMPLE_TYPE = 'unsecure';
const PASSWORD_TYPE = 'password';
const UPLOAN_TYPE = 'uploan';

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
        unsecureLogin: PropTypes.func.isRequired,
        passwordLogin: PropTypes.func.isRequired,
        uploanLogin: PropTypes.func.isRequired,
        fetchFeatureToggles: PropTypes.func.isRequired,
        fetchUIConfig: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };

    // this makes it possible for stellar service to
    // push token to unleash front-end.
    componentDidMount() {
        iframeEventBinder(window, 'message', (e) => {
            if (typeof e.data === 'string' && e.data) {
                sessionStorage.setItem('oauth', e.data)
            }
        })
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
                    fetchFeatureToggles={this.props.fetchFeatureToggles}
                    fetchUIConfig={this.props.fetchUIConfig}
                    history={this.props.history}
                />
            );
        } else if (authDetails.type === SIMPLE_TYPE) {
            content = (
                <AuthenticationSimpleComponent
                    unsecureLogin={this.props.unsecureLogin}
                    authDetails={authDetails}
                    fetchFeatureToggles={this.props.fetchFeatureToggles}
                    history={this.props.history}
                />
            );
        } else if (authDetails.type === UPLOAN_TYPE) {
            content = (
                <AuthenticationUploanComponent
                    uploanLogin={this.props.uploanLogin}
                    authDetails={authDetails}
                    fetchFeatureToggles={this.props.fetchFeatureToggles}
                    fetchUIConfig={this.props.fetchUIConfig}
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
                        <CardTitle
                            expand
                            style={{
                                color: '#fff',
                                background: 'rgb(96, 125, 139)',
                            }}
                        >
                            Action Required
                        </CardTitle>
                        <CardText>{content}</CardText>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default AuthComponent;
