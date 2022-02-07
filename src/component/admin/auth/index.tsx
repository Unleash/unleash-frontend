import React from 'react';
import AdminMenu from '../menu/AdminMenu';
import { Alert } from '@material-ui/lab';
import { GoogleAuth } from './google-auth';
import SamlAuth from './saml-auth-container';
import { OidcAuth } from './oidc-auth';
import PasswordAuthSettings from './PasswordAuthSettings';
import TabNav from '../../common/TabNav/TabNav';
import PageContent from '../../common/PageContent/PageContent';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';

export const AdminAuthPage = () => {
    const { uiConfig } = useUiConfig();

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
            <AdminMenu />
            <PageContent headerContent="Single Sign-On">
                <ConditionallyRender
                    condition={uiConfig.authenticationType === 'enterprise'}
                    show={<TabNav tabData={tabs} />}
                />
                <ConditionallyRender
                    condition={uiConfig.authenticationType === 'open-source'}
                    show={
                        <Alert severity="warning">
                            You are running the open-source version of Unleash.
                            You have to use the Enterprise edition in order
                            configure Single Sign-on.
                        </Alert>
                    }
                />
                <ConditionallyRender
                    condition={uiConfig.authenticationType === 'demo'}
                    show={
                        <Alert severity="warning">
                            You are running Unleash in demo mode. You have to
                            use the Enterprise edition in order configure Single
                            Sign-on.
                        </Alert>
                    }
                />
                <ConditionallyRender
                    condition={uiConfig.authenticationType === 'custom'}
                    show={
                        <Alert severity="warning">
                            You have decided to use custom authentication type.
                            You have to use the Enterprise edition in order
                            configure Single Sign-on from the user interface.
                        </Alert>
                    }
                />
                <ConditionallyRender
                    condition={uiConfig.authenticationType === 'hosted'}
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
};
