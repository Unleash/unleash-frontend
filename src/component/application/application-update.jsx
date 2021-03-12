import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import StatefulTextfield from './stateful-textfield';
import icons from './icon-names';
import MySelect from '../common/select';

function ApplicationUpdate({ application, storeApplicationMetaData }) {
    const { appName, icon, url, description } = application;

    return (
        <Grid container>
            <Grid item sm={12} xs={12}>
                <MySelect
                    label="Icon"
                    options={icons.map(v => ({ key: v, label: v }))}
                    value={icon || 'apps'}
                    onChange={e => storeApplicationMetaData(appName, 'icon', e.target.value)}
                />
                <StatefulTextfield
                    value={url || ''}
                    label="Application URL"
                    placeholder="https://example.com"
                    type="url"
                    onBlur={e => storeApplicationMetaData(appName, 'url', e.target.value)}
                />

                <br />
                <StatefulTextfield
                    value={description || ''}
                    label="Description"
                    rows={2}
                    onBlur={e => storeApplicationMetaData(appName, 'description', e.target.value)}
                />
            </Grid>
        </Grid>
    );
}

ApplicationUpdate.propTypes = {
    application: PropTypes.object.isRequired,
    storeApplicationMetaData: PropTypes.func.isRequired,
};

export default ApplicationUpdate;
