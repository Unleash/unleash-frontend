import { VFC } from 'react';
import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { EnhancedTable } from './EnhancedTable/EnhancedTable';

interface IExperimentProps {}

const StatusCell: VFC<{ stale?: boolean }> = ({ stale = false }) => (
    <>{stale ? 'Active' : 'Stale'}</>
);
const TimeAgoCell: VFC<{ lastSeenAt?: string }> = ({ lastSeenAt }) => (
    <>{lastSeenAt ? new Date(lastSeenAt).toLocaleDateString() : '-'}</>
);

export const Experiment: VFC<IExperimentProps> = () => {
    const { features } = useFeatures();
    const featuresWithIndex = features.map((feature, index) => ({
        ...feature,
        index,
    }));

    return (
        <EnhancedTable
            data={featuresWithIndex}
            dataKey="index"
            columns={[
                { field: 'index', label: '#', render: 'number' },
                { field: 'name', label: 'Feature toggle name' },
                { field: 'lastSeenAt', label: 'Seen', render: TimeAgoCell },
                { field: 'createdAt', label: 'Created on', render: 'date' },
                { field: 'project', label: 'Project ID' },
                { field: 'stale', label: 'Status', render: StatusCell },
            ]}
            isSelectable
        />
    );
};
