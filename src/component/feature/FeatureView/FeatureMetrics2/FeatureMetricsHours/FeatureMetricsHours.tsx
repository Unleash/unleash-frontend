import GeneralSelect, {
    OnGeneralSelectChange,
} from '../../../../common/GeneralSelect/GeneralSelect';
import { parseFeatureMetricsHour } from './parseFeatureMetricsHour';

interface IFeatureMetricsHoursProps {
    hoursBack: number;
    setHoursBack: (value: number) => void;
}

export const FeatureMetricsHours = ({
    hoursBack,
    setHoursBack,
}: IFeatureMetricsHoursProps) => {
    const onChange: OnGeneralSelectChange = event => {
        setHoursBack(parseFeatureMetricsHour(event.target.value));
    };

    return (
        <GeneralSelect
            label="Period"
            name="feature-metrics-period"
            id="feature-metrics-period"
            options={hourOptions}
            value={String(hoursBack)}
            onChange={onChange}
            fullWidth
        />
    );
};

const hourOptions: { key: `${number}`; label: string }[] = [
    { key: '1', label: 'Last hour' },
    { key: '24', label: 'Last 24 hours' },
    { key: '48', label: 'Last 48 hours' },
];
