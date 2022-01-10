import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import Dialogue from '../../../../../common/Dialogue';

interface IFeatureStrategiesProductionGuard {
    show: boolean;
    onClick: () => void;
    onClose: () => void;
    primaryButtonText: string;
    loading: boolean;
}

const FeatureStrategiesProductionGuard = ({
    show,
    onClick,
    onClose,
    primaryButtonText,
    loading,
}: IFeatureStrategiesProductionGuard) => {
    const [checked, setIsChecked] = useState(
        JSON.parse(localStorage.getItem('hide') || 'false')
    );
    const handleOnchange = () => {
        setIsChecked(!checked);
        localStorage.setItem('hide', (!checked).toString());
    };
    return (
        <Dialogue
            title="Changing production environment!"
            open={show}
            primaryButtonText={primaryButtonText}
            secondaryButtonText="Cancel"
            onClick={onClick}
            onClose={onClose}
            disabledPrimaryButton={loading}
        >
            <Alert severity="error">
                WARNING. You are about to make changes to a production
                environment. These changes will affect your customers.
            </Alert>
            <p style={{ marginTop: '1rem' }}>
                Are you sure you want to proceed?
            </p>
            <FormControlLabel
                label="Don't show again"
                control={
                    <Checkbox checked={checked} onChange={handleOnchange} />
                }
            />
        </Dialogue>
    );
};

export default FeatureStrategiesProductionGuard;
