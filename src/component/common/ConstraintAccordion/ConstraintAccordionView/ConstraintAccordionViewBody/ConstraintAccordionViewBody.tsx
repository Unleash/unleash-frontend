import { Chip, FormControlLabel, Switch } from '@material-ui/core';
import {
    ImportExport,
    ImportExportOutlined,
    TextFormat,
    TextFormatOutlined,
} from '@material-ui/icons';
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
    const [filter, setFilter] = useState('');
    const styles = useStyles();

    const renderConstraintValues = () => {
        return constraint?.values
            ?.filter(value => value.includes(filter))
            .map((value, index) => (
                <Chip
                    key={`${value}-${index}`}
                    label={value}
                    className={styles.chip}
                />
            ));
    };

    const renderSingleValue = () => {
        if (!Boolean(constraint.value)) return null;

        return <Chip label={constraint.value} className={styles.chip} />;
    };

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

            <ConditionallyRender
                condition={Boolean(constraint?.values?.length)}
                show={
                    <ConstraintValueSearch
                        filter={filter}
                        setFilter={setFilter}
                    />
                }
            />

            <div className={styles.valuesContainer}>
                {renderConstraintValues()}
                {renderSingleValue()}
            </div>
        </div>
    );
};
