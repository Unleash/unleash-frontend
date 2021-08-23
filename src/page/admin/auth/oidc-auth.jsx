import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Switch, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PageContent from '../../../component/common/PageContent/PageContent';
import AccessContext from '../../../contexts/AccessContext';
import { ADMIN } from '../../../component/AccessProvider/permissions';
import AutoCreateForm from './AutoCreate/AutoCreateForm';

const initialState = {
    enabled: false,
    autoCreate: false,
    unleashHostname: location.hostname,
};

function OidcAuth({ config, getOidcConfig, updateOidcConfig, unleashUrl }) {
    const [data, setData] = useState(initialState);
    const [info, setInfo] = useState();
    const [error, setError] = useState();
    const { hasAccess } = useContext(AccessContext);

    useEffect(() => {
        getOidcConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (config.discoverUrl) {
            setData(config);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    if (!hasAccess(ADMIN)) {
        return (
            <Alert severity="error">
                You need to be a root admin to access this section.
            </Alert>
        );
    }

    const updateField = e => {
        setValue(e.target.name, e.target.value);
    };

    const updateEnabled = () => {
        setData({ ...data, enabled: !data.enabled });
    };

    const setValue = (field, value) => {
        setData({
            ...data,
            [field]: value,
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setInfo('...saving');
        setError('');
        try {
            await updateOidcConfig(data);
            setInfo('Settings stored');
            setTimeout(() => setInfo(''), 2000);
        } catch (e) {
            setInfo('');
            setError(e.message);
        }
    };
    return (
        <PageContent>
            <Grid container style={{ marginBottom: '1rem' }}>
                <Grid item md={12}>
                    <Alert severity="info">
                        Please read the{' '}
                        <a
                            href="https://www.unleash-hosted.com/docs/enterprise-authentication"
                            target="_blank"
                            rel="noreferrer"
                        >
                            documentation
                        </a>{' '}
                        to learn how to integrate with specific Open Id Connect
                        providers (Okta, Keycloak, Google, etc). <br />
                        Callback URL:{' '}
                        <code>{unleashUrl}/auth/oidc/callback</code>
                    </Alert>
                </Grid>
            </Grid>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={5}>
                        <strong>Enable</strong>
                        <p>Enable Open Id Connect Authentication.</p>
                    </Grid>
                    <Grid item md={6}>
                        <Switch
                            onChange={updateEnabled}
                            value={data.enabled}
                            name="enabled"
                            checked={data.enabled}
                        >
                            {data.enabled ? 'Enabled' : 'Disabled'}
                        </Switch>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={5}>
                        <strong>Discover URL</strong>
                        <p>(Required) Issuer discover metadata URL</p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Discover URL"
                            name="discoverUrl"
                            value={data.discoverUrl || ''}
                            disabled={!data.enabled}
                            style={{ width: '400px' }}
                            variant="outlined"
                            size="small"
                            
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={5}>
                        <strong>Client ID</strong>
                        <p>(Required) Client ID of your OpenID application</p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Client ID"
                            name="clientId"
                            value={data.clientId || ''}
                            disabled={!data.enabled}
                            style={{ width: '400px' }}
                            variant="outlined"
                            size="small"
                            required
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item md={5}>
                        <strong>Client secret</strong>
                        <p>(Required) Client secret of your OpenID application. </p>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            onChange={updateField}
                            label="Client Secret"
                            name="secret"
                            value={data.secret || ''}
                            disabled={!data.enabled}
                            style={{ width: '400px' }}
                            variant="outlined"
                            size="small"
                            required
                        />
                    </Grid>
                </Grid>

                <AutoCreateForm data={data} setValue={setValue} />

                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>{' '}
                        <small>{info}</small>
                        <small style={{color: 'red'}}>{error}</small>
                    </Grid>
                </Grid>
            </form>
        </PageContent>
    );
}

OidcAuth.propTypes = {
    config: PropTypes.object,
    unleash: PropTypes.string,
    getOidcConfig: PropTypes.func.isRequired,
    updateOidcConfig: PropTypes.func.isRequired,
};

export default OidcAuth;
