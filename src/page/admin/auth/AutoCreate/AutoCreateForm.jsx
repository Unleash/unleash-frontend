import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Grid, MenuItem, Switch, TextField, Select, InputLabel } from '@material-ui/core';

function AutoCreateForm({ data = {}, setValue }) {
    const updateAutoCreate = () => {
        setValue('autoCreate', !data.autoCreate);
    };

    const updateDefaultRootRole = (evt) => {
        setValue('defaultRootRole', evt.target.value);
    };

    const updateField = e => {
        setValue(e.target.name, e.target.value);
    };

return (
    <Fragment>
        <Grid container spacing={3}>
            <Grid item md={5}>
                <strong>Auto-create users</strong>
                <p>
                    Enable automatic creation of new users when signing in.
                </p>
            </Grid>
            <Grid item md={6} style={{ padding: '20px' }}>
                <Switch
                    onChange={updateAutoCreate}
                    name="enabled"
                    checked={data.autoCreate}
                    disabled={!data.enabled}
                >
                    Auto-create users
                </Switch>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item md={5}>
                <strong>Default Root Role</strong>
                <p>
                    Choose which root role the user should get when no explicit role mapping exists.
                </p>
            </Grid>
            <Grid item md={6}>
            <FormControl style={{minWidth: '200px'}}>
                <InputLabel id="defaultRootRole-label">Default Role</InputLabel>
                <Select
                    labelId="defaultRootRole-label"
                    id="defaultRootRole"
                    name="defaultRootRole"
                    disabled={!data.autoCreate}
                    value={data.defaultRootRole || 'Editor'}
                    onChange={updateDefaultRootRole}
                    >
                    {/*consider these from API or constants. */}
                    <MenuItem value='Viewer'>Viewer</MenuItem>
                    <MenuItem value='Editor'>Editor</MenuItem>
                    <MenuItem value='Admin'>Admin</MenuItem>
                </Select>
            </FormControl>
            </Grid>
        </Grid>
        <Grid container spacing={3}>
            <Grid item md={5}>
                <strong>Email domains</strong>
                <p>
                    Comma separated list of email domains
                    that should be allowed to sign in.
                </p>
            </Grid>
            <Grid item md={6}>
                <TextField
                    onChange={updateField}
                    label="Email domains"
                    name="emailDomains"
                    disabled={!data.autoCreate}
                    required={!!data.autoCreate}
                    value={data.emailDomains || ''}
                    placeholder="@company.com, @anotherCompany.com"
                    style={{ width: '400px' }}
                    rows={2}
                    variant="outlined"
                    size="small"
                />
            </Grid>
        </Grid>
    </Fragment>);
}

AutoCreateForm.propTypes = {
    data: PropTypes.object,
    setValue: PropTypes.func.isRequired,
};

export default AutoCreateForm;
