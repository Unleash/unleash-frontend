import { IGroup } from 'interfaces/group';
import { groups } from '../useGroups/useGroups';
// import { FeatureSchema } from 'openapi';
// import { openApiAdmin } from 'utils/openapiClient';
// import { useApiGetter } from 'hooks/api/getters/useApiGetter/useApiGetter';

export interface IUseGroupOutput {
    group?: IGroup;
    refetchGroup: () => void;
    loading: boolean;
    error?: Error;
}

export const useGroup = (groupId: string): IUseGroupOutput => {
    // const { data, refetch, loading, error } = useApiGetter(
    //     'apiAdminGroupGet',
    //     () => openApiAdmin.getGroup(),
    //     {
    //         refreshInterval: 15 * 1000, // ms
    //     }
    // );

    return {
        group: groups.find(group => group.id === groupId),
        refetchGroup: () => {},
        loading: false,
        error: undefined,
    };
};
