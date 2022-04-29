import { VFC } from 'react';
import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { FeatureFlagsTable } from './FeatureFlagsTable/FeatureFlagsTable';

interface IExperimentProps {}

export const Experiment: VFC<IExperimentProps> = () => {
    const { features, loading } = useFeatures();

    if (loading || !features) {
        return null; // TODO: loading skeleton
    }

    return <FeatureFlagsTable data={features} />;
};
