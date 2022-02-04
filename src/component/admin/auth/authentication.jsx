import React from 'react';
import PropTypes from 'prop-types';
import AdminMenu from '../menu/AdminMenu';
import { Alert } from '@material-ui/lab';
import GoogleAuth from './google-auth-container';
import SamlAuth from './saml-auth-container';
import OidcAuth from './oidc-auth-container';
import PasswordAuthSettings from './PasswordAuthSettings';
import TabNav from '../../common/TabNav/TabNav';
import PageContent from '../../common/PageContent/PageContent';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';

function AdminAuthPage({ authenticationType, history }) {
    const tabs = [
        {
            label: 'OpenID Connect',
            component: <OidcAuth />,
        },
        {
            label: 'SAML 2.0',
            component: <SamlAuth />,
        },
        {
            label: 'Password',
            component: <PasswordAuthSettings />,
        },
        {
            label: 'Google',
            component: <GoogleAuth />,
        },
    ];

    return (
        <div>
            <AdminMenu history={history} />
            <PageContent headerContent="Single Sign-On">
                <ConditionallyRender
                    condition={authenticationType === 'enterprise'}
                    show={<TabNav tabData={tabs} />}
                />
                <ConditionallyRender
                    condition={authenticationType === 'open-source'}
                    show={
                        <Alert severity="warning">
                            You are running the open-source version of Unleash.
                            You have to use the Enterprise edition in order
                            configure Single Sign-on.
                        </Alert>
                    }
                />
                <ConditionallyRender
                    condition={authenticationType === 'demo'}
                    show={
                        <Alert severity="warning">
                            You are running Unleash in demo mode. You have to
                            use the Enterprise edition in order configure Single
                            Sign-on.
                        </Alert>
                    }
                />
                <ConditionallyRender
                    condition={authenticationType === 'custom'}
                    show={
                        <Alert severity="warning">
                            You have decided to use custom authentication type.
                            You have to use the Enterprise edition in order
                            configure Single Sign-on from the user interface.
                        </Alert>
                    }
                />
                <ConditionallyRender
                    condition={authenticationType === 'hosted'}
                    show={
                        <Alert severity="info">
                            Your Unleash instance is managed by the Unleash
                            team.
                        </Alert>
                    }
                />
            </PageContent>
        </div>
    );
}

AdminAuthPage.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    authenticationType: PropTypes.string,
};

export default AdminAuthPage;
