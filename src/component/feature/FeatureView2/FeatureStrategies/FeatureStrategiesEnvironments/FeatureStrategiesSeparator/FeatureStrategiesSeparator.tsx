import { useTheme } from '@material-ui/core';

interface IFeatureStrategiesSeparatorProps {
    text: string;
    maxWidth?: string;
}

const FeatureStrategiesSeparator = ({
    text,
    maxWidth = '50px',
}: IFeatureStrategiesSeparatorProps) => {
    const theme = useTheme();
    return (
        <div
            style={{
                color: text === 'AND' ? '#000' : '#fff',
                padding: '0.1rem 0.25rem',
                border: `1px solid ${
                    text === 'AND' ? '#000' : theme.palette.primary.light
                }`,
                borderRadius: '0.25rem',
                maxWidth,
                fontSize: theme.fontSizes.smallerBody,
                textAlign: 'center',
                margin: '0.5rem 0rem 0.5rem 1rem',
                backgroundColor:
                    text === 'AND' ? '#fff' : theme.palette.primary.light,
            }}
        >
            {text}
        </div>
    );
};

export default FeatureStrategiesSeparator;
