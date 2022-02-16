import { Chip, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useState } from 'react';

import { IConstraint } from '../../../../../interfaces/strategy';
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
        return constraint.values
            .filter(value => value.includes(filter))
            .map(value => (
                <Chip key={value} label={value} className={styles.chip} />
            ));
    };

    const renderSearchfield = () => {
        return <ConstraintValueSearch filter={filter} setFilter={setFilter} />;
    };

    return (
        <div>
            <ConditionallyRender
                condition={Boolean(constraint.values.length)}
                show={renderSearchfield()}
            />

            <div className={styles.valuesContainer}>
                {renderConstraintValues()}
            </div>
        </div>
    );
};
