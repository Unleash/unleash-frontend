import { useEffect, useMemo, useState, VFC } from 'react';
import { useGroups } from 'hooks/api/getters/useGroups/useGroups';
import { Link, useSearchParams } from 'react-router-dom';
import { IGroup } from 'interfaces/group';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Search } from 'component/common/Search/Search';
import { Button, Grid, useMediaQuery } from '@mui/material';
import theme from 'themes/theme';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { TablePlaceholder } from 'component/common/Table';
import { GroupCard } from './GroupCard/GroupCard';

type PageQueryType = Partial<Record<'search', string>>;

const groupsSearch = (group: IGroup, searchValue: string) => {
    const search = searchValue.toLowerCase();
    const users = {
        names: group.users?.map(user => user.name?.toLowerCase() || ''),
        usernames: group.users?.map(user => user.username?.toLowerCase() || ''),
        emails: group.users?.map(user => user.email?.toLowerCase() || ''),
    };
    return (
        group.name.toLowerCase().includes(search) ||
        group.description.toLowerCase().includes(search) ||
        users.names?.some(name => name.includes(search)) ||
        users.usernames?.some(username => username.includes(search)) ||
        users.emails?.some(email => email.includes(search))
    );
};

export const GroupsList: VFC = () => {
    const { groups = [], loading } = useGroups();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(
        searchParams.get('search') || ''
    );

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const tableState: PageQueryType = {};
        if (searchValue) {
            tableState.search = searchValue;
        }

        setSearchParams(tableState, {
            replace: true,
        });
    }, [searchValue, setSearchParams]);

    const data = useMemo(() => {
        return searchValue
            ? groups.filter(group => groupsSearch(group, searchValue))
            : groups;
    }, [groups, searchValue]);

    return (
        <PageContent
            isLoading={loading}
            header={
                <PageHeader
                    title={`Groups (${data.length})`}
                    actions={
                        <>
                            <ConditionallyRender
                                condition={!isSmallScreen}
                                show={
                                    <>
                                        <Search
                                            initialValue={searchValue}
                                            onChange={setSearchValue}
                                        />
                                        <PageHeader.Divider />
                                    </>
                                }
                            />
                            <Button
                                to="/admin/groups/create-group"
                                component={Link}
                                variant="contained"
                                color="primary"
                            >
                                New group
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
                            />
                        }
                    />
                </PageHeader>
            }
        >
            <SearchHighlightProvider value={searchValue}>
                <Grid container spacing={2}>
                    {data.map(group => (
                        <Grid key={group.id} item xs={12} md={6}>
                            <GroupCard group={group} />
                        </Grid>
                    ))}
                </Grid>
            </SearchHighlightProvider>
            <ConditionallyRender
                condition={data.length === 0}
                show={
                    <ConditionallyRender
                        condition={searchValue?.length > 0}
                        show={
                            <TablePlaceholder>
                                No groups found matching &ldquo;
                                {searchValue}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No groups available. Get started by adding a new
                                group.
                            </TablePlaceholder>
                        }
                    />
                }
            />
        </PageContent>
    );
};
