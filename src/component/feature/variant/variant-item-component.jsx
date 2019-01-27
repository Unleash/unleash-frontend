import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Textfield } from 'react-mdl';

class VariantItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { editmode: false };
    }

    toggleEditMode = e => {
        e.preventDefault();
        this.setState({
            editmode: !this.state.editmode,
        });
    };

    updateToggleName = e => {
        e.preventDefault();
        const variant = this.props.variant;
        variant.name = e.target.value;
        this.props.update(variant);
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
            borderBottom: 0,
        };

        return (
            <tbody>
                {this.state.editmode ? (
                    <tr>
                        <td colSpan="3" style={{ borderTop: 0 }}>
                            <section>
                                <Textfield
                                    floatingLabel
                                    rows={1}
                                    label="Name"
                                    required
                                    value={variant.name}
                                    onChange={this.updateToggleName}
                                    onBlur={this.updateToggleName}
                                />
                                <Textfield floatingLabel rows={2} label="Payload" value="" expandable />
                            </section>
                            <IconButton name="save" onClick={this.toggleEditMode} />
                        </td>
                    </tr>
                ) : (
                    <tr>
                        <td style={style}>{variant.name}</td>
                        <td>{variant.weight}</td>
                        <td>
                            <IconButton name="edit" onClick={this.toggleEditMode} />
                            <IconButton name="delete" onClick={remove} />
                        </td>
                    </tr>
                )}
            </tbody>
        );
    }
}

VariantItemComponent.propTypes = {
    variant: PropTypes.object,
    remove: PropTypes.func,
    update: PropTypes.func,
};

export default VariantItemComponent;
