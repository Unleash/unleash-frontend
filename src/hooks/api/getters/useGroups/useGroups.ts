import { IGroup } from 'interfaces/group';
// import { FeatureSchema } from 'openapi';
// import { openApiAdmin } from 'utils/openapiClient';
// import { useApiGetter } from 'hooks/api/getters/useApiGetter/useApiGetter';

export interface IUseGroupsOutput {
    groups?: IGroup[];
    refetchGroups: () => void;
    loading: boolean;
    error?: Error;
}

export const useGroups = (): IUseGroupsOutput => {
    // const { data, refetch, loading, error } = useApiGetter(
    //     'apiAdminFeaturesGet',
    //     () => openApiAdmin.getAllToggles(),
    //     {
    //         refreshInterval: 15 * 1000, // ms
    //     }
    // );

    return {
        groups: Array(15).fill({
            name: 'Name of the group',
            description: 'Short description of the group',
            createdAt: new Date(2022, 1, 1),
        }),
        refetchGroups: () => {},
        loading: false,
        error: undefined,
    };
};
