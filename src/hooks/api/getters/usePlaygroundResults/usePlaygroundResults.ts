import { FeatureSchema } from 'openapi';

export type PlaygroundResultsFeatureSchema = Pick<
    FeatureSchema,
    'name' | 'description' | 'project' | 'enabled'
>;

export interface IUsePlaygroundResultsOutput {
    features: PlaygroundResultsFeatureSchema[];
    context?: object;
    refetchFeatures: () => void;
    loading: boolean;
    error?: Error;
}

export const usePlaygroundResults = (): IUsePlaygroundResultsOutput => {
    const data = {
        features: [
            {
                name: 'myAwesomeFeature',
                description: 'myAwesomeFeature description',
                project: 'My Project',
                enabled: true,
            },
            {
                name: 'myAwesomeFeature2',
                description: 'myAwesomeFeature description 2',
                project: 'My Project',
                enabled: false,
            },
        ],
        context: {},
    };

    return {
        features: data?.features ?? [],
        context: data?.context,
        refetchFeatures: () => {},
        loading: false,
        error: undefined,
    };
};
