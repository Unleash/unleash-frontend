import GeneralSelect, {
    OnGeneralSelectChange,
} from '../../../common/GeneralSelect/GeneralSelect';

export type FeatureMetricsHour = 1 | 24 | 48;

export const FeatureMetricsHours = (props: {
    hoursBack: number;
    setHoursBack: (value: FeatureMetricsHour) => void;
}) => {
    const onChange: OnGeneralSelectChange = event => {
        props.setHoursBack(parseFeatureMetricsHour(event.target.value));
    };

    return (
        <GeneralSelect
            label="Period"
            name="feature-metrics-period"
            id="feature-metrics-period"
            options={hourOptions}
            value={String(props.hoursBack)}
            onChange={onChange}
            fullWidth
        />
    );
};

const parseFeatureMetricsHour = (value: unknown): FeatureMetricsHour => {
    switch (value) {
        case '1':
            return 1;
        case '24':
            return 24;
        default:
            return 48;
    }
};

const hourOptions: { key: `${FeatureMetricsHour}`; label: string }[] = [
    { key: '1', label: 'Last hour' },
    { key: '24', label: 'Last 24 hours' },
    { key: '48', label: 'Last 48 hours' },
];
