import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import { useStyles } from './StrategyCardSticky.styles.js';

const StrategyCardSticky = ({ stickyField }) => {
    const styles = useStyles();
    return (
        <div className={styles.stickyContainer}>
            <Typography variant="body1">Sticky on</Typography>
            <Typography variant="body1">{stickyField}</Typography>
        </div>
    );
};

StrategyCardSticky.propTypes = {
    stickyField: PropTypes.string,
};

export default StrategyCardSticky;
