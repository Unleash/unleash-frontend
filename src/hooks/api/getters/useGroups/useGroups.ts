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

const randomDate = (start: Date, end: Date = new Date()) =>
    new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

const users = (
    await fetch('https://randomuser.me/api/?results=30').then(res => res.json())
).results.map((user: any, i: number) => {
    const joinedAt = randomDate(new Date(2020, 0, 1));
    return {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        username: user.login.username,
        imageUrl: user.picture.large,
        role: 'member',
        seenAt: randomDate(joinedAt),
        joinedAt,
    };
});

export const groups = [
    {
        id: 'Managers',
        name: '👩‍💼 Managers',
        description: 'Manage all the things.',
        createdAt: randomDate(new Date(2022, 1, 1)),
        users: users.slice(0, 15).map((u: any, i: number) => ({
            ...u,
            role: i < 3 ? 'owner' : 'member',
        })),
    },
    {
        id: 'Developers',
        name: '🧑‍💻 Developers',
        description: 'Code all the things.',
        createdAt: randomDate(new Date(2022, 1, 1)),
        users: users.slice(15).map((u: any, i: number) => ({
            ...u,
            role: i < 3 ? 'owner' : 'member',
        })),
    },
];

export const useGroups = (): IUseGroupsOutput => {
    // const { data, refetch, loading, error } = useApiGetter(
    //     'apiAdminGroupsGet',
    //     () => openApiAdmin.getAllGroups(),
    //     {
    //         refreshInterval: 15 * 1000, // ms
    //     }
    // );

    return {
        groups,
        refetchGroups: () => {},
        loading: false,
        error: undefined,
    };
};
