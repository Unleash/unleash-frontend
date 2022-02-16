import { Chip } from '@material-ui/core';
import { IConstraint } from '../../../../../interfaces/strategy';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
}

export const ConstraintAccordionEditBody = ({
    localConstraint,
}: IConstraintAccordionBody) => {
    const renderCurrentValues = () => {
        return localConstraint.values.map((value, index) => {
            return (
                <Chip
                    label={value}
                    key={value}
                    style={{ margin: '0 0.5rem 0.5rem 0' }}
                />
            );
        });
    };

    return <div>{renderCurrentValues()}</div>;
};
