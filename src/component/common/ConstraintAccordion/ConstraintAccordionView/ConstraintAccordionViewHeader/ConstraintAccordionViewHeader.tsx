import StringTruncator from '../../../StringTruncator/StringTruncator';
import { Chip, IconButton } from '@material-ui/core';
import { ConstraintIcon } from '../../ConstraintIcon';
import { Delete, Edit } from '@material-ui/icons';
import { IConstraint } from '../../../../../interfaces/strategy';

import { useStyles } from '../../ConstraintAccordion.styles';
import ConditionallyRender from '../../../ConditionallyRender';

interface IConstraintAccordionViewHeader {
    constraint: IConstraint;
    handleDelete: () => void;
    handleEdit: () => void;
    nonExpandable: boolean;
}

export const ConstraintAccordionViewHeader = ({
    constraint,
    handleEdit,
    handleDelete,
    nonExpandable,
}: IConstraintAccordionViewHeader) => {
    const styles = useStyles();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerMetaInfo}>
                <ConstraintIcon />
                <div style={{ minWidth: '175px' }}>
                    <StringTruncator
                        text={constraint.contextName}
                        maxWidth="175px"
                    />
                </div>

                <div style={{ minWidth: '220px' }}>
                    <p className={styles.operator}>{constraint.operator}</p>
                </div>
                <ConditionallyRender
                    condition={nonExpandable}
                    show={<Chip label={constraint.value} />}
                    elseShow={
                        <p>
                            {constraint.values.length}+ values. Expand to view
                        </p>
                    }
                />
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
