import { IConstraint } from 'interfaces/strategy';
import React, { forwardRef, useImperativeHandle } from 'react';
import { ConstraintAccordion } from 'component/common/ConstraintAccordion/ConstraintAccordion';
import produce from 'immer';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import {
    CREATE_FEATURE_STRATEGY,
    UPDATE_FEATURE_STRATEGY,
} from 'component/providers/AccessProvider/permissions';
import { useWeakMap } from 'hooks/useWeakMap';
import { objectId } from 'utils/object-id';
import { useStyles } from './ConstraintAccordionList.styles';
import { createEmptyConstraint } from 'component/common/ConstraintAccordion/ConstraintAccordionList/createEmptyConstraint';
import ConditionallyRender from 'component/common/ConditionallyRender';

interface IConstraintAccordionListProps {
    projectId?: string;
    environmentId?: string;
    constraints: IConstraint[];
    setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
    showCreateButton?: boolean;
}

// Ref methods exposed by this component.
export interface IConstraintAccordionListRef {
    addConstraint: (contextName: string) => void;
}

// Extra form state for each constraint.
interface IConstraintAccordionListItemState {
    // Is the constraint currently being edited?
    editing?: boolean;
    // Is the constraint new (not yet saved)?
    unsaved?: boolean;
}

export const ConstraintAccordionList = forwardRef<
    IConstraintAccordionListRef | undefined,
    IConstraintAccordionListProps
>(
    (
        {
            projectId,
            environmentId,
            constraints,
            setConstraints,
            showCreateButton,
        },
        ref
    ) => {
        const state = useWeakMap<
            IConstraint,
            IConstraintAccordionListItemState
        >();
        const { context } = useUnleashContext();
        const styles = useStyles();

        const addConstraint = (contextName: string) => {
            const constraint = createEmptyConstraint(contextName);
            state.set(constraint, { editing: true, unsaved: true });
            setConstraints(prev => [...prev, constraint]);
        };

        useImperativeHandle(ref, () => ({
            addConstraint,
        }));

        const onAdd = () => {
            addConstraint(context[0].name);
        };

        const onEdit = (constraint: IConstraint) => {
            state.set(constraint, { editing: true });
        };

        const onCancel = (index: number) => {
            const constraint = constraints[index];
            state.get(constraint)?.unsaved && onRemove(index);
            state.set(constraint, {});
        };

        const onRemove = (index: number) => {
            const constraint = constraints[index];
            state.set(constraint, {});
            setConstraints(
                produce(draft => {
                    draft.splice(index, 1);
                })
            );
        };

        const onSave = (index: number, constraint: IConstraint) => {
            state.set(constraint, {});
            setConstraints(
                produce(draft => {
                    draft[index] = constraint;
                })
            );
        };

        if (context.length === 0) {
            return null;
        }

        return (
            <div className={styles.container}>
                <ConditionallyRender
                    condition={Boolean(showCreateButton)}
                    show={
                        <PermissionButton
                            type="button"
                            onClick={onAdd}
                            variant="text"
                            permission={[
                                UPDATE_FEATURE_STRATEGY,
                                CREATE_FEATURE_STRATEGY,
                            ]}
                            environmentId={environmentId}
                            projectId={projectId}
                        >
                            Add constraint
                        </PermissionButton>
                    }
                />
                {constraints.map((constraint, index) => (
                    <ConstraintAccordion
                        key={objectId(constraint)}
                        environmentId={environmentId}
                        constraint={constraint}
                        onEdit={onEdit.bind(null, constraint)}
                        onCancel={onCancel.bind(null, index, constraint)}
                        onDelete={onRemove.bind(null, index, constraint)}
                        onSave={onSave.bind(null, index)}
                        editing={Boolean(state.get(constraint)?.editing)}
                        compact
                    />
                ))}
            </div>
        );
    }
);
