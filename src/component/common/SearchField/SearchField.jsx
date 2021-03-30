import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/search';

import { useStyles } from './styles';

function SearchField({ value = '', updateValue }) {
    const styles = useStyles();

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
            <div className={styles.search}>
                <SearchIcon className={styles.searchIcon} />
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: styles.inputRoot,
                        input: styles.input,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={localValue}
                    onChange={handleCange}
                    onBlur={updateNow}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}

SearchField.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.func.isRequired,
};

export default SearchField;
