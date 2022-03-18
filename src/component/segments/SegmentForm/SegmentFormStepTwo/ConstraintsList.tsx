import { IConstraint } from 'interfaces/strategy';
import React from 'react';
import { ConstraintAccordion } from 'component/common/ConstraintAccordion/ConstraintAccordion';
import produce from 'immer';
import { useWeakMap } from 'hooks/useWeakMap';
import { objectId } from 'utils/object-id';
import { useStyles } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/FeatureStrategyConstraints2.styles';

interface IConstraintsListProps {
    constraints: IConstraint[];
    setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
}

interface IConstraintFormState {
    saved?: boolean;
}

export const ConstraintsList = ({
    constraints,
    setConstraints,
}: IConstraintsListProps) => {
    const state = useWeakMap<IConstraint, IConstraintFormState>();
    const styles = useStyles();

    const onEdit = (constraint: IConstraint) => {
        state.set(constraint, { saved: false });
    };

    const onCancel = (index: number) => {
        const constraint = constraints[index];
        state.set(constraint, { saved: true });
    };

    const onRemove = (index: number) => {
        const constraint = constraints[index];
        state.set(constraint, {});
        setConstraints(prev => prev.filter((c, i) => i !== index));
    };

    const onSave = (index: number, constraint: IConstraint) => {
        state.set(constraint, { saved: true });
        setConstraints(
            produce(draft => {
                draft[index] = constraint;
            })
        );
    };

    if (constraints.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            {constraints?.map((constraint, index) => (
                <ConstraintAccordion
                    key={objectId(constraint)}
                    constraint={constraint}
                    onEdit={onEdit.bind(null, constraint)}
                    onCancel={onCancel.bind(null, index, constraint)}
                    onDelete={onRemove.bind(null, index, constraint)}
                    onSave={onSave.bind(null, index)}
                    editing={!state.get(constraint)?.saved}
                    compact
                />
            ))}
        </div>
    );
};
