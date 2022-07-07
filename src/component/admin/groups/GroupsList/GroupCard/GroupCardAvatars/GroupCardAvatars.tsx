import { Avatar, styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IGroupUser } from 'interfaces/group';

const StyledAvatars = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft: theme.spacing(-1),
}));

const StyledOwnerAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    '&:not(:first-of-type)': {
        marginLeft: theme.spacing(-2),
    },
}));

interface IGroupCardAvatarsProps {
    users: IGroupUser[];
}

export const GroupCardAvatars = ({ users }: IGroupCardAvatarsProps) => {
    return (
        <StyledAvatars>
            {users
                .sort((a, b) => (a.role < b.role ? 1 : -1))
                .map(user => (
                    <ConditionallyRender
                        key={user.id}
                        condition={user.role === 'member'}
                        show={
                            <StyledAvatar
                                data-loading
                                alt="Gravatar"
                                src={user.imageUrl}
                                title={`${
                                    user.name || user.email || user.username
                                } (id: ${user.id})`}
                            />
                        }
                        elseShow={
                            <StyledOwnerAvatar
                                data-loading
                                alt="Gravatar"
                                src={user.imageUrl}
                                title={`${
                                    user.name || user.email || user.username
                                } (id: ${user.id})`}
                            />
                        }
                    />
                ))}
        </StyledAvatars>
    );
};
