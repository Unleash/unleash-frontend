import React, { useState } from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@material-ui/core';
import HeaderTitle from '../../common/HeaderTitle';
import PageContent from '../../common/PageContent';

const CreateEnvironment = () => {
    const [type, setType] = useState('development');
    const [envName, setEnvName] = useState('');
    const [envDisplayName, setEnvDisplayName] = useState('');

    const handleTypeChange = (event: React.FormEvent<HTMLInputElement>) => {
        setType(event.currentTarget.value);
    };

    const handleEnvNameChange = (e: React.FormEvent<HTMLInputElement>) =>
        setEnvName(e.currentTarget.value);

    const handleEnvDisplayName = (e: React.FormEvent<HTMLInputElement>) =>
        setEnvDisplayName(e.currentTarget.value);

    return (
        <PageContent headerContent={<HeaderTitle title="Create environment" />}>
            <p style={{ marginBottom: '2rem' }}>
                Environments allow you to manage your product lifecycle from
                local development through production. Your projects and feature
                toggles are accessible in all your environments, but they can
                take different configurations per environment. This means that
                you can enable a feature toggle in a development or test
                environment without enabling the feature toggle in the
                production environment.
            </p>

            <FormControl component="fieldset">
                <label style={{ fontWeight: 'bold' }}>Environment Type</label>

                <RadioGroup value={type} onChange={handleTypeChange}>
                     
                    <FormControlLabel
                        value="development"
                        label="Development"
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value="test"
                        label="Test"
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value="preproduction"
                        label="Pre production"
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value="production"
                        label="Production"
                        control={<Radio />}
                    />
                </RadioGroup>

                <h2
                    style={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        fontSize: '1rem',
                        marginTop: '2rem',
                    }}
                >
                    Environment Id
                </h2>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <p>
                        Environment id is a unique name for the env that you
                        will use in your SDK to retrieve correct configurations
                    </p>
                    <TextField
                        size="small"
                        variant="outlined"
                        rows={4}
                        label="Environment Id"
                        placeholder="A unique name for your environment"
                        error={''}
                        helperText={''}
                        style={{ maxWidth: '400px', marginTop: '1rem' }}
                        value={envName}
                        onChange={handleEnvNameChange}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <p>The display name is the name visible for other users.</p>
                    <TextField
                        size="small"
                        variant="outlined"
                        rows={4}
                        label="Display name"
                        placeholder="Optional name to be displayed in the admin panel"
                        error={''}
                        helperText={''}
                        style={{ maxWidth: '400px', marginTop: '1rem' }}
                        value={envDisplayName}
                        onChange={handleEnvDisplayName}
                    />
                </div>
            </FormControl>
        </PageContent>
    );
};

export default CreateEnvironment;
