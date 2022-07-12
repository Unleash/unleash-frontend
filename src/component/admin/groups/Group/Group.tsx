import { useEffect, useMemo, useState, VFC } from 'react';
import { Avatar, Button, styled, useMediaQuery, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { SortingRule, useFlexLayout, useSortBy, useTable } from 'react-table';
import { TablePlaceholder, VirtualizedTable } from 'component/common/Table';
import { useGroup } from 'hooks/api/getters/useGroup/useGroup';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { sortTypes } from 'utils/sortTypes';
import { createLocalStorage } from 'utils/createLocalStorage';
import { IGroupUser, Role } from 'interfaces/group';
import { useSearch } from 'hooks/useSearch';
import { Search } from 'component/common/Search/Search';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { TimeAgoCell } from 'component/common/Table/cells/TimeAgoCell/TimeAgoCell';
import { GroupUserRoleCell } from 'component/admin/groups/GroupUserRoleCell/GroupUserRoleCell';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { Delete, Edit } from '@mui/icons-material';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import { MainHeader } from 'component/common/MainHeader/MainHeader';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';

// TODO: Refactor into its own component and cleanup avatars everywhere?
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: 'auto',
}));

const StyledEdit = styled(Edit)(({ theme }) => ({
    fontSize: theme.fontSizes.mainHeader,
}));

const StyledDelete = styled(Delete)(({ theme }) => ({
    fontSize: theme.fontSizes.mainHeader,
}));

export const groupUsersPlaceholder: IGroupUser[] = Array(15).fill({
    name: 'Name of the user',
    username: 'Username of the user',
    role: Role.Member,
});

export type PageQueryType = Partial<
    Record<'sort' | 'order' | 'search', string>
>;

const columns = [
    {
        Header: 'Avatar',
        accessor: 'imageUrl',
        Cell: ({ row: { original: user } }: any) => (
            <TextCell>
                <StyledAvatar
                    data-loading
                    alt="Gravatar"
                    src={user.imageUrl}
                    title={`${user.name || user.email || user.username} (id: ${
                        user.id
                    })`}
                />
            </TextCell>
        ),
        maxWidth: 85,
        disableSortBy: true,
    },
    {
        id: 'name',
        Header: 'Name',
        accessor: (row: IGroupUser) => row.name || '',
        Cell: HighlightCell,
        minWidth: 100,
        searchable: true,
    },
    {
        id: 'username',
        Header: 'Username',
        accessor: (row: IGroupUser) => row.username || row.email,
        Cell: HighlightCell,
        minWidth: 100,
        searchable: true,
    },
    {
        Header: 'User type',
        accessor: 'role',
        Cell: GroupUserRoleCell,
        maxWidth: 150,
        filterName: 'type',
    },
    {
        Header: 'Joined',
        accessor: 'joinedAt',
        Cell: DateCell,
        sortType: 'date',
        maxWidth: 150,
    },
    {
        Header: 'Last login',
        accessor: (row: IGroupUser) => row.seenAt || '',
        Cell: ({ row: { original: user } }: any) => (
            <TimeAgoCell value={user.seenAt} emptyText="Never logged" />
        ),
        sortType: 'date',
        maxWidth: 150,
    },
];

const defaultSort: SortingRule<string> = { id: 'role', desc: true };

const { value: storedParams, setValue: setStoredParams } = createLocalStorage(
    'Group:v1',
    defaultSort
);

export const Group: VFC = () => {
    const groupId = useRequiredPathParam('groupId');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { group, loading } = useGroup(groupId);
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialState] = useState(() => ({
        sortBy: [
            {
                id: searchParams.get('sort') || storedParams.id,
                desc: searchParams.has('order')
                    ? searchParams.get('order') === 'desc'
                    : storedParams.desc,
            },
        ],
        hiddenColumns: ['description'],
        globalFilter: searchParams.get('search') || '',
    }));
    const [searchValue, setSearchValue] = useState(initialState.globalFilter);

    const {
        data: searchedData,
        getSearchText,
        getSearchContext,
    } = useSearch(columns, searchValue, group?.users ?? []);

    const data = useMemo(
        () =>
            searchedData?.length === 0 && loading
                ? groupUsersPlaceholder
                : searchedData,
        [searchedData, loading]
    );

    const {
        headerGroups,
        rows,
        prepareRow,
        state: { sortBy },
    } = useTable(
        {
            columns: columns as any[],
            data,
            initialState,
            sortTypes,
            autoResetSortBy: false,
            disableSortRemove: true,
            disableMultiSort: true,
        },
        useSortBy,
        useFlexLayout
    );

    useEffect(() => {
        const tableState: PageQueryType = {};
        tableState.sort = sortBy[0].id;
        if (sortBy[0].desc) {
            tableState.order = 'desc';
        }
        if (searchValue) {
            tableState.search = searchValue;
        }

        setSearchParams(tableState, {
            replace: true,
        });
        setStoredParams({ id: sortBy[0].id, desc: sortBy[0].desc || false });
    }, [sortBy, searchValue, setSearchParams]);

    return (
        <>
            <MainHeader
                title={group?.name}
                description={group?.description}
                actions={
                    <>
                        <PermissionIconButton
                            data-loading
                            onClick={() => {}}
                            permission={ADMIN}
                            tooltipProps={{
                                title: 'Edit group',
                            }}
                        >
                            <StyledEdit />
                        </PermissionIconButton>
                        <PermissionIconButton
                            data-loading
                            onClick={() => {}}
                            permission={ADMIN}
                            tooltipProps={{
                                title: 'Remove group',
                            }}
                        >
                            <StyledDelete />
                        </PermissionIconButton>
                    </>
                }
            />
            <PageContent
                isLoading={loading}
                header={
                    <PageHeader
                        secondary
                        title={`Users (${
                            rows.length < data.length
                                ? `${rows.length} of ${data.length}`
                                : data.length
                        })`}
                        actions={
                            <>
                                <ConditionallyRender
                                    condition={!isSmallScreen}
                                    show={
                                        <>
                                            <Search
                                                initialValue={searchValue}
                                                onChange={setSearchValue}
                                                hasFilters
                                                getSearchContext={
                                                    getSearchContext
                                                }
                                            />
                                            <PageHeader.Divider />
                                        </>
                                    }
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {}}
                                >
                                    Add user
                                </Button>
                            </>
                        }
                    >
                        <ConditionallyRender
                            condition={isSmallScreen}
                            show={
                                <Search
                                    initialValue={searchValue}
                                    onChange={setSearchValue}
                                    hasFilters
                                    getSearchContext={getSearchContext}
                                />
                            }
                        />
                    </PageHeader>
                }
            >
                <SearchHighlightProvider value={getSearchText(searchValue)}>
                    <VirtualizedTable
                        rows={rows}
                        headerGroups={headerGroups}
                        prepareRow={prepareRow}
                    />
                </SearchHighlightProvider>
                <ConditionallyRender
                    condition={rows.length === 0}
                    show={
                        <ConditionallyRender
                            condition={searchValue?.length > 0}
                            show={
                                <TablePlaceholder>
                                    No users found matching &ldquo;
                                    {searchValue}
                                    &rdquo; in this group.
                                </TablePlaceholder>
                            }
                            elseShow={
                                <TablePlaceholder>
                                    This group is empty. Get started by adding a
                                    user to the group.
                                </TablePlaceholder>
                            }
                        />
                    }
                />
            </PageContent>
        </>
    );
};
