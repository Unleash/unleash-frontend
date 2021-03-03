import React from 'react';
import { MenuItem } from '@material-ui/core';
import { DropdownButton } from '../../common';
import PropTypes from 'prop-types';
import DropdownMenu from '../../common/dropdown-menu';

const ALL_PROJECTS = { id: '*', name: '> All projects' };

function projectItem(selectedId, item) {
    return (
        <MenuItem disabled={selectedId === item.id} data-target={item.id} key={item.id}>
            {item.name}
        </MenuItem>
    );
}

function ProjectComponent({ projects, currentProjectId, updateCurrentProject }) {
    function setProject(v) {
        const id = typeof v === 'string' ? v.trim() : '';
        updateCurrentProject(id);
    }

    useEffect(() => {
        if (enabled) {
            fetchProjects();
        }
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    // TODO fixme
    let currentProject = projects.find(i => i.id === currentProjectId);
    if (!currentProject) {
        currentProject = ALL_PROJECTS;
    }

    const handleChangeProject = e => {
        const target = e.target.getAttribute('data-target');
        setProject(target);
    };

    const renderProjectOptions = () => {
        const start = [
            <MenuItem disabled={curentProject === ALL_PROJECTS} data-target={ALL_PROJECTS.id}>
                {ALL_PROJECTS.name}
            </MenuItem>,
        ];

        return [...start, ...projects.map(p => projectItem(currentProjectId, p))];
    };

    return (
        <React.Fragment>
            <DropdownMenu
                id={'project'}
                title="Select project"
                label={`${curentProject.name}`}
                callback={handleChangeProject}
                renderOptions={renderProjectOptions}
            />
        </React.Fragment>
    );
}

ProjectComponent.propTypes = {
    projects: PropTypes.array.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    currentProjectId: PropTypes.string.isRequired,
    updateCurrentProject: PropTypes.func.isRequired,
};

export default ProjectComponent;
