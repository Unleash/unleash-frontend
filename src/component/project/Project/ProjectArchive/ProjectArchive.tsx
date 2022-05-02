import { ArchiveListContainer } from 'component/archive/ArchiveListContainer';
import { usePageTitle } from 'hooks/usePageTitle';

interface IProjectArchiveProps {
    projectId: string;
}

export const ProjectArchive = ({ projectId }: IProjectArchiveProps) => {
    usePageTitle('Project Archived Features');

    return <ArchiveListContainer projectId={projectId} />;
};
