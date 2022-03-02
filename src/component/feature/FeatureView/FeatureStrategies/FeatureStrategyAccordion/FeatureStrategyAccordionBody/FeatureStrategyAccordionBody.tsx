import FlexibleStrategy from '../../common/FlexibleStrategy/FlexibleStrategy';
import {
    IConstraint,
    IFeatureStrategy,
} from '../../../../../../interfaces/strategy';
import useUnleashContext from '../../../../../../hooks/api/getters/useUnleashContext/useUnleashContext';
import useStrategies from '../../../../../../hooks/api/getters/useStrategies/useStrategies';
import GeneralStrategy from '../../common/GeneralStrategy/GeneralStrategy';
import UserWithIdStrategy from '../../common/UserWithIdStrategy/UserWithId';
import StrategyConstraints from '../../common/StrategyConstraints/StrategyConstraints';
import { useContext, useState } from 'react';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import useUiConfig from '../../../../../../hooks/api/getters/useUiConfig/useUiConfig';
import { C } from '../../../../../common/flags';
import { useStyles } from './FeatureStrategyAccordionBody.styles';
import Dialogue from '../../../../../common/Dialogue';
import DefaultStrategy from '../../common/DefaultStrategy/DefaultStrategy';
import { ADD_CONSTRAINT_ID } from '../../../../../../testIds';
import AccessContext from '../../../../../../contexts/AccessContext';
import {
    CREATE_FEATURE_STRATEGY,
    UPDATE_FEATURE_STRATEGY,
} from '../../../../../providers/AccessProvider/permissions';
import Constraint from '../../../../../common/Constraint/Constraint';
import PermissionButton from '../../../../../common/PermissionButton/PermissionButton';
import { useParams } from 'react-router';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import FeatureStrategiesUIContext from '../../../../../../contexts/FeatureStrategiesUIContext';
import { ConstraintAccordion } from '../../../../../common/ConstraintAccordion/ConstraintAccordion';
import cloneDeep from 'lodash.clonedeep';

interface IFeatureStrategyAccordionBodyProps {
    strategy: IFeatureStrategy;
    setStrategyParams: () => any;
    updateParameters: (field: string, value: any) => any;
    updateConstraints: (constraints: IConstraint[]) => void;
    constraints: IConstraint[];
    setStrategyConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
}

const FeatureStrategyAccordionBody: React.FC<
    IFeatureStrategyAccordionBodyProps
