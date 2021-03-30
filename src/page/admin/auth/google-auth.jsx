import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Switch, TextField } from '@material-ui/core';
import commonStyles from '../../../component/common/common.module.scss';

const initialState = {
    enabled: false,
    autoCreate: false,
    unleashHostname: location.hostname,
};

function GoogleAuth({ config, getGoogleConfig, updateGoogleConfig, hasPermission }) {
    const [data, setData] = useState(initialState);
    const [info, setInfo] = useState();

    useEffect(() => {
        getGoogleConfig();
    }, []);

    useEffect(() => {
        if (config.clientId) {
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
            await updateGoogleConfig(data);
            setInfo('Settings stored');
            setTimeout(() => setInfo(''), 2000);
        } catch (e) {
            setInfo(e.message);
        }
    };
    return (
        <div>
            <Grid container style={{ background: '#EFEFEF' }}>
                <Grid item xs={12}>
                    <p>
                        Please read the{' '}
                        <a href="https://www.unleash-hosted.com/docs/enterprise-authentication/google" target="_blank">
                            documentation
                        </a>{' '}
                        to learn how to integrate with Google OAuth 2.0. <br />
                        <br />
                        Callback URL: <code>https://[unleash.hostname.com]/auth/google/callback</code>
                    </p>
                </Grid>
            </Grid>
            <form onSubmit={onSubmit} className={commonStyles.contentPadding}>
                <Grid container>
                    <Grid item xs={5}>
                        <strong>Enable</strong>
                        <p>
                            Enable Google users to login. Value is ignored if Client ID and Client Secret are not
                            defined.
                        </p>
                    </Grid>
                    <Grid item xs={6} style={{ padding: '20px' }}>
                        <Switch onChange={updateEnabled} name="enabled" checked={data.enabled}>
                            {data.enabled ? 'Enabled' : 'Disabled'}
                        </Switch>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={5}>
                        <strong>Client ID</strong>
                        <p>(Required) The Client ID provided by Google when registering the application.</p>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            onChange={updateField}
                            label="Client ID"
                            name="clientId"
                            placeholder=""
                            value={data.clientId}
                            style={{ width: '400px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Client Secret</strong>
                        <p>(Required) Client Secret provided by Google when registering the application.</p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Client Secret"
                            name="clientSecret"
                            value={data.clientSecret}
                            placeholder=""
                            style={{ width: '400px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Unleash hostname</strong>
                        <p>
                            (Required) The hostname you are running Unleash on that Google should send the user back to.
                            The final callback URL will be{' '}
                            <small>
                                <code>https://[unleash.hostname.com]/auth/google/callback</code>
                            </small>
                        </p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Unleash Hostname"
                            name="unleashHostname"
                            placeholder=""
                            value={data.unleashHostname}
                            style={{ width: '400px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={5}>
                        <strong>Auto-create users</strong>
                        <p>Enable automatic creation of new users when signing in with Google.</p>
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
        </div>
    );
}

GoogleAuth.propTypes = {
    config: PropTypes.object,
    getGoogleConfig: PropTypes.func.isRequired,
    updateGoogleConfig: PropTypes.func.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default GoogleAuth;
