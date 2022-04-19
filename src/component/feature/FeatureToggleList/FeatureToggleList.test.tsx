import { FeatureToggleList } from './FeatureToggleList';
import { render } from 'utils/testRenderer';
import { CREATE_FEATURE } from 'component/providers/AccessProvider/permissions';

jest.mock('component/common/ProjectSelect/ProjectSelect');

const mockFeatures = [
    {
        name: 'Another',
        description: "another's description",
        enabled: false,
        stale: false,
        project: 'default',
        strategies: [
            {
                id: '0',
                name: 'gradualRolloutRandom',
                constraints: [],
                parameters: {
                    percentage: 50,
                },
            },
        ],
        createdAt: '2018-02-04T20:27:52.127Z',
        archived: false,
        environments: [],
        type: '',
        variants: [],
        impressionData: false,
    },
];

describe('FeatureToggleList', () => {
    it('renders correctly with one feature', () => {
        const { container } = render(
            <FeatureToggleList
                filter={{ project: '*' }}
                setFilter={jest.fn()}
                sort={{ type: 'name' }}
                setSort={jest.fn()}
                features={mockFeatures}
            />,
            { permissions: [{ permission: CREATE_FEATURE }] }
        );

        expect(container).toMatchSnapshot();
    });

    it('renders correctly with one feature without permissions', () => {
        const { container } = render(
            <FeatureToggleList
                filter={{ project: '*' }}
                setFilter={jest.fn()}
                sort={{ type: 'name' }}
                setSort={jest.fn()}
                features={mockFeatures}
            />
        );

        expect(container).toMatchSnapshot();
    });
});
