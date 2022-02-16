import { Chip } from '@material-ui/core';

interface IFreeTextInputProps {
    values: string[];
    removeValue: (index: number) => void;
}

export const FreeTextInput = ({ values, removeValue }: IFreeTextInputProps) => {
    const renderCurrentValues = () => {
        return values.map((value, index) => {
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

    return <div>{renderCurrentValues()}</div>;
};
