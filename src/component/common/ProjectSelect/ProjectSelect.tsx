import React, { MouseEventHandler, useMemo, VFC } from 'react';
import { MenuItem } from '@material-ui/core';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import { IProjectCard } from 'interfaces/project';

const ALL_PROJECTS = { id: '*', name: '> All projects' };

interface IProjectSelectProps {
    currentProjectId: string;
    updateCurrentProject: (id: string) => void;
}

const ProjectSelect: VFC<IProjectSelectProps> = ({
    currentProjectId,
    updateCurrentProject,
    ...rest
}) => {
    const { projects } = useProjects();

    const setProject = (value?: string | null) => {
        const id = value && typeof value === 'string' ? value.trim() : '*';
        updateCurrentProject(id);
    };

    const currentProject = useMemo(() => {
        const project = projects.find(i => i.id === currentProjectId);
        return project || ALL_PROJECTS;
    }, [currentProjectId, projects]);

    const handleChangeProject: MouseEventHandler = event => {
        const target = (event.target as Element).getAttribute('data-target');
        setProject(target);
    };

    const renderProjectItem = (selectedId: string, item: IProjectCard) => (
        <MenuItem
            disabled={selectedId === item.id}
            data-target={item.id}
            key={item.id}
            style={{ fontSize: '14px' }}
        >
            {item.name}
        </MenuItem>
    );

    const renderProjectOptions = () => [
        <MenuItem
            disabled={currentProject === ALL_PROJECTS}
            data-target={ALL_PROJECTS.id}
            key={ALL_PROJECTS.id}
            style={{ fontSize: '14px' }} // FIXME: style
        >
            {ALL_PROJECTS.name}
        </MenuItem>,
        ...projects.map(project =>
            renderProjectItem(currentProjectId, project)
        ),
    ];

    return (
        <React.Fragment>
            <DropdownMenu
                id={'project'}
                title="Select project"
                label={`${currentProject.name}`}
                callback={handleChangeProject}
                renderOptions={renderProjectOptions}
                {...rest}
            />
        </React.Fragment>
    );
};

export default ProjectSelect;
