import React from 'react';
import PropTypes from 'prop-types';

import { CardHeader, Typography, IconButton, Icon } from '@material-ui/core';

import { useStyles } from './StrategyCardHeader.styles.js';

const StrategyCardHeader = ({ name, connectDragSource, removeStrategy }) => {
    const styles = useStyles();

    return (
        <CardHeader
            classes={{
                root: styles.strategyCardHeader,
                content: styles.strategyCardHeaderContent,
            }}
            title={
                <>
                    <Typography variant="subtitle1" className={styles.strategyCardHeaderTitle}>
                        {name}
                    </Typography>
                    <div className={styles.strategyCardHeaderActions}>
                        <IconButton>
                            <Icon className={styles.strateyCardHeaderIcon}>edit</Icon>
                        </IconButton>
                        {connectDragSource(
                            <span>
                                <IconButton>
                                    <Icon className={styles.strateyCardHeaderIcon}>reorder</Icon>
                                </IconButton>
                            </span>
                        )}
                        <IconButton>
                            <Icon className={styles.strateyCardHeaderIcon} onClick={removeStrategy}>
                                delete
                            </Icon>
                        </IconButton>
                    </div>
                </>
            }
            disableTypography
        />
    );
};

StrategyCardHeader.propTypes = {
    name: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    removeStrategy: PropTypes.func.isRequired,
};

export default StrategyCardHeader;
