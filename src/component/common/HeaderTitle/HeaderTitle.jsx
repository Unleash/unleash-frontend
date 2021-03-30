import React from 'react';
import classnames from 'classnames';

import { Typography } from '@material-ui/core';
import ConditionallyRender from '../ConditionallyRender/ConditionallyRender';

import { useStyles } from './styles';

const HeaderTitle = ({ title, actions, subtitle, variant, loading }) => {
    const styles = useStyles();
    const headerClasses = classnames({ skeleton: loading });

    return (
        <div className={styles.headerTitleContainer}>
            <div className={headerClasses}>
                <Typography variant={variant || 'h2'} className={styles.headerTitle}>
                    {title}
                </Typography>
                {subtitle && <small>{subtitle}</small>}
            </div>

            <ConditionallyRender condition={actions} show={<div className={styles.headerActions}>{actions}</div>} />
        </div>
    );
};

export default HeaderTitle;
