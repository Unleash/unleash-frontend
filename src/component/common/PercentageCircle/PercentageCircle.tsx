import { useTheme } from '@mui/material';

interface IPercentageCircleProps {
    styles?: object;
    percentage: number;
    secondaryPieColor?: string;
    className?: string;
}

const PercentageCircle = ({
    styles,
    percentage,
    secondaryPieColor,
    ...rest
}: IPercentageCircleProps) => {
    const theme = useTheme();

    let circle = {
        height: '65px',
        width: '65px',
        borderRadius: '50%',
        color: '#fff',
        backgroundColor: theme.palette.grey[200],
        backgroundImage: `conic-gradient(${
            theme.palette.primary.light
        } ${percentage}%, ${secondaryPieColor || theme.palette.grey[200]} 1%)`,
    };

    if (percentage === 100) {
        return (
            <div
                style={{
                    ...circle,
                    ...styles,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                100%
            </div>
        );
    }

    return <div style={{ ...circle, ...styles }} {...rest} />;
};

export default PercentageCircle;
