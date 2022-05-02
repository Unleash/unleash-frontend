import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useFeaturesFilter } from 'hooks/useFeaturesFilter';
import { FeatureToggleList } from './FeatureToggleList';
import { useFeaturesSort } from 'hooks/useFeaturesSort';
import { FeatureFlagsTable } from './FeatureFlagsTable/FeatureFlagsTable';
import { EnhancedTable } from 'component/common/Table/EnhancedTable/EnhancedTable';

export const FeatureToggleListContainer = () => {
    const { uiConfig } = useUiConfig();
    const { features = [], loading } = useFeatures();

    return (
        // <FeatureToggleList
        //     features={sorted}
        //     loading={loading}
        //     flags={uiConfig.flags}
        //     filter={filter}
        //     setFilter={setFilter}
        //     sort={sort}
        //     setSort={setSort}
        // />
        <>
            <FeatureFlagsTable data={features} />
            <EnhancedTable
                title={`Feature Flags (${features.length})`}
                data={features}
                dataKey="name"
                columns={[
                    { field: 'name', label: 'Feature toggle name' },
                    { field: 'project', label: 'Project ID' },
                    { field: 'state', label: 'State' },
                ]}
                // pageSize={50}
            />
        </>
    );
};
