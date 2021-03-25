import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Slider, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    slider: {
        width: 450,
        maxWidth: '100%',
    },
    margin: {
        height: theme.spacing(3),
    },
}));

const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
    {
        value: 100,
        label: '100%',
    },
];

const InputPercentage = ({ name, value, onChange, disabled = false }) => {
    const classes = useStyles();

    const valuetext = value => `${value}%`;

    return (
        <div className={classes.slider}>
            <Typography id="discrete-slider-always" variant="subtitle2" gutterBottom>
                {name}
            </Typography>
            <br />
            <Slider
                min={0}
                max={100}
                value={value}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                onChange={onChange}
                valueLabelDisplay="on"
                disabled={disabled}
            />
        </div>
    );
};

InputPercentage.propTypes = {
    name: PropTypes.string,
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default InputPercentage;
