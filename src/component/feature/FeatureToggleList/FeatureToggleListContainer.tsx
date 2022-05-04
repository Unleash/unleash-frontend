import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { EnhancedTable } from 'component/common/Table/EnhancedTable/EnhancedTable';
import { FeatureStaleCell } from './FeatureFlagsTable/FeatureStaleCell/FeatureStaleCell';
import { FeatureSeenCell } from './FeatureFlagsTable/FeatureSeenCell/FeatureSeenCell';
import { DateCell } from './FeatureFlagsTable/DateCell/DateCell';
import { FeatureTypeCell } from './FeatureFlagsTable/FeatureTypeCell/FeatureTypeCell';
import { FeatureSchema } from 'openapi';
import { LinkCell } from './FeatureFlagsTable/LinkCell/LinkCell';
import { FeatureNameCell } from './FeatureFlagsTable/FeatureNameCell/FeatureNameCell';
import { CreateFeatureButton } from 'component/feature/CreateFeatureButton/CreateFeatureButton';

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
        <EnhancedTable
            title={`Feature Flags (${features.length})`}
            isToolbarSeparated
            toolbar={
                <>
                    <Link
                        component={RouterLink}
                        to="/archive"
                        underline="always"
                        style={{ marginRight: '24px' }}
                    >
                        View archive
                    </Link>
                    <CreateFeatureButton
                        loading={false}
                        filter={{ query: '', project: 'default' }}
                    />
                </>
            }
            data={loading ? featuresPlaceholder : features}
            isLoading={loading}
            dataKey="name"
            columns={[
                {
                    field: 'lastSeenAt',
                    label: 'Seen',
                    render: FeatureSeenCell,
                    sort: 'date',
                    align: 'center',
                },
                {
                    field: 'type',
                    label: 'Type',
                    render: FeatureTypeCell,
                    sort: true,
                    align: 'center',
                },
                {
                    field: 'name',
                    label: 'Feature toggle name',
                    render: FeatureNameCell,
                    sort: true,
                },
                {
                    field: 'createdAt',
                    label: 'Created on',
                    render: ({ createdAt }) => <DateCell date={createdAt} />,
                    sort: 'date',
                },
                {
                    field: 'project',
                    label: 'Project ID',
                    render: ({ project, ...rest }) => (
                        <LinkCell {...rest} to={`/projects/${project}`}>
                            {project}
                        </LinkCell>
                    ),
                    sort: true,
                },
                {
                    field: 'stale',
                    label: 'State',
                    render: FeatureStaleCell,
                    sort: (
                        { stale: a }: FeatureSchema,
                        { stale: b }: FeatureSchema
                    ) => (a === b ? 0 : a ? 1 : -1),
                },
            ]}
            searchColumns={['name', 'description', 'project']}
            defaultSort={{ field: 'createdAt', order: 'asc' }}
            // pageSize={50}
        />
    );
};
