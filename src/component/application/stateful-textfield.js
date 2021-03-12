import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function StatefulTextfield({ value, label, placeholder, rows, onBlur }) {
    const [localValue, setLocalValue] = useState(value);

    const onChange = e => {
        e.preventDefault();
        setLocalValue(e.target.value);
    };

    return (
        <TextField
            style={{ width: '100%' }}
            label={label}
            placeholder={placeholder}
            rows={rows}
            value={localValue}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}

StatefulTextfield.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    onBlur: PropTypes.func.isRequired,
};

export default StatefulTextfield;
