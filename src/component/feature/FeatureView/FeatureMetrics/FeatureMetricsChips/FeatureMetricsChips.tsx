import { Chip } from '@material-ui/core';
import { FeatureMetricsChipsList } from './FeatureMetricsChipsList';
import { FeatureMetricsChipsItem } from './FeatureMetricsChipsItem';
import { useMemo } from 'react';

interface IFeatureMetricsChipsProps {
    title: string;
    values: Set<string>;
    value?: string;
    setValue: (value: string) => void;
}

export const FeatureMetricsChips = ({
    title,
    values,
    value,
    setValue,
}: IFeatureMetricsChipsProps) => {
    const onClick = (value: string) => () => {
        if (values.has(value)) {
            setValue(value);
        }
    };

    const sortedValues = useMemo(() => {
        return Array.from(values).sort((valueA, valueB) => {
            return valueA.localeCompare(valueB);
        });
    }, [values]);

    return (
        <FeatureMetricsChipsList title={title}>
            {sortedValues.map(val => (
                <FeatureMetricsChipsItem key={val}>
                    <Chip
                        label={val}
                        onClick={onClick(val)}
                        aria-pressed={val === value}
                    />
                </FeatureMetricsChipsItem>
            ))}
        </FeatureMetricsChipsList>
    );
};
