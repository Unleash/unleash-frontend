import { styled } from '@mui/material';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { IGroup } from 'interfaces/group';
import { Link } from 'react-router-dom';
import { formatDateYMD } from 'utils/formatDate';
import { Delete, Edit, Event } from '@mui/icons-material';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { GroupCardAvatars } from './GroupCardAvatars/GroupCardAvatars';

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary,
}));

const StyledGroupCard = styled('aside')(({ theme }) => ({
    padding: theme.spacing(2.5),
    height: '100%',
    border: `1px solid ${theme.palette.dividerAlternative}`,
    borderRadius: theme.shape.borderRadiusLarge,
    boxShadow: theme.boxShadows.card,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    },
}));

const StyledHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledHeaderTitle = styled('h2')(({ theme }) => ({
    fontSize: theme.fontSizes.mainHeader,
    fontWeight: theme.fontWeight.medium,
}));

const StyledHeaderActions = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: theme.fontSizes.smallBody,
}));

const StyledEvent = styled(Event)(({ theme }) => ({
    fontSize: theme.fontSizes.bodySize,
    marginRight: theme.spacing(1),
}));

const StyledEdit = styled(Edit)(({ theme }) => ({
    fontSize: theme.fontSizes.mainHeader,
}));

const StyledDelete = styled(Delete)(({ theme }) => ({
    fontSize: theme.fontSizes.mainHeader,
}));

const StyledDescription = styled('p')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: theme.fontSizes.smallBody,
    marginTop: theme.spacing(1),
}));

const StyledCounter = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.fontSizes.smallBody,
    marginTop: theme.spacing(2),
}));

const StyledCounterDescription = styled('span')(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
}));

interface IGroupCardProps {
    group: IGroup;
}

export const GroupCard = ({ group }: IGroupCardProps) => {
    const { locationSettings } = useLocationSettings();
    const date = formatDateYMD(group.createdAt, locationSettings.locale);

    return (
        <StyledLink key={group.id} to={`/admin/groups/${group.id}`}>
            <StyledGroupCard>
                <StyledHeader>
                    <StyledHeaderTitle>{group.name}</StyledHeaderTitle>
                    <StyledHeaderActions>
                        <StyledEvent />
                        {date}
                        <PageHeader.Divider />
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
                    </StyledHeaderActions>
                </StyledHeader>
                <StyledDescription>{group.description}</StyledDescription>
                <StyledCounter>
                    Projects (0):{' '}
                    <StyledCounterDescription>
                        This group is not assigned to any projects.
                    </StyledCounterDescription>
                </StyledCounter>
                <StyledCounter>
                    Users ({group.users?.length ?? 0}):
                    <ConditionallyRender
                        condition={group.users?.length > 0}
                        show={<GroupCardAvatars users={group.users} />}
                        elseShow={
                            <StyledCounterDescription>
                                This group has no users.
                            </StyledCounterDescription>
                        }
                    />
                </StyledCounter>
            </StyledGroupCard>
        </StyledLink>
    );
};
