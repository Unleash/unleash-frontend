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
        context: {
            environment: 'development',
            userID: '86432135',
            sessionID: '35435135',
            remoteAddress: '127.0.0.1'
        },
    };

    return {
        features: data?.features ?? [],
        context: data?.context,
        refetchFeatures: () => {},
        loading: false,
        error: undefined,
    };
};
