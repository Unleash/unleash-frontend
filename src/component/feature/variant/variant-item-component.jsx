import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'react-mdl';

class VariantItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { editmode: false };
    }

    toggleEditMode = e => {
        e.preventDefault();
        this.setState({
            editmode: true,
        });
    };

    updateToggleName = e => {
        e.preventDefault();
        const variant = this.props.variant;
        variant.name = e.target.value;
        this.props.update(variant);
        this.setState({
            editmode: false,
        });
    };

    renderName(name) {
        return this.state.editmode ? (
            <input name="name" defaultValue={name} onBlur={this.updateToggleName} />
        ) : (
            <span>{name}</span>
        );
    }

    render() {
        const { variant, remove } = this.props;

        const style = {
            width: '174px',
            textAlign: 'left',
        };

        return (
            <tr>
                <td style={style} onClick={this.toggleEditMode}>
                    {this.renderName(variant.name)}
                </td>
                <td>{variant.weight}</td>
                <td>
                    <IconButton name="delete" onClick={remove} />
                </td>
            </tr>
        );
    }
}

VariantItemComponent.propTypes = {
    variant: PropTypes.object,
    remove: PropTypes.func,
    update: PropTypes.func,
};

export default VariantItemComponent;
