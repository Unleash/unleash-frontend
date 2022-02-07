import React, { useEffect } from 'react';
import { MenuItem } from '@material-ui/core';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import useProjects from '../../../hooks/api/getters/useProjects/useProjects';
import { IProjectCard } from '../../../interfaces/project';

const ALL_PROJECTS = {
    id: '*',
    name: '> All projects',
    createdAt: '',
    health: 0,
    description: '',
    featureCount: 0,
    memberCount: 0,
};

interface IProjectSelectProps {
    currentProjectId: string;
    updateCurrentProject: (id: string) => void;
}

const ProjectSelect = ({
    currentProjectId,
    updateCurrentProject,
    ...rest
}: IProjectSelectProps) => {
    const { projects } = useProjects();

    useEffect(() => {
        let currentProject = projects.find(i => i.id === currentProjectId);

        if (currentProject) {
            setProject(currentProject.id);
            return;
        }

        setProject('*');
        /* eslint-disable-next-line */
    }, []);

    const setProject = (v: string) => {
        const id = typeof v === 'string' ? v.trim() : '';
        updateCurrentProject(id);
    };

    // TODO fixme
    let curentProject = projects.find(i => i.id === currentProjectId);
    if (!curentProject) {
        curentProject = ALL_PROJECTS;
    }

    const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const target = e.target.getAttribute('data-target');
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

    const renderProjectOptions = () => {
        const start = [
            <MenuItem
                disabled={curentProject === ALL_PROJECTS}
                data-target={ALL_PROJECTS.id}
                key={ALL_PROJECTS.id}
                style={{ fontSize: '14px' }}
            >
                {ALL_PROJECTS.name}
            </MenuItem>,
        ];

        return [
            ...start,
            ...projects.map(p => renderProjectItem(currentProjectId, p)),
        ];
    };

    const { ...passDown } = rest;

    return (
        <>
            <DropdownMenu
                id={'project'}
                title="Select project"
                label={`${curentProject.name}`}
                callback={handleChangeProject}
                renderOptions={renderProjectOptions}
                className=""
                {...passDown}
            />
        </>
    );
};

export default ProjectSelect;
