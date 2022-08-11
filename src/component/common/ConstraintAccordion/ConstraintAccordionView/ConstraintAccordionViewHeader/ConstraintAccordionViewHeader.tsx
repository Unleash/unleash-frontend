import { ConstraintIcon } from 'component/common/ConstraintAccordion/ConstraintIcon';
import { IConstraint } from 'interfaces/strategy';
import { ConstraintAccordionViewHeaderInfo } from './ConstraintAccordionViewHeaderInfo/ConstraintAccordionViewHeaderInfo';
import { ConstraintAccordionHeaderActions } from '../../ConstraintAccordionHeaderActions/ConstraintAccordionHeaderActions';
import { useStyles } from 'component/common/ConstraintAccordion/ConstraintAccordion.styles';

interface IConstraintAccordionViewHeaderProps {
    constraint: IConstraint;
    onDelete?: () => void;
    onEdit?: () => void;
    singleValue: boolean;
    expanded: boolean;
    allowExpand: (shouldExpand: boolean) => void;
    compact: boolean;
}

export const ConstraintAccordionViewHeader = ({
    constraint,
    onEdit,
    onDelete,
    singleValue,
    allowExpand,
    expanded,
    compact,
}: IConstraintAccordionViewHeaderProps) => {
    const { classes: styles } = useStyles();

    const iconSize = compact ? 15 : 25;
    const iconStyles = { width: iconSize, height: iconSize };

    return (
        <div className={styles.headerContainer}>
            <ConstraintIcon style={iconStyles} />
            <ConstraintAccordionViewHeaderInfo
                constraint={constraint}
                singleValue={singleValue}
                allowExpand={allowExpand}
                expanded={expanded}
            />
            <ConstraintAccordionHeaderActions
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    );
};
