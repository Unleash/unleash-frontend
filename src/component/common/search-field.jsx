import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import { TextField } from '@material-ui/core';

function SearchField({ value = '', updateValue }) {
    const [localValue, setLocalValue] = useState(value);
    const debounceUpdateValue = debounce(updateValue, 500);

    const handleCange = e => {
        e.preventDefault();
        const v = e.target.value || '';
        setLocalValue(v);
        debounceUpdateValue(v);
    };

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            updateValue(localValue);
        }
    };

    const updateNow = () => {
        updateValue(localValue);
    };

    return (
        <div>
            <TextField
                value={localValue}
                onChange={handleCange}
                onBlur={updateNow}
                onKeyPress={handleKeyPress}
                label="Search"
                style={{ width: '500px', maxWidth: '80%' }}
                variant="outlined"
                size="small"
            />
        </div>
    );
}

SearchField.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.func.isRequired,
};

export default SearchField;
