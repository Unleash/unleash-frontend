import { VFC } from 'react';
import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { EnhancedTable } from './EnhancedTable/EnhancedTable';
import { ExampleTable } from 'component/common/SortableTable/ExampleTable';
import { FeatureFlagsTable } from './FeatureFlagsTable';

interface IExperimentProps {}

const StatusCell: VFC<{ stale?: boolean }> = ({ stale = false }) => (
    <>{stale ? 'Active' : 'Stale'}</>
);
const TimeAgoCell: VFC<{ lastSeenAt?: Date | null }> = ({ lastSeenAt }) => (
    <>{lastSeenAt ? new Date(lastSeenAt).toLocaleDateString() : '-'}</>
);

export const Experiment: VFC<IExperimentProps> = () => {
    const { features, loading } = useFeatures();

    if (loading || !features) {
        return null; // TODO: loading skeleton
    }

    return (
        <>
            <FeatureFlagsTable data={features} />
            <br />
            <ExampleTable />
            <EnhancedTable
                data={features}
                dataKey="name"
                columns={[
                    { field: 'name', label: 'Feature toggle name' },
                    { field: 'lastSeenAt', label: 'Seen', render: TimeAgoCell },
                    { field: 'createdAt', label: 'Created on', render: 'date' },
                    { field: 'project', label: 'Project ID' },
                    { field: 'stale', label: 'Status', render: StatusCell },
                ]}
            />
        </>
    );
};
