import { useTheme } from '@material-ui/core';

interface IFeatureStrategiesSeparatorProps {
    text: string;
}

const FeatureStrategiesSeparator = ({
    text,
}: IFeatureStrategiesSeparatorProps) => {
    const theme = useTheme();
    return (
        <div
            style={{
                color: theme.palette.primary.main,
                padding: '0.1rem',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '0.25rem',
                maxWidth: '50px',
                fontSize: theme.fontSizes.smallerBody,
                textAlign: 'center',
                margin: '0.5rem 0rem 0.5rem 1rem',
            }}
        >
            {text}
        </div>
    );
};

export default FeatureStrategiesSeparator;
