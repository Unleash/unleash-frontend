import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import useEnvironmentApi from '../../../../hooks/api/actions/useEnvironmentApi/useEnvironmentApi';
import {
    IEnvironment,
    IEnvironmentPayload,
} from '../../../../interfaces/environments';
import Dialogue from '../../../common/Dialogue';
import Input from '../../../common/Input/Input';
import CreateEnvironmentSuccessCard from '../../CreateEnvironment/CreateEnvironmentSuccess/CreateEnvironmentSuccessCard/CreateEnvironmentSuccessCard';
import { useStyles } from './EnvironmentDeleteConfirm.styles';

interface IEnviromentDeleteConfirmProps {
    env: IEnvironment;
    open: boolean;
    setSelectedEnv: React.Dispatch<React.SetStateAction<IEnvironment>>;
    setDeldialogue: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteEnvironment: (name: string) => Promise<void>;
}

const EnvironmentDeleteConfirm = ({
    env,
    open,
    setSelectedEnv,
    setDeldialogue,
    handleDeleteEnvironment,
}: IEnviromentDeleteConfirmProps) => {
    const styles = useStyles();
    const [name, setName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.currentTarget.value);

    const handleCancel = () => {
        setSelectedEnv({});
        setDeldialogue(false);
        setName('');
    };

    return (
        <Dialogue
            title="Are you sure you want to delete this environment?"
            open={open}
            primaryButtonText="Delete environment"
            secondaryButtonText="Cancel"
            onClick={handleDeleteEnvironment}
            disabledPrimaryButton={env?.name !== name}
            onClose={handleCancel}
        >
            <Alert severity="error">
                Danger. Deleting this environment will result in removing all
                strategies that are active in this environment across all
                feature toggles.
            </Alert>
            <CreateEnvironmentSuccessCard
                name={env?.name}
                displayName={env?.displayName}
                type={env?.type}
            />

            <p className={styles.deleteParagraph}>
                In order to delete this environment, please enter the name of
                the environment in the textfield below:{' '}
                <strong>{env?.name}</strong>
            </p>

            <Input
                onChange={handleChange}
                value={name}
                label="Environment name"
                className={styles.environmentDeleteInput}
            />
        </Dialogue>
    );
};

export default EnvironmentDeleteConfirm;
