import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'react-mdl';
import styles from './variant.scss';

class VariantViewComponent extends Component {
    render() {
        const { variant, editVariant, removeVariant } = this.props;
        return (
            <tr>
                <td onClick={editVariant}>{variant.name}</td>
                <td>{variant.weight}</td>
                <td className={styles.actions}>
                    <IconButton name="expand_more" onClick={editVariant} />
                    <IconButton name="delete" onClick={removeVariant} />
                </td>
            </tr>
        );
    }
}

VariantViewComponent.propTypes = {
    variant: PropTypes.object,
    removeVariant: PropTypes.func,
    editVariant: PropTypes.func,
};

export default VariantViewComponent;
