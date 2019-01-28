import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Cell, Grid, Textfield, Tooltip, Icon } from 'react-mdl';

class VariantEditComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.name.inputRef.focus();
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
        this.props.updateVariant(variant);
    };

    updatePayload = e => {
        e.preventDefault();
        const variant = this.props.variant;
        variant.payload = {
            type: 'string',
            value: e.target.value,
        };
        this.props.updateVariant(variant);
    };

    render() {
        const { variant, closeVariant, removeVariant } = this.props;
        const payload = variant.payload ? variant.payload.value : '';
        return (
            <tr>
                <td style={{ width: '100%', backgroundColor: '#EFEFEF', textAlign: 'left' }}>
                    <div style={{ width: '100%', margin: 'auto' }}>
                        <Grid noSpacing>
                            <Cell col={6}>
                                <Textfield
                                    floatingLabel
                                    ref="name"
                                    label="Name"
                                    name="name"
                                    required
                                    value={variant.name}
                                    onChange={this.updateToggleName}
                                />
                            </Cell>
                            <Cell col={6} />
                        </Grid>
                        <Grid noSpacing>
                            <Cell col={11}>
                                <Textfield
                                    floatingLabel
                                    rows={1}
                                    label="Payload"
                                    name="payload"
                                    style={{ width: '100%' }}
                                    value={payload}
                                    onChange={this.updatePayload}
                                />
                            </Cell>
                            <Cell col={1} style={{ margin: 'auto' }}>
                                <Tooltip
                                    label={
                                        <span>
                                            Passed to the variant object. <br />
                                            Can be anything (json, value, csv)
                                        </span>
                                    }
                                >
                                    <Icon name="info" />
                                </Tooltip>
                            </Cell>
                        </Grid>
                        <a href="#close" onClick={closeVariant}>
                            Close
                        </a>
                    </div>
                </td>
                <td style={{ verticalAlign: 'top', textAlign: 'left', backgroundColor: '#EFEFEF' }}>
                    <Textfield
                        floatingLabel
                        label="Weight"
                        name="weight"
                        required
                        value={variant.weight}
                        style={{ width: '40px' }}
                        disabled
                        onChange={() => {}}
                    />
                </td>
                <td style={{ verticalAlign: 'top', textAlign: 'left', backgroundColor: '#EFEFEF' }}>
                    <IconButton name="expand_less" onClick={closeVariant} />
                    <IconButton name="delete" onClick={removeVariant} />
                </td>
            </tr>
        );
    }
}

VariantEditComponent.propTypes = {
    variant: PropTypes.object,
    removeVariant: PropTypes.func,
    updateVariant: PropTypes.func,
    closeVariant: PropTypes.func,
};

export default VariantEditComponent;
