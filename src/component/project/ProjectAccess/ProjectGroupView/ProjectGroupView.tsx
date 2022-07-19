import { Delete, Edit } from '@mui/icons-material';
import { Avatar, styled, useMediaQuery, useTheme } from '@mui/material';
import { GroupUserRoleCell } from 'component/admin/groups/GroupUserRoleCell/GroupUserRoleCell';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { Search } from 'component/common/Search/Search';
import { SidebarModal } from 'component/common/SidebarModal/SidebarModal';
import { TablePlaceholder, VirtualizedTable } from 'component/common/Table';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { TimeAgoCell } from 'component/common/Table/cells/TimeAgoCell/TimeAgoCell';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { UPDATE_PROJECT } from 'component/providers/AccessProvider/permissions';
import { useSearch } from 'hooks/useSearch';
import { IGroup, IGroupUser } from 'interfaces/group';
import { VFC, useState } from 'react';
import { SortingRule, useFlexLayout, useSortBy, useTable } from 'react-table';
import { sortTypes } from 'utils/sortTypes';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: 'auto',
}));

const StyledPageContent = styled(PageContent)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(7.5, 6),
    '& .header': {
        padding: theme.spacing(0, 0, 2, 0),
    },
    '& .body': {
        padding: theme.spacing(3, 0, 0, 0),
    },
}));

const StyledTitle = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& > span': {
        color: theme.palette.text.secondary,
        fontSize: theme.fontSizes.smallBody,
    },
}));

const defaultSort: SortingRule<string> = { id: 'role', desc: true };

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

interface IProjectGroupViewProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    group: IGroup;
    projectId: string;
    subtitle: string;
    onEdit: () => void;
    onRemove: () => void;
}

export const ProjectGroupView: VFC<IProjectGroupViewProps> = ({
    open,
    setOpen,
    group,
    projectId,
    subtitle,
    onEdit,
    onRemove,
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [initialState] = useState(() => ({
        sortBy: [
            {
                id: defaultSort.id,
                desc: defaultSort.desc,
            },
        ],
    }));
    const [searchValue, setSearchValue] = useState('');

    const { data, getSearchText, getSearchContext } = useSearch(
        columns,
        searchValue,
        group?.users ?? []
    );

    const { headerGroups, rows, prepareRow } = useTable(
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

    return (
        <SidebarModal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            label={group?.name || 'Group'}
        >
            <StyledPageContent
                header={
                    <PageHeader
                        secondary
                        titleElement={
                            <StyledTitle>
                                {group?.name} (
                                {rows.length < data.length
                                    ? `${rows.length} of ${data.length}`
                                    : data.length}
                                )<span>{subtitle}</span>
                            </StyledTitle>
                        }
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
                                <PermissionIconButton
                                    permission={UPDATE_PROJECT}
                                    projectId={projectId}
                                    tooltipProps={{
                                        title: 'Edit group access',
                                    }}
                                    onClick={onEdit}
                                >
                                    <Edit />
                                </PermissionIconButton>
                                <PermissionIconButton
                                    permission={UPDATE_PROJECT}
                                    projectId={projectId}
                                    tooltipProps={{
                                        title: 'Remove group access',
                                    }}
                                    onClick={onRemove}
                                >
                                    <Delete />
                                </PermissionIconButton>
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
            </StyledPageContent>
        </SidebarModal>
    );
};