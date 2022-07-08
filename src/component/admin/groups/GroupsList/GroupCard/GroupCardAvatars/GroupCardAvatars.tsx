import { Avatar, styled } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IGroupUser } from 'interfaces/group';
import { useMemo } from 'react';
import { colors } from 'themes/colors';
import StarIcon from '@mui/icons-material/Star';

const StyledAvatars = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    outline: `2px solid ${theme.palette.background.paper}`,
    marginLeft: theme.spacing(-1),
}));

const StyledOwnerAvatar = styled(StyledAvatar)(({ theme }) => ({
    position: 'relative',
}));
// TODO: https://mui.com/material-ui/react-avatar/#with-badge instead? Depending on designs.
const StyledOwnerStar = styled(StarIcon)(({ theme }) => ({
    position: 'absolute',
    color: theme.palette.success.main,
}));

const StyledAvatarMore = styled(StyledAvatar)(({ theme }) => ({
    backgroundColor: colors.purple[100], // TODO: Add to theme?
    color: theme.palette.text.primary,
    fontSize: theme.fontSizes.smallerBody,
    fontWeight: theme.fontWeight.bold,
}));

interface IGroupCardAvatarsProps {
    users: IGroupUser[];
}

export const GroupCardAvatars = ({ users }: IGroupCardAvatarsProps) => {
    const shownUsers = useMemo(
        () => users.sort((a, b) => (a.role < b.role ? 1 : -1)).slice(0, 9),
        [users]
    );
    return (
        <StyledAvatars>
            {shownUsers.map(user => (
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
                        >
                            <StyledOwnerStar />
                        </StyledOwnerAvatar>
                    }
                />
            ))}
            <ConditionallyRender
                condition={users.length > 9}
                show={
                    <StyledAvatarMore>
                        +{users.length - shownUsers.length}
                    </StyledAvatarMore>
                }
            />
        </StyledAvatars>
    );
};
