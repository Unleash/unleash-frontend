import { styled } from '@mui/material';
import { IFeatureEnvironmentMetrics } from 'interfaces/featureToggle';
import { FeatureMetricsStats } from 'component/feature/FeatureView/FeatureMetrics/FeatureMetricsStats/FeatureMetricsStats';

interface IEnvironmentFooterProps {
    environmentMetric?: IFeatureEnvironmentMetrics;
}

const SeparatorContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        height: 2,
        width: '100%',
        backgroundColor: theme.palette.grey[300],
    },
}));

const SeparatorContent = styled('span')(({ theme }) => ({
    fontSize: theme.fontSizes.subHeader,
    textAlign: 'center',
    padding: '0 1rem',
    background: theme.palette.secondaryContainer,
    position: 'relative',
    maxWidth: '80%',
}));

export const EnvironmentFooter = ({
    environmentMetric,
}: IEnvironmentFooterProps) => {
    if (!environmentMetric) {
        return null;
    }

    return (
        <>
            <SeparatorContainer>
                <SeparatorContent>Feature toggle exposure</SeparatorContent>
            </SeparatorContainer>
            <div>
                <FeatureMetricsStats
                    totalYes={environmentMetric.yes}
                    totalNo={environmentMetric.no}
                    hoursBack={1}
                />
            </div>
        </>
    );
};
