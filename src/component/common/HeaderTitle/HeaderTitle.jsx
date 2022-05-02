import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

import { useStyles } from './styles';
import { usePageTitle } from 'hooks/usePageTitle';

const HeaderTitle = ({
    title,
    actions,
    subtitle,
    variant,
    loading,
    className = '',
}) => {
    const styles = useStyles();
    const headerClasses = classnames({ skeleton: loading });

    usePageTitle(title);

    return (
        <div className={styles.headerTitleContainer}>
            <div className={headerClasses} data-loading>
                <Typography
                    variant={variant || 'h1'}
                    className={classnames(styles.headerTitle, className)}
                >
                    {title}
                </Typography>
                {subtitle && <small>{subtitle}</small>}
            </div>

            <ConditionallyRender
                condition={actions}
                show={<div className={styles.headerActions}>{actions}</div>}
            />
        </div>
    );
};

export default HeaderTitle;

HeaderTitle.propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    subtitle: PropTypes.string,
    variant: PropTypes.string,
    loading: PropTypes.bool,
    actions: PropTypes.element,
};
