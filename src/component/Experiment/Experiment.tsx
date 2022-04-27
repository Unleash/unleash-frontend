import { VFC } from 'react';
import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { EnhancedTable } from './EnhancedTable/EnhancedTable';

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
        <EnhancedTable
            data={features}
            dataKey="name"
            columns={[
                {
                    field: 'name',
                    label: 'Feature toggle name',
                    sort: ({ name: a }, { name: b }) => sortPreset(a, b),
                },
                { field: 'lastSeenAt', label: 'Seen', render: TimeAgoCell },
                { field: 'createdAt', label: 'Created on', render: 'date' },
                { field: 'project', label: 'Project ID' },
                { field: 'stale', label: 'Status', render: StatusCell },
            ]}
            // isSelectable
        />
    );
};
