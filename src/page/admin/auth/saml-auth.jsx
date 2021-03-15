import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Paper, Switch, TextField } from '@material-ui/core';
import commonStyles from '../../../component/common/common.module.scss';
import { common } from '@material-ui/core/colors';

const initialState = {
    enabled: false,
    autoCreate: false,
    unleashHostname: location.hostname,
};

function SamlAuth({ config, getSamlConfig, updateSamlConfig, hasPermission }) {
    const [data, setData] = useState(initialState);
    const [info, setInfo] = useState();

    useEffect(() => {
        getSamlConfig();
    }, []);

    useEffect(() => {
        if (config.entityId) {
            setData(config);
        }
    }, [config]);

    if (!hasPermission('ADMIN')) {
        return <span>You need admin privileges to access this section.</span>;
    }

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const updateEnabled = () => {
        setData({ ...data, enabled: !data.enabled });
    };

    const updateAutoCreate = () => {
        setData({ ...data, autoCreate: !data.autoCreate });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setInfo('...saving');
        try {
            await updateSamlConfig(data);
            setInfo('Settings stored');
            setTimeout(() => setInfo(''), 2000);
        } catch (e) {
            setInfo(e.message);
        }
    };
    return (
        <Paper>
            <Grid container style={{ background: '#EFEFEF' }}>
                <Grid item md={12}>
                    <p>
                        Please read the{' '}
                        <a href="https://www.unleash-hosted.com/docs/enterprise-authentication" target="_blank">
                            documentation
                        </a>{' '}
                        to learn how to integrate with specific SAML 2.0 providers (Okta, Keycloak, etc). <br />
                        <br />
                        Callback URL: <code>https://[unleash.hostname.com]/auth/saml/callback</code>
                    </p>
                </Grid>
            </Grid>
            <form onSubmit={onSubmit} className={commonStyles.contentPadding}>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Enable</strong>
                        <p>Enable SAML 2.0 Authentication.</p>
                    </Grid>
                    <Grid item md={6} style={{ padding: '20px' }}>
                        <Switch onChange={updateEnabled} name="enabled" checked={data.enabled}>
                            {data.enabled ? 'Enabled' : 'Disabled'}
                        </Switch>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Entity ID</strong>
                        <p>(Required) The Entity Identity provider issuer.</p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Entity ID"
                            name="entityId"
                            placeholder=""
                            value={data.entityId}
                            style={{ width: '400px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Single Sign-On URL</strong>
                        <p>(Required) The url to redirect the user to for signing in.</p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Single Sign-On URL"
                            name="signOnUrl"
                            value={data.signOnUrl}
                            placeholder=""
                            style={{ width: '400px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>X.509 Certificate</strong>
                        <p>(Required) The certificate used to sign the SAML 2.0 request.</p>
                    </Grid>
                    <Grid item md={7}>
                        <textarea
                            onChange={updateField}
                            label="X.509 Certificate"
                            name="certificate"
                            placeholder=""
                            value={data.certificate}
                            style={{ width: '100%', fontSize: '0.7em', fontFamily: 'monospace' }}
                            rows={14}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Auto-create users</strong>
                        <p>Enable automatic creation of new users when signing in with Saml.</p>
                    </Grid>
                    <Grid item md={6} style={{ padding: '20px' }}>
                        <Switch onChange={updateAutoCreate} name="enabled" checked={data.autoCreate}>
                            Auto-create users
                        </Switch>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Email domains</strong>
                        <p>(Optional) Comma separated list of email domains that should be allowed to sign in.</p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Email domains"
                            name="emailDomains"
                            value={data.emailDomains}
                            placeholder="@company.com, @anotherCompany.com"
                            style={{ width: '400px' }}
                            rows={2}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>{' '}
                        <small>{info}</small>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

SamlAuth.propTypes = {
    config: PropTypes.object,
    getSamlConfig: PropTypes.func.isRequired,
    updateSamlConfig: PropTypes.func.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default SamlAuth;
