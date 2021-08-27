import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@material-ui/core';

import FlexibleStrategy from './FlexibleStrategy';
import DefaultStrategy from './default-strategy';
import UserWithIdStrategy from './user-with-id-strategy';
import GeneralStrategy from './general-strategy';
import StrategyConstraints from '../StrategyConstraint/StrategyConstraintInput';

import { getHumanReadbleStrategyName } from '../../../../utils/strategy-names';
import Dialogue from '../../../common/Dialogue';

const EditStrategyModal = ({
    onCancel,
    strategy,
    saveStrategy,
    updateStrategy,
    strategyDefinition,
    context,
}) => {
    const updateParameters = parameters => {
        const updatedStrategy = { ...strategy, parameters };
        updateStrategy(updatedStrategy);
    };

    const updateConstraints = constraints => {
        const updatedStrategy = { ...strategy, constraints };
        updateStrategy(updatedStrategy);
    };

    const updateParameter = async (field, value) => {
        const parameters = { ...strategy.parameters };
        parameters[field] = value;
        updateParameters(parameters);
    };

    const resolveInputType = () => {
        switch (strategyDefinition.name) {
            case 'default':
                return DefaultStrategy;
            case 'flexibleRollout':
                return FlexibleStrategy;
            case 'userWithId':
                return UserWithIdStrategy;
            default:
                return GeneralStrategy;
        }
    };

    const Type = resolveInputType();

    const { parameters } = strategy;

    return (
        <Dialogue
            open={!!strategy}
            aria-labelledby="form-dialog-title"
            fullWidth
            onClose={onCancel}
            onClick={saveStrategy}
            title={`Configure ${getHumanReadbleStrategyName(
                strategy.name
            )} strategy`}
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
            maxWidth="md"
        >
            <div>
                <StrategyConstraints
                    updateConstraints={updateConstraints}
                    constraints={strategy.constraints || []}
                />
            </div>

            <br />
            <br />
            <Type
                parameters={parameters}
                updateParameter={updateParameter}
                strategyDefinition={strategyDefinition}
                editable
                context={context}
            />
        </Dialogue>
    );
};

EditStrategyModal.propTypes = {
    strategy: PropTypes.object.isRequired,
    updateStrategy: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveStrategy: PropTypes.func.isRequired,
    strategyDefinition: PropTypes.object.isRequired,
    context: PropTypes.array.isRequired,
};

export default EditStrategyModal;
