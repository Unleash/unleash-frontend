import { Button, Chip } from '@material-ui/core';
import { IConstraint } from '../../../../../interfaces/strategy';
import PermissionButton from '../../../PermissionButton/PermissionButton';

interface IConstraintAccordionBody {
    localConstraint: IConstraint;
    setValues: (values: string[]) => void;
    onCancel: () => void;
}

export const ConstraintAccordionEditBody = ({
    localConstraint,
    setValues,
    onCancel,
    handleSave,
}: IConstraintAccordionBody) => {
    const removeValue = (index: number) => {
        const valueCopy = [...localConstraint.values];
        valueCopy.splice(index, 1);

        setValues(valueCopy);
    };

    const resolveInputField = () => {
        return null;
    };

    const renderCurrentValues = () => {
        return localConstraint.values.map((value, index) => {
            return (
                <Chip
                    label={value}
                    key={value}
                    onDelete={() => removeValue(index)}
                    style={{ margin: '0 0.5rem 0.5rem 0' }}
                />
            );
        });
    };

    return (
        <div>
            {resolveInputField()}
            {renderCurrentValues()}

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '0.5rem',
                }}
            >
                <Button onClick={() => onCancel()}>Cancel</Button>
                <Button
                    onClick={() => handleSave(localConstraint)}
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </div>
        </div>
    );
};
