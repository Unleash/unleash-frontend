import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { FeatureSchema } from 'openapi';
import { FeatureToggleListTable } from './FeatureToggleListTable/FeatureToggleListTable';

const featuresPlaceholder: FeatureSchema[] = Array(7)
    .fill({
        name: 'Name of the feature',
        description: 'Short description of the feature',
        type: '-',
        createdAt: new Date(2022, 1, 1),
        project: 'projectID',
    })
    .map((feature, index) => ({ ...feature, name: `${feature.name}${index}` }));

export const FeatureToggleListContainer = () => {
    const { features = [], loading } = useFeatures();

    return (
        <FeatureToggleListTable
            data={loading ? featuresPlaceholder : features}
            isLoading={loading}
        />
    );
};
