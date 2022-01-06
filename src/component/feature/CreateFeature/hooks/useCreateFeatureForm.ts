import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFeatureApi from '../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import { IFeatureViewParams } from '../../../../interfaces/params';

const useCreateFeatureForm = (
    initialName = '',
    initialType = 'release',
    initialProject = 'default',
    initialDescription = ''
) => {
    const { projectId } = useParams<IFeatureViewParams>();

    const [type, setType] = useState(initialType);
    const [name, setName] = useState(initialName);
    const [project, setProject] = useState(projectId);
    const [description, setDescription] = useState(initialDescription);

    const [errors, setErrors] = useState({});

    const { validateFeatureToggleName } = useFeatureApi();

    useEffect(() => {
        setType(initialType);
    }, [initialType]);

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    // useEffect(() => {
    //     setProject(initialProject);
    // }, [initialProject]);

    useEffect(() => {
        setDescription(initialDescription);
    }, [initialDescription]);

    const getTogglePayload = () => {
        return {
            type: type,
            name: name,
            projectId: project,
            description: description,
        };
    };

    const validateName = async (name: string) => {
        if (name.length === 0) {
            setErrors(prev => ({ ...prev, name: 'Name can not be empty.' }));
            return;
        }
        if (name.length > 0) {
            try {
                await validateFeatureToggleName(name);
            } catch (err: any) {
                setErrors(prev => ({
                    ...prev,
                    name:
                        err && err.message
                            ? err.message
                            : 'Could not check name',
                }));
            }
        }
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        type,
        setType,
        name,
        setName,
        project,
        setProject,
        description,
        setDescription,
        getTogglePayload,
        validateName,
        clearErrors,
        errors,
    };
};

export default useCreateFeatureForm;
