import React, { useState, useContext, useEffect } from 'react';
import {
    Button,
    FormControlLabel,
    Grid,
    Switch,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PageContent from '../../common/PageContent/PageContent';
import AccessContext from '../../../contexts/AccessContext';
import { ADMIN } from '../../providers/AccessProvider/permissions';
import useAuthSettings from '../../../hooks/api/getters/useAuthSettings/useAuthSettings';
import useAuthSettingsApi, {ISimpleAuthSettings } from '../../../hooks/api/actions/useAuthSettingsApi/useAuthSettingsApi';

function SimpleAuth() {

    const { config } = useAuthSettings('simple');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [info, setInfo] = useState<string>();
    const { updateSettings, errors } = useAuthSettingsApi<ISimpleAuthSettings>('simple')
    const { hasAccess } = useContext(AccessContext);


    useEffect(() => {
        setDisabled(!!config.disabled);
    }, [ config.disabled ]);

    if (!hasAccess(ADMIN)) {
        return (
            <Alert severity="error">
                You need to be a root admin to access this section.
            </Alert>
        );
    }

    const updateDisabled = () => {
        setDisabled(!disabled);
    };

    
    const onSubmit = async e => {
        e.preventDefault();
        
        setInfo('...saving');
        try {
            const settings: ISimpleAuthSettings = { disabled };
            await updateSettings(settings);
            setInfo('Settings stored');
            setTimeout(() => setInfo(''), 2000);
        } catch (e) {
            setInfo('');
            setDisabled(config.disabled)
        }
        
    };
    return (
        <PageContent headerContent=''>
            <form onSubmit={onSubmit}>
                <Grid container spacing={3}>
                    <Grid item md={5}>
                        <strong>Password based login</strong>
                        <p>Allow users to login with username & password</p>
                    </Grid>
                    <Grid item md={6} style={{ padding: '20px' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={updateDisabled}
                                    value={!disabled}
                                    name="disabled"
                                    checked={!disabled}
                                />
                            }
                            label={!disabled ? 'Enabled' : 'Disabled'}
                        />
                    </Grid>
                </Grid>
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
                        <p><small style={{ color: 'red' }}>{errors?.message}</small></p>
                    </Grid>
                </Grid>
            </form>
        </PageContent>
    );
}

export default SimpleAuth;
