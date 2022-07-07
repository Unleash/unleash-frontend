import { FeatureSchema } from 'openapi';

export type PlaygroundResultsFeatureSchema = Pick<
    FeatureSchema,
    'name' | 'description' | 'project' | 'enabled'
>;

interface PlaygroundResultsInputSchema {
    context: object;
}

export interface IUsePlaygroundResultsOutput {
    features: PlaygroundResultsFeatureSchema[];
    input: PlaygroundResultsInputSchema;
    refetchFeatures: () => void;
    loading: boolean;
    error?: Error;
}
1;

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
        input: {
            context: {
                environment: 'development',
                userID: '86432135',
                sessionID: '35435135',
                remoteAddress: '127.0.0.1',
            },
        },
    };

    return {
        features: data?.features ?? [],
        input: data?.input,
        refetchFeatures: () => {},
        loading: false,
        error: undefined,
    };
};
