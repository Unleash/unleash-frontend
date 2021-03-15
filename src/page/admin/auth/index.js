import React from 'react';
import PropTypes from 'prop-types';
import AdminMenu from '../admin-menu';
import GoogleAuth from './google-auth-container';
import SamlAuth from './saml-auth-container';
import TabNav from '../../../component/common/tabNav';

function AdminAuthPage() {
    const tabs = [
        {
            label: 'SAML 2.0',
            component: <SamlAuth />,
        },
        {
            label: 'Google',
            component: <GoogleAuth />,
        },
    ];

    return (
        <div>
            <AdminMenu />
            <h3>Authentication</h3>
            <div className="demo-tabs">
                <TabNav tabData={tabs} />
            </div>
        </div>
    );
}

AdminAuthPage.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default AdminAuthPage;
