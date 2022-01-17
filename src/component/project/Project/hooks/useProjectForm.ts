import { useEffect, useState } from 'react';
import useProjects from '../../../../hooks/api/getters/useProjects/useProjects';
import { IPermission } from '../../../../interfaces/project';

export interface ICheckedPermission {
    [key: string]: IPermission;
}

const useProjectForm = (
    initialProjectId = '',
    initialProjectName = '',
    initialProjectDesc = ''
) => {
    const { projects } = useProjects();
    const [projectId, setProjectId] = useState(initialProjectId);
    const [projectName, setProjectName] = useState(initialProjectName);
    const [projectDesc, setProjectDesc] = useState(initialProjectDesc);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setProjectId(initialProjectId);
    }, [initialProjectId]);

    useEffect(() => {
        setProjectName(initialProjectName);
    }, [initialProjectName]);

    useEffect(() => {
        setProjectDesc(initialProjectDesc);
    }, [initialProjectDesc]);

    const getProjectPayload = () => {
        return {
            id: projectId,
            name: projectName,
            description: projectDesc,
        };
    };

    const validateIdUniqueness = () => {
        if (projectId.length === 0) {
            setErrors(prev => ({ ...prev, id: 'id can not be empty.' }));
            return false;
        }
        let projectIdExist = projects.some(
            project => project['id'] === projectId
        );
        if (projectIdExist) {
            setErrors(prev => ({
                ...prev,
                id: 'There already exists a project with this id',
            }));
            return false;
        }
        return true;
    };

    const validateName = () => {
        if (projectName.length === 0) {
            setErrors(prev => ({ ...prev, name: 'Name can not be empty.' }));
            return false;
        }
        return true;
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        projectId,
        projectName,
        projectDesc,
        setProjectId,
        setProjectName,
        setProjectDesc,
        getProjectPayload,
        validateName,
        validateIdUniqueness,
        clearErrors,
        errors,
    };
};

export default useProjectForm;
