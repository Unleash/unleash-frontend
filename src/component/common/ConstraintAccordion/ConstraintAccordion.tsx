import { useState } from 'react';
import { IConstraint } from '../../../interfaces/strategy';
import ConditionallyRender from '../ConditionallyRender';

import { ConstraintAccordionEdit } from './ConstraintAccordionEdit/ConstraintAccordionEdit';
import { ConstraintAccordionView } from './ConstraintAccordionView/ConstraintAccordionView';

interface IConstraintAccordionProps {
    editing: boolean;
    constraint: IConstraint;
    handleEdit: () => void;
    handleCancel: () => void;
    handleDelete: () => void;
    handleSave: () => void;
}

export const ConstraintAccordion = ({
    constraint,
    editing,
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
                />
            }
            elseShow={
                <ConstraintAccordionView
                    constraint={constraint}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            }
        />
    );
};
