import { IFeatureStrategy, IConstraint } from 'interfaces/strategy';
import React, { useState } from 'react';
import { ConstraintAccordion } from 'component/common/ConstraintAccordion/ConstraintAccordion';
import produce from 'immer';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import {
    CREATE_FEATURE_STRATEGY,
    UPDATE_FEATURE_STRATEGY,
} from 'component/providers/AccessProvider/permissions';
import { createEmptyConstraint } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/createEmptyConstraint';

interface IFeatureStrategyConstraints2Props {
    projectId: string;
    environmentId: string;
    strategy: Partial<IFeatureStrategy>;
    setStrategy: React.Dispatch<
        React.SetStateAction<Partial<IFeatureStrategy>>
    >;
}

export const FeatureStrategyConstraints2 = ({
    projectId,
    environmentId,
    strategy,
    setStrategy,
}: IFeatureStrategyConstraints2Props) => {
    const [editIndexes, setEditIndexes] = useState<number[]>([]);
    const { context } = useUnleashContext();

    const stopEditingAll = () => {
        setEditIndexes([]);
    };

    const startEditingIndex = (index: number) => {
        setEditIndexes(prev => [...prev, index]);
    };

    const stopEditingIndex = (index: number) => {
        setEditIndexes(prev => prev.filter(editIndex => editIndex !== index));
    };

    const isEditingIndex = (index: number) => {
        return editIndexes.includes(index);
    };

    const onAddConstraint = () => {
        startEditingIndex(strategy.constraints?.length ?? 0);
        setStrategy(
            produce(draft => {
                draft.constraints = draft.constraints ?? [];
                draft.constraints.push(createEmptyConstraint(context));
            })
        );
    };

    const onSaveConstraint = (index: number) => (constraint: IConstraint) => {
        stopEditingIndex(index);
        setStrategy(
            produce(draft => {
                draft.constraints = draft.constraints ?? [];
                draft.constraints[index] = constraint;
            })
        );
    };

    const onRemoveConstraint = (index: number) => {
        stopEditingAll();
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
                    onEdit={startEditingIndex.bind(null, index)}
                    onCancel={stopEditingIndex.bind(null, index)}
                    onDelete={onRemoveConstraint.bind(null, index)}
                    onSave={onSaveConstraint(index)}
                    editing={isEditingIndex(index)}
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
