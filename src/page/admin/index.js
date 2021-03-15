import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const render = () => (
    <Grid container>
        <Grid item md={4}>
            <Icon name="supervised_user_circle" style={{ fontSize: '5em' }} />
            <br />
            <Link to="/admin/users">Users</Link>
        </Grid>
        <Grid item md={4}>
            <Icon name="apps" style={{ fontSize: '5em' }} />
            <br />
            <Link to="/admin/api">API Access</Link>
        </Grid>
        <Grid item md={4}>
            <Icon name="lock" style={{ fontSize: '5em' }} />
            <br />
            <Link to="/admin/auth">Authentication</Link>
        </Grid>
    </Grid>
);

render.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default render;
