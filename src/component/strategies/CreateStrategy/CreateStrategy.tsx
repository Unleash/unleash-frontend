import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import PageContent from '../../common/PageContent/PageContent';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';

import { styles as commonStyles, FormButtons } from '../../common';
import { trim } from '../../common/util';
import StrategyParameters from './StrategyParameters/StrategyParameters';
import { useHistory } from 'react-router-dom';
import useStrategiesApi from '../../../hooks/api/actions/useStrategiesApi/useStrategiesApi';

interface ICustomStrategyParams {
    name?: string;
    type?: string;
    description?: string;
    required?: boolean;
}

interface ICustomStrategyErrors {
    name?: string;
}

const CreateStrategy = ({ editMode = false }) => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [params, setParams] = useState<ICustomStrategyParams[]>([]);
    const [errors, setErrors] = useState<ICustomStrategyErrors>({});
    const { createStrategy, updateStrategy } = useStrategiesApi();

    const clearErrors = () => {
        setErrors({});
    };

    const getHeaderTitle = () => {
        if (editMode) return 'Edit strategy';
        return 'Create a new strategy';
    };

    const appParameter = () => {
        setParams(prev => [...prev, {}]);
    };

    const updateParameter = (index: number, updated: object) => {
        let item = { ...params[index] };
        params[index] = Object.assign({}, item, updated);
        setParams(prev => [...prev]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const parameters = (params || [])
            .filter(({ name }) => !!name)
            .map(
                ({
                    name,
                    type = 'string',
                    description = '',
                    required = false,
                }) => ({
                    name,
                    type,
                    description,
                    required,
                })
            );
        setParams(prev => [...parameters]);
        if (editMode) {
            await updateStrategy({ name, description, parameters: params });
            history.push(`/strategies/view/${name}`);
        } else {
            try {
                await createStrategy({ name, description, parameters: params });
                history.push(`/strategies`);
            } catch (e: any) {
                const STRATEGY_EXIST_ERROR = 'Error: Strategy with name';
                if (e.toString().includes(STRATEGY_EXIST_ERROR)) {
                    setErrors({
                        name: 'A strategy with this name already exists',
                    });
                }
            }
        }
    };

    const handleCancel = () => history.goBack();

    return (
        <PageContent headerContent={getHeaderTitle()}>
            <ConditionallyRender
                condition={editMode}
                show={
                    <Typography variant="body1">
                        Be careful! Changing a strategy definition might also
                        require changes to the implementation in the clients.
                    </Typography>
                }
            />

            <form
                onSubmit={handleSubmit}
                className={commonStyles.contentSpacing}
                style={{ maxWidth: '400px' }}
            >
                <TextField
                    label="Strategy name"
                    name="name"
                    placeholder=""
                    disabled={editMode}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    onChange={e => {
                        clearErrors();
                        setName(trim(e.target.value));
                    }}
                    value={name}
                    variant="outlined"
                    size="small"
                />

                <TextField
                    className={commonStyles.fullwidth}
                    multiline
                    rows={2}
                    label="Description"
                    name="description"
                    placeholder=""
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    variant="outlined"
                    size="small"
                />

                <StrategyParameters
                    input={params}
                    count={params.length}
                    updateParameter={updateParameter}
                />
                <Button
                    onClick={e => {
                        e.preventDefault();
                        appParameter();
                    }}
                    startIcon={<Add />}
                >
                    Add parameter
                </Button>

                <ConditionallyRender
                    condition={editMode}
                    show={
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ display: 'block' }}
                        >
                            Update
                        </Button>
                    }
                    elseShow={
                        <FormButtons
                            submitText={'Create'}
                            onCancel={handleCancel}
                        />
                    }
                />
            </form>
        </PageContent>
    );
};

CreateStrategy.propTypes = {
    editMode: PropTypes.bool,
};

export default CreateStrategy;
