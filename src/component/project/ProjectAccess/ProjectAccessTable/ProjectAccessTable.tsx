import { useEffect, useMemo, useState, VFC } from 'react';
import { SortingRule, useFlexLayout, useSortBy, useTable } from 'react-table';
import { VirtualizedTable, TablePlaceholder } from 'component/common/Table';
import { Avatar, Button, styled, useMediaQuery, useTheme } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { sortTypes } from 'utils/sortTypes';
import useProjectAccess, {
    IProjectAccessUser,
} from 'hooks/api/getters/useProjectAccess/useProjectAccess';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { UPDATE_PROJECT } from 'component/providers/AccessProvider/permissions';
import { TextCell } from 'component/common/Table/cells/TextCell/TextCell';
import { ActionCell } from 'component/common/Table/cells/ActionCell/ActionCell';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useSearch } from 'hooks/useSearch';
import { useSearchParams } from 'react-router-dom';
import { createLocalStorage } from 'utils/createLocalStorage';
import { IUser } from 'interfaces/user';
import { HighlightCell } from 'component/common/Table/cells/HighlightCell/HighlightCell';
import { TimeAgoCell } from 'component/common/Table/cells/TimeAgoCell/TimeAgoCell';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { Search } from 'component/common/Search/Search';
import { SidebarModal } from 'component/common/SidebarModal/SidebarModal';
import { ProjectAccessAssign } from 'component/project/ProjectAccess/ProjectAccessAssign/ProjectAccessAssign';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import useToast from 'hooks/useToast';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { ProjectGroupView } from '../ProjectGroupView/ProjectGroupView';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: 'auto',
}));

export type PageQueryType = Partial<
    Record<'sort' | 'order' | 'search', string>
>;

const defaultSort: SortingRule<string> = { id: 'name' };

const { value: storedParams, setValue: setStoredParams } = createLocalStorage(
    'ProjectAccess:v1',
    defaultSort
);

interface IProjectAccessTableProps {
    projectId: string;
}

export const ProjectAccessTable: VFC<IProjectAccessTableProps> = ({
    projectId,
}) => {
    const { uiConfig } = useUiConfig();
    const { flags } = uiConfig;
    const entity = flags.UG ? 'user / group' : 'user';

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { setToastData } = useToast();

    const { access, refetchProjectAccess } = useProjectAccess(projectId);
    const { removeUserFromRole, changeUserRole } = useProjectApi();
    const [assignOpen, setAssignOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);
    const [groupOpen, setGroupOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IProjectAccessUser>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const roles = useMemo(() => access.roles, [JSON.stringify(access.roles)]);

    const columns = useMemo(
        () => [
            {
                Header: 'Avatar',
                accessor: 'imageUrl',
                Cell: ({ row: { original: user } }: any) => (
                    <TextCell>
                        <StyledAvatar
                            data-loading
                            alt="Gravatar"
                            src={user.imageUrl}
                            title={`${
                                user.name || user.email || user.username
                            } (id: ${user.id})`}
                        />
                    </TextCell>
                ),
                maxWidth: 85,
                disableSortBy: true,
            },
            {
                id: 'name',
                Header: 'Name',
                accessor: (row: IProjectAccessUser) => row.name || '',
                Cell: HighlightCell,
                minWidth: 100,
                searchable: true,
            },
            {
                id: 'username',
                Header: 'Username',
                accessor: (row: IProjectAccessUser) =>
                    row.username || row.email,
                Cell: HighlightCell,
                minWidth: 100,
                searchable: true,
            },
            {
                Header: 'Role',
                accessor: (row: IProjectAccessUser) =>
                    roles.find(({ id }) => id === row.roleId)?.name,
                minWidth: 120,
                filterName: 'role',
            },
            {
                Header: 'Last login',
                accessor: (row: IUser) => row.seenAt || '',
                Cell: ({ row: { original: user } }: any) => (
                    <TimeAgoCell value={user.seenAt} emptyText="Never logged" />
                ),
                sortType: 'date',
                maxWidth: 150,
            },
            {
                id: 'actions',
                Header: 'Actions',
                disableSortBy: true,
                align: 'center',
                maxWidth: 200,
                Cell: ({ row: { original: user } }: any) => (
                    <ActionCell>
                        <PermissionIconButton
                            permission={UPDATE_PROJECT}
                            projectId={projectId}
                            onClick={() => {
                                setSelectedRow(user);
                                setEditOpen(true);
                            }}
                            disabled={access.users.length === 1}
                            tooltipProps={{
                                title:
                                    access.users.length === 1
                                        ? 'Cannot edit access. A project must have at least one owner'
                                        : 'Edit access',
                            }}
                        >
                            <Edit />
                        </PermissionIconButton>
                        <PermissionIconButton
                            permission={UPDATE_PROJECT}
                            projectId={projectId}
                            onClick={() => {
                                setSelectedRow(user);
                                setRemoveOpen(true);
                            }}
                            disabled={access.users.length === 1}
                            tooltipProps={{
                                title:
                                    access.users.length === 1
                                        ? 'Cannot remove access. A project must have at least one owner'
                                        : 'Remove access',
                            }}
                        >
                            <Delete />
                        </PermissionIconButton>
                    </ActionCell>
                ),
            },
        ],
        [roles, access.users.length, projectId]
    );

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
        globalFilter: searchParams.get('search') || '',
    }));
    const [searchValue, setSearchValue] = useState(initialState.globalFilter);

    const { data, getSearchText, getSearchContext } = useSearch(
        columns,
        searchValue,
        access.users ?? []
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
            defaultColumn: {
                Cell: TextCell,
            },
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

    const removeAccess = (user?: IProjectAccessUser) => async () => {
        if (!user) return;
        const { id, roleId } = user;

        try {
            await removeUserFromRole(projectId, roleId, id);
            refetchProjectAccess();
            setToastData({
                type: 'success',
                title: `${
                    user.email || user.username || `The ${entity}`
                } has been removed from project`,
            });
        } catch (err: any) {
            setToastData({
                type: 'error',
                title: err.message || 'Server problems when adding users.',
            });
        }
        setRemoveOpen(false);
    };

    return (
        <PageContent
            header={
                <PageHeader
                    secondary
                    title={`Access (${
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
                                            getSearchContext={getSearchContext}
                                        />
                                        <PageHeader.Divider />
                                    </>
                                }
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setAssignOpen(true)}
                            >
                                Assign {entity}
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
                                No access found matching &ldquo;
                                {searchValue}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No access available. Get started by assigning a
                                {entity}.
                            </TablePlaceholder>
                        }
                    />
                }
            />
            <SidebarModal
                label={`Assign ${entity}`}
                onClose={() => setAssignOpen(false)}
                open={assignOpen}
            >
                <ProjectAccessAssign
                    onSubmit={() => setAssignOpen(false)}
                    onCancel={() => setAssignOpen(false)}
                    roles={access.roles}
                    modal
                />
            </SidebarModal>
            <Dialogue
                open={removeOpen}
                onClick={() => removeAccess(selectedRow)}
                onClose={() => {
                    setSelectedRow(undefined);
                    setRemoveOpen(false);
                }}
                title={`Really remove ${entity} from this project?`}
            />
            {/* TODO: use the real groupId, or group, depending on the data object we get back */}
            <ProjectGroupView
                groupId="1"
                projectId={projectId}
                open={groupOpen}
                setOpen={setGroupOpen}
                onEdit={() => {}}
                onRemove={() => {}}
            />
        </PageContent>
    );
};
