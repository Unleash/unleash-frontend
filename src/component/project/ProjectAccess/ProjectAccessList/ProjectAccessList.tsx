import { List } from '@material-ui/core';
import {
    IProjectAccessOutput,
    IProjectAccessUsers,
} from '../../../../hooks/api/getters/useProjectAccess/useProjectAccess';
import { ProjectAccessListItem } from './ProjectAccessListItem/ProjectAccessListItem';

interface IProps {
    page: IProjectAccessUsers[];
    handleRoleChange: (
        userId: number,
        currRoleId: number
    ) => (evt: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveAccess: (user: IProjectAccessUsers) => void;
    access: IProjectAccessOutput;
}

export const ProjectAccessList: React.FC<IProps> = ({
    page,
    access,
    handleRoleChange,
    handleRemoveAccess,
    children,
}) => {
    const sortUsers = (users: IProjectAccessUsers[]): IProjectAccessUsers[] => {
        /* This should be done on the API side in the future, 
                we should expect the list of users to come in the 
                same order each time and not jump around on the screen*/

        return users.sort(
            (userA: IProjectAccessUsers, userB: IProjectAccessUsers) => {
                if (!userA.name) {
                    return -1;
                } else if (!userB.name) {
                    return 1;
                }

                return userA.name.localeCompare(userB.name);
            }
        );
    };

    return (
        <List>
            {sortUsers(page).map(user => {
                return (
                    <ProjectAccessListItem
                        key={user.id}
                        access={access}
                        handleRoleChange={handleRoleChange}
                        handleRemoveAccess={handleRemoveAccess}
                    />
                );
            })}
            {children}
        </List>
    );
};
