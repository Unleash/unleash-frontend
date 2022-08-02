import { ProjectAccessAssign } from '../ProjectAccessAssign/ProjectAccessAssign';
import { useOptionalPathParam } from 'hooks/useOptionalPathParam';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import useProjectAccess from 'hooks/api/getters/useProjectAccess/useProjectAccess';
import { useAccess } from 'hooks/api/getters/useAccess/useAccess';

export const ProjectAccessDialog = () => {
    const projectId = useRequiredPathParam('projectId');
    const userId = useOptionalPathParam('userId');
    const groupId = useOptionalPathParam('groupId');

    const { access } = useProjectAccess(projectId);

    const { users, groups } = useAccess();

    if (userId) {
    }

    return (
        <span>Hello</span>
        // <ProjectAccessAssign
        //     onClose={() => setAssignOpen(false)}
        //     accesses={mappedData}
        //     users={users}
        //     groups={groups}
        //     roles={roles}
        //     entityType={entityType}
        // />
    );
};
