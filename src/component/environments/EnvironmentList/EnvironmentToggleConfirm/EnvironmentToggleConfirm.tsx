import { capitalize } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { IEnvironment } from '../../../../interfaces/environments';
import Dialogue from '../../../common/Dialogue';
import CreateEnvironmentSuccessCard from '../../CreateEnvironment/CreateEnvironmentSuccess/CreateEnvironmentSuccessCard/CreateEnvironmentSuccessCard';

interface IEnvironmentToggleConfirmProps {
    env: IEnvironment;
    open: boolean;
    setToggleDialog: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmToggleEnvironment: () => void;
}

const EnvironmentToggleConfirm = ({
    env,
    open,
    setToggleDialog,
    handleConfirmToggleEnvironment,
}: IEnvironmentToggleConfirmProps) => {
    let text = env.enabled ? 'enable' : 'disable';

    const handleCancel = () => {
        setToggleDialog(false);
    };

    return (
        <Dialogue
            title={`Are you sure you want to ${text} this environment?`}
            open={open}
            primaryButtonText={capitalize(text)}
            secondaryButtonText="Cancel"
            onClick={handleConfirmToggleEnvironment}
            onClose={handleCancel}
        >
            <Alert severity="info">
                Disabling an environment will not effect any strategies that
                already exist in that environment, but it will make it
                unavailable as a selection option for new activation strategies.
            </Alert>
            <CreateEnvironmentSuccessCard
                name={env?.name}
                displayName={env?.displayName}
                type={env?.type}
            />
        </Dialogue>
    );
};

export default EnvironmentToggleConfirm;
