import StringTruncator from '../../../StringTruncator/StringTruncator';
import { IconButton } from '@material-ui/core';
import { ConstraintIcon } from '../../ConstraintIcon';
import { Delete, Edit } from '@material-ui/icons';
import { IConstraint } from '../../../../../interfaces/strategy';

import { useStyles } from '../../ConstraintAccordion.styles';
import { truncate } from 'fs/promises';

interface IConstraintAccordionViewHeader {
    constraint: IConstraint;
    handleEdit: any;
}

export const ConstraintAccordionViewHeader = ({
    constraint,
    handleEdit,
    handleDelete,
}: IConstraintAccordionViewHeader) => {
    const styles = useStyles();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerMetaInfo}>
                <ConstraintIcon />
                <StringTruncator text={constraint.contextName} maxWidth="200" />
                <p className={styles.operator}>{constraint.operator}</p>
                <p>30+ values. Expand to view</p>
            </div>
            <div className={styles.headerActions}>
                <IconButton onClick={() => handleEdit()}>
                    <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete()}>
                    <Delete />
                </IconButton>
            </div>
        </div>
    );
};
