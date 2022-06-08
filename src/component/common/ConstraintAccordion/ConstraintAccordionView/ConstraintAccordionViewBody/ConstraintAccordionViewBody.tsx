import { Chip } from '@mui/material';
import { ImportExportOutlined, TextFormatOutlined } from '@mui/icons-material';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { useState } from 'react';
import { stringOperators } from 'constants/operators';
import { IConstraint } from 'interfaces/strategy';
import { oneOf } from 'utils/oneOf';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from 'component/common/ConstraintAccordion/ConstraintAccordion.styles';
import { ConstraintValueSearch } from 'component/common/ConstraintAccordion/ConstraintValueSearch/ConstraintValueSearch';
import { formatConstraintValue } from 'utils/formatConstraintValue';
import { useLocationSettings } from 'hooks/useLocationSettings';

interface IConstraintAccordionViewBodyProps {
    constraint: IConstraint;
}

export const ConstraintAccordionViewBody = ({
    constraint,
}: IConstraintAccordionViewBodyProps) => {
    const { classes: styles } = useStyles();
    const { locationSettings } = useLocationSettings();

    return (
        <div>
            <ConditionallyRender
                condition={
                    oneOf(stringOperators, constraint.operator) &&
                    Boolean(constraint.caseInsensitive)
                }
                show={
                    <p className={styles.settingsParagraph}>
                        <TextFormatOutlined className={styles.settingsIcon} />{' '}
                        Case insensitive setting is active
                    </p>
                }
            />

            <ConditionallyRender
                condition={Boolean(constraint.inverted)}
                show={
                    <p className={styles.settingsParagraph}>
                        <ImportExportOutlined className={styles.settingsIcon} />{' '}
                        Operator is negated
                    </p>
                }
            />

            <div className={styles.valuesContainer}>
                <MultipleValues values={constraint.values} />
                <SingleValue
                    value={formatConstraintValue(constraint, locationSettings)}
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
    const { classes: styles } = useStyles();
    if (!value) return null;

    return (
        <div className={styles.singleValueView}>
            <p className={styles.singleValueText}>Value must be {operator}</p>{' '}
            <Chip
                label={
                    <StringTruncator
                        maxWidth="400"
                        text={value}
                        maxLength={50}
                    />
                }
                className={styles.chip}
            />
        </div>
    );
};

interface IMultipleValuesProps {
    values: string[] | undefined;
}

const MultipleValues = ({ values }: IMultipleValuesProps) => {
    const [filter, setFilter] = useState('');
    const { classes: styles } = useStyles();

    if (!values || values.length === 0) return null;

    return (
        <>
            <ConditionallyRender
                condition={values.length > 20}
                show={
                    <ConstraintValueSearch
                        filter={filter}
                        setFilter={setFilter}
                    />
                }
            />
            {values
                .filter(value => value.includes(filter))
                .map((value, index) => (
                    <Chip
                        key={`${value}-${index}`}
                        label={
                            <StringTruncator
                                maxWidth="400"
                                text={value}
                                maxLength={50}
                                className={styles.chipValue}
                            />
                        }
                        className={styles.chip}
                    />
                ))}
        </>
    );
};
