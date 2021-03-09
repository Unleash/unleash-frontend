import React, { memo } from 'react';
import { Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './list.module.scss';

function StatusComponent({ type, types, onClick }) {
    const typeObject = types.find(o => o.id === type) || {
        id: type,
        name: type,
    };

    return (
        <Chip className={styles.typeChip} title={typeObject.description} label={typeObject.name} onClick={onClick} />
    );
}

export default memo(StatusComponent);

StatusComponent.propTypes = {
    type: PropTypes.string.isRequired,
    types: PropTypes.array,
    onClick: PropTypes.func,
};
