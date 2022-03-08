import { IFeatureStrategy, IConstraint } from 'interfaces/strategy';
import React, { useState } from 'react';
import { ConstraintAccordion } from 'component/common/ConstraintAccordion/ConstraintAccordion';
import produce from 'immer';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import { IUnleashContextDefinition } from 'interfaces/context';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import {
    CREATE_FEATURE_STRATEGY,
    UPDATE_FEATURE_STRATEGY,
} from 'component/providers/AccessProvider/permissions';
import { FeatureStrategyFormMode } from 'component/feature/FeatureStrategy/FeatureStrategyForm/FeatureStrategyForm';

interface IFeatureStrategyConstraints2Props {
    mode: FeatureStrategyFormMode;
    projectId: string;
    environmentId: string;
    strategy: Partial<IFeatureStrategy>;
    setStrategy: React.Dispatch<
        React.SetStateAction<Partial<IFeatureStrategy>>
    >;
}

export const FeatureStrategyConstraints2 = ({
    mode,
    projectId,
    environmentId,
    strategy,
    setStrategy,
}: IFeatureStrategyConstraints2Props) => {
    const [editIndex, setEditIndex] = useState<number>();
    const { context } = useUnleashContext();

    const stopEditing = () => {
        setEditIndex(undefined);
    };

    const onAddConstraint = () => {
        if (mode === 'create') {
            // When creating a new strategy, new constraints should start in edit mode.
            // When editing an existing strategy, new constraints should start closed.
            setEditIndex(strategy.constraints?.length ?? 0);
        }
        setStrategy(
            produce(draft => {
                draft.constraints = draft.constraints ?? [];
                draft.constraints.push(createEmptyConstraint(context));
            })
        );
    };

    const onSaveConstraint = (index: number) => (constraint: IConstraint) => {
        stopEditing();
        setStrategy(
            produce(draft => {
                draft.constraints = draft.constraints ?? [];
                draft.constraints[index] = constraint;
            })
        );
    };

    const onRemoveConstraint = (index: number) => {
        stopEditing();
        setStrategy(
            produce(draft => {
                draft.constraints?.splice(index, 1);
            })
        );
    };

    return (
        <>
            {strategy.constraints?.map((constraint, index) => (
                <ConstraintAccordion
                    key={index}
                    environmentId={environmentId}
                    constraint={constraint}
                    onEdit={setEditIndex.bind(null, index)}
                    onCancel={stopEditing}
                    onDelete={onRemoveConstraint.bind(null, index)}
                    onSave={onSaveConstraint(index)}
                    editing={editIndex === index}
                    compact
                />
            ))}
            <PermissionButton
                type="button"
                onClick={onAddConstraint}
                variant="text"
                permission={[UPDATE_FEATURE_STRATEGY, CREATE_FEATURE_STRATEGY]}
                environmentId={environmentId}
                projectId={projectId}
            >
                Add constraints
            </PermissionButton>
        </>
    );
};

const createEmptyConstraint = (
    context: IUnleashContextDefinition[]
): IConstraint => {
    return {
        contextName: context[0].name,
        operator: 'IN',
        values: [],
        value: '',
        caseInsensitive: false,
        inverted: false,
    };
};
