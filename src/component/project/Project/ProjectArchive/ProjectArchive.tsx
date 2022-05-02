import { ArchiveListContainer } from 'component/archive/ArchiveListContainer';
import { usePageTitle } from 'hooks/usePageTitle';

interface IProjectArchiveProps {
    projectId: string;
}

export const ProjectArchive = ({ projectId }: IProjectArchiveProps) => {
    usePageTitle('Project archived feature toggles');

    return <ArchiveListContainer projectId={projectId} />;
};
