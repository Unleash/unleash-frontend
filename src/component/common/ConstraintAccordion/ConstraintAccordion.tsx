import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useState } from 'react';
import { IConstraint } from '../../../interfaces/strategy';
import ConditionallyRender from '../ConditionallyRender';

import { useStyles } from './ConstraintAccordion.styles';
import { ConstraintAccordionEdit } from './ConstraintAccordionEdit/ConstraintAccordionEdit';
import { ConstraintAccordionEditHeader } from './ConstraintAccordionEdit/ConstraintAccordionEditHeader/ConstraintAccordionEditHeader';
import { ConstraintAccordionView } from './ConstraintAccordionView/ConstraintAccordionView';
import { ConstraintAccordionViewBody } from './ConstraintAccordionView/ConstraintAccordionViewBody/ConstraintAccordionViewBody';
import { ConstraintAccordionViewHeader } from './ConstraintAccordionView/ConstraintAccordionViewHeader/ConstraintAccordionViewHeader';

interface IConstraintAccordionProps {
    initialMode?: boolean;
    constraint: IConstraint;
}

export const ConstraintAccordion = ({
    initialMode = false,
    constraint,
}: IConstraintAccordionProps) => {
    const [editMode, setEditMode] = useState(initialMode);

    if (!constraint) return null;

    return (
        <ConditionallyRender
            condition={editMode}
            show={<ConstraintAccordionEdit constraint={constraint} />}
            elseShow={
                <ConstraintAccordionView
                    setEditMode={setEditMode}
                    constraint={constraint}
                />
            }
        />
    );
};
