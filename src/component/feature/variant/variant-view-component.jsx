import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'react-mdl';

class VariantViewComponent extends Component {
    render() {
        const { variant, editVariant, removeVariant } = this.props;
        return (
            <tr onClick={editVariant}>
                <td style={{ textAlign: 'left', width: '100%' }}>{variant.name}</td>
                <td style={{ textAlign: 'left' }}>{variant.weight}</td>
                <td style={{ textAlign: 'left' }}>
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
