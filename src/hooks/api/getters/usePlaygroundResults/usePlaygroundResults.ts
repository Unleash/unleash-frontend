import { PlaygroundFeatureSchema, PlaygroundRequestSchema } from 'openapi';
import { useApiGetter } from '../useApiGetter/useApiGetter';
import { openApiAdmin } from '../../../../utils/openapiClient';

export interface IUsePlaygroundResultsOutput {
    features: PlaygroundFeatureSchema[];
    input?: PlaygroundRequestSchema;
    refetchFeatures: () => void;
    loading: boolean;
    error?: Error;
}

export const usePlaygroundResults = (
    playgroundRequestSchema: PlaygroundRequestSchema
): IUsePlaygroundResultsOutput => {
    const { data, refetch, loading, error } = useApiGetter(
        'apiAdminPlaygroundGet',
        () => openApiAdmin.getPlayground({ playgroundRequestSchema })
    );

    return {
        features: data?.toggles ?? [],
        input: data?.input,
        refetchFeatures: refetch,
        loading,
        error,
    };
};
