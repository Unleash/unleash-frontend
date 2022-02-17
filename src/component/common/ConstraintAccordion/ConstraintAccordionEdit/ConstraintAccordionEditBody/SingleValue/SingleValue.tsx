import { TextField } from '@material-ui/core';
import { useState } from 'react';

export const SingleValue = ({ setValue, value, type }) => {
    return (
        <>
            <h3>Add a single {type.toLowerCase()} value</h3>
            <div style={{ maxWidth: '300px' }}>
                <TextField
                    label={type}
                    name="value"
                    value={value}
                    onChange={e => setValue(e.target.value.trim())}
                    placeholder={`Enter a single ${type} value`}
                    style={{
                        width: '100%',
                        margin: '1rem 0',
                    }}
                    variant="outlined"
                    size="small"
                />
            </div>
        </>
    );
};
