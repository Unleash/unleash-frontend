import { IConstraint } from '../../../interfaces/strategy';
import ConditionallyRender from '../ConditionallyRender';

import { ConstraintAccordionEdit } from './ConstraintAccordionEdit/ConstraintAccordionEdit';
import { ConstraintAccordionView } from './ConstraintAccordionView/ConstraintAccordionView';

interface IConstraintAccordionProps {
    compact: boolean;
    editing: boolean;
    environmentId: string;
    constraint: IConstraint;
    handleEdit: () => void;
    handleCancel: () => void;
    handleDelete: () => void;
    handleSave: (constraint: IConstraint) => void;
}

export const ConstraintAccordion = ({
    constraint,
    compact = false,
    editing,
    environmentId,
    handleEdit,
    handleCancel,
    handleDelete,
    handleSave,
}: IConstraintAccordionProps) => {
    if (!constraint) return null;

    return (
        <ConditionallyRender
            condition={editing}
            show={
                <ConstraintAccordionEdit
                    constraint={constraint}
                    handleCancel={handleCancel}
                    handleSave={handleSave}
                    compact={compact}
                />
            }
            elseShow={
                <ConstraintAccordionView
                    constraint={constraint}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    environmentId={environmentId}
                />
            }
        />
    );
};
