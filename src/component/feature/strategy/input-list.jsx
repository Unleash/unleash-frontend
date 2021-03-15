import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Chip, Icon } from '@material-ui/core';

export default class InputList extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        list: PropTypes.array.isRequired,
        setConfig: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            input: '',
        };
    }

    onBlur = e => {
        this.setValue(e);
    };

    onKeyDown = e => {
        if (e.key === 'Enter') {
            this.setValue(e);
            e.preventDefault();
            e.stopPropagation();
        }
    };

    setValue = evt => {
        evt.preventDefault();
        const value = evt.target.value;

        const { name, list, setConfig } = this.props;
        if (value) {
            const newValues = value.split(/,\s*/).filter(a => !list.includes(a));
            if (newValues.length > 0) {
                const newList = list.concat(newValues).filter(a => a);
                setConfig(name, newList.join(','));
            }
            this.setState({ input: '' });
        }
    };

    onClose(index) {
        const { name, list, setConfig } = this.props;
        list[index] = null;
        setConfig(name, list.length === 1 ? '' : list.filter(Boolean).join(','));
    }

    onChange = e => {
        this.setState({ input: e.currentTarget.value });
    };

    render() {
        const { name, list, disabled } = this.props;
        return (
            <div>
                <strong>List of {name}</strong>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        margin: '10px 0',
                    }}
                >
                    {list.map((entryValue, index) => (
                        <Chip
                            key={index + entryValue}
                            label={entryValue}
                            style={{ marginRight: '3px', border: '1px solid' }}
                            onDelete={disabled ? undefined : () => this.onClose(index)}
                            title="Remove value"
                        />
                    ))}
                </div>
                {disabled ? (
                    ''
                ) : (
                    <div style={{ display: 'flex' }}>
                        <TextField
                            name={`input_field`}
                            variant="outlined"
                            label="Add items:"
                            value={this.state.input}
                            size="small"
                            placeholder=""
                            onBlur={this.onBlur}
                            onChange={this.onChange}
                            onKeyDown={this.onKeyDown}
                        />
                        <IconButton onClick={this.setValue}>
                            <Icon>add</Icon>
                        </IconButton>
                    </div>
                )}
            </div>
        );
    }
}
