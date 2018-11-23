import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'react-mdl';

const labelStyle = {
    margin: '20px 0',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: '12px',
};

const InputPercentage = ({ name, value, minLabel = '0%', maxLabel = '100%', onChange }) => (
    <div style={{ marginBottom: '20px' }}>
        <div style={labelStyle}>
            {name}: {value}%
        </div>
        <span>
            <small>${minLabel}</small>
            <Slider min={0} max={100} defaultValue={value} value={value} onChange={onChange} label={name} />
            <small>${maxLabel}</small>
        </span>
    </div>
);

InputPercentage.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string,
};

export default InputPercentage;
