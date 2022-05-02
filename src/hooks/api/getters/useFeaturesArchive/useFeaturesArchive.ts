import { openApiAdmin } from 'utils/openapiClient';
import { FeatureSchema } from 'openapi';
import { useApiGetter } from 'hooks/api/getters/useApiGetter/useApiGetter';

export interface IUseFeaturesArchiveOutput {
    archivedFeatures?: FeatureSchema[];
    refetchArchived: () => void;
    loading: boolean;
    error?: Error;
}

export const useFeaturesArchive = (
    projectId?: string
): IUseFeaturesArchiveOutput => {
    const { data, refetch, loading, error } = useApiGetter(
        ['apiAdminArchiveFeaturesGet', projectId],
        () => {
            if (projectId) {
                return openApiAdmin.apiAdminArchiveFeaturesProjectIdGet({
                    projectId,
                });
            }
            return openApiAdmin.apiAdminArchiveFeaturesGet();
        }
    );

    return {
        archivedFeatures: data?.features,
        refetchArchived: refetch,
        loading,
        error,
    };
};
