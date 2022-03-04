import { Chip } from '@material-ui/core';
import { ImportExportOutlined, TextFormatOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { stringOperators } from '../../../../../constants/operators';
import { IConstraint } from '../../../../../interfaces/strategy';
import { oneOf } from '../../../../../utils/one-of';
import ConditionallyRender from '../../../ConditionallyRender';
import { useStyles } from '../../ConstraintAccordion.styles';
import { ConstraintValueSearch } from '../../ConstraintValueSearch/ConstraintValueSearch';

interface IConstraintAccordionViewBodyProps {
    constraint: IConstraint;
}

export const ConstraintAccordionViewBody = ({
    constraint,
}: IConstraintAccordionViewBodyProps) => {
    const styles = useStyles();

    return (
        <div>
            <ConditionallyRender
                condition={oneOf(stringOperators, constraint.operator)}
                show={
                    <p className={styles.settingsParagraph}>
                        <TextFormatOutlined className={styles.settingsIcon} />{' '}
                        {constraint.caseInsensitive
                            ? 'Case insensitive setting is active'
                            : 'Case insensitive setting is not active'}
                    </p>
                }
            />

            <p className={styles.settingsParagraph}>
                <ImportExportOutlined className={styles.settingsIcon} />{' '}
                {constraint.inverted
                    ? 'Operator is inverted'
                    : 'Operator is not inverted'}
            </p>

            <div className={styles.valuesContainer}>
                <MultipleValues values={constraint.values} />
                <SingleValue
                    value={constraint.value}
                    operator={constraint.operator}
                />
            </div>
        </div>
    );
};

interface ISingleValueProps {
    value: string | undefined;
    operator: string;
}

const SingleValue = ({ value, operator }: ISingleValueProps) => {
    const styles = useStyles();
    if (!value) return null;

    return (
        <div className={styles.singleValueView}>
            <p className={styles.singleValueText}>Value must {operator}</p>{' '}
            <Chip label={value} className={styles.chip} />
        </div>
    );
};

interface IMultipleValuesProps {
    values: string[] | undefined;
}

const MultipleValues = ({ values }: IMultipleValuesProps) => {
    const [filter, setFilter] = useState('');
    const styles = useStyles();

    if (!values || values.length === 0) return null;

    return (
        <>
            <ConstraintValueSearch filter={filter} setFilter={setFilter} />
            {values
                .filter(value => value.includes(filter))
                .map((value, index) => (
                    <Chip
                        key={`${value}-${index}`}
                        label={value}
                        className={styles.chip}
                    />
                ))}
        </>
    );
};