> = ({
    strategy,
    updateParameters,
    children,
    constraints,
    updateConstraints,
    setStrategyConstraints,
    localConstraints,
    setLocalConstraints,
}) => {
    const styles = useStyles();
    const { projectId } = useParams<IFeatureViewParams>();
    const [constraintError, setConstraintError] = useState({});
    const { strategies } = useStrategies();
    const { uiConfig } = useUiConfig();
    const [showConstraints, setShowConstraints] = useState(false);
    const { hasAccess } = useContext(AccessContext);
    const { activeEnvironment } = useContext(FeatureStrategiesUIContext);

    const { context } = useUnleashContext();

    const contextNames = context.map(context => context.name);

    const resolveInputType = () => {
        switch (strategy?.name) {
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

    const resolveStrategyDefinition = () => {
        const definition = strategies.find(
            definition => definition.name === strategy.name
        );

        return definition;
    };

    const saveConstraintsLocally = () => {
        let valid = true;

        constraints.forEach((constraint, index) => {
            const { values } = constraint;

            if (values.length === 0) {
                setConstraintError(prev => ({
                    ...prev,
                    [`${constraint.contextName}-${index}`]:
                        'You need to specify at least one value',
                }));
                valid = false;
            }
        });

        if (valid) {
            setShowConstraints(false);
            setStrategyConstraints(constraints);
        }
    };

    const handleSave = (index: number) => (constraint: IConstraint) => {
        // Update local state, then update the feature cache
        const newConstraints = cloneDeep(localConstraints);
        newConstraints[index] = { constraint, metadata: {} };

        setLocalConstraints(newConstraints);
        const formattedConstraints = newConstraints.map(
            constraintsObject => constraintsObject.constraint
        );
        updateConstraints(formattedConstraints);
    };

    const handleEdit = (index: number) => {
        setLocalConstraints(prev => {
            const newArray = [...cloneDeep(prev)];

            const constraint = {
                ...prev[index],
                metadata: { ...prev[index].metadata, editing: true },
            };
            newArray[index] = constraint;

            return newArray;
        });
    };

    const handleDelete = (index: number) => {
        setLocalConstraints(prev => {
            const newArray = [...cloneDeep(prev)];
            newArray.splice(index, 1);

            return newArray;
        });
    };

    const handleCancel = (index: number) => {
        const constraint = localConstraints[index];

        if (constraint.metadata.new) {
            setLocalConstraints(prev => {
                const newArray = [...cloneDeep(prev)];
                newArray.splice(index, 1);
                return newArray;
            });
            return;
        }
        setLocalConstraints(prev => {
            const newArray = [...cloneDeep(prev)];

            const constraint = {
                ...prev[index],
                metadata: { ...prev[index].metadata, editing: false },
            };
            newArray[index] = constraint;

            return newArray;
        });
    };

    const renderConstraints = () => {
        if (localConstraints?.length === 0) {
            return (
                <p className={styles.noConstraints}>
                    No constraints configured
                </p>
            );
        }
        return localConstraints.map((localConstraint, index) => {
            return (
                <>
                    <ConstraintAccordion
                        constraint={localConstraint.constraint}
                        editing={localConstraint.metadata.editing}
                        handleSave={handleSave(index)}
                        handleEdit={() => handleEdit(index)}
                        handleDelete={() => handleDelete(index)}
                        handleCancel={() => handleCancel(index)}
                    />
                    {/* <Constraint
                        constraint={constraint}
                        editCallback={() => {
                            setShowConstraints(true);
                        }}
                        deleteCallback={() => {
                            removeConstraint(index);
                        }}
                        key={`${constraint.contextName}-${index}`}
                    /> */}
                </>
            );
        });
    };

    const removeConstraint = (index: number) => {
        const updatedConstraints = [...constraints];
        updatedConstraints.splice(index, 1);

        updateConstraints(updatedConstraints);
    };

    const closeConstraintDialog = () => {
        setShowConstraints(false);
        const filteredConstraints = constraints.filter(constraint => {
            return constraint.values.length > 0;
        });
        updateConstraints(filteredConstraints);
    };

    const Type = resolveInputType();
    const definition = resolveStrategyDefinition();

    const { parameters } = strategy;
    const ON = uiConfig.flags[C];

    const addConstraint = () => {
        setLocalConstraints(prev => [...prev, createConstraint()]);
    };

    const createConstraint = () => {
        return {
            constraint: {
                contextName: contextNames[0],
                operator: 'IN',
                values: [],
                value: '',
                caseInsensitive: false,
                inverted: false,
            },
            metadata: {
                editing: true,
                new: true,
            },
        };
    };

    const editable =
        hasAccess(UPDATE_FEATURE_STRATEGY, projectId, activeEnvironment.name) ||
        hasAccess(CREATE_FEATURE_STRATEGY, projectId, activeEnvironment.name);

    return (
        <div className={styles.accordionContainer}>
            <ConditionallyRender
                condition={ON}
                show={
                    <>
                        <p className={styles.constraintHeader}>Constraints</p>
                        {renderConstraints()}

                        <PermissionButton
                            className={styles.addConstraintBtn}
                            onClick={addConstraint}
                            variant={'text'}
                            data-test={ADD_CONSTRAINT_ID}
                            permission={[
                                UPDATE_FEATURE_STRATEGY,
                                CREATE_FEATURE_STRATEGY,
                            ]}
                            environmentId={activeEnvironment.name}
                            projectId={projectId}
                        >
                            + Add constraints
                        </PermissionButton>
                    </>
                }
            />

            {/* <Dialogue
                title="Define constraints"
                open={showConstraints}
                onClick={saveConstraintsLocally}
                primaryButtonText="Update constraints"
                secondaryButtonText="Cancel"
                onClose={closeConstraintDialog}
                fullWidth
                maxWidth="md"
            >
                <StrategyConstraints
                    updateConstraints={updateConstraints}
                    constraints={constraints || []}
                    constraintError={constraintError}
                    setConstraintError={setConstraintError}
                />
            </Dialogue> */}

            <Type
                parameters={parameters}
                updateParameter={updateParameters}
                strategyDefinition={definition}
                context={context}
                editable={editable}
            />

            {children}
        </div>
    );
};

export default FeatureStrategyAccordionBody;
