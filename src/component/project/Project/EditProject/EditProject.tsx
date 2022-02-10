import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useProjectApi from '../../../../hooks/api/actions/useProjectApi/useProjectApi';
import { useHistory, useParams } from 'react-router-dom';
import ProjectForm from '../ProjectForm/ProjectForm';
import useProjectForm from '../hooks/useProjectForm';
import useProject from '../../../../hooks/api/getters/useProject/useProject';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';
import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { UPDATE_PROJECT } from '../../../providers/AccessProvider/permissions';

const EditProject = () => {
    const { uiConfig } = useUiConfig();
    const { setToastData, setToastApiError } = useToast();
    const { id } = useParams<{ id: string }>();
    const { project } = useProject(id);
    const history = useHistory();
    const {
        projectId,
        projectName,
        projectDesc,
        setProjectId,
        setProjectName,
        setProjectDesc,
        getProjectPayload,
        clearErrors,
        validateIdUniqueness,
        validateName,
        validateProjectId,
        errors,
    } = useProjectForm(id, project.name, project.description);

    const formatApiCode = () => {
        return `curl --location --request PUT '${
            uiConfig.unleashUrl
        }/api/admin/projects/${id}' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getProjectPayload(), undefined, 2)}'`;
    };

    const { refetch } = useProject(id);
    const { editProject, loading } = useProjectApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const payload = getProjectPayload();

        const validName = validateName();
        const validId = validateProjectId();

        if (validName && validId) {
            try {
                await editProject(id, payload);
                refetch();
                history.push(`/projects/${id}`);
                setToastData({
                    title: 'Project information updated',
                    type: 'success',
                });
            } catch (e: any) {
                setToastApiError(e.toString());
            }
        }
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <FormTemplate
            loading={loading}
            title="Edit project"
            description="Projects allows you to group feature toggles together in the management UI."
            documentationLink="https://docs.getunleash.io/user_guide/projects"
            formatApiCode={formatApiCode}
        >
            <ProjectForm
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                projectId={projectId}
                setProjectId={setProjectId}
                projectName={projectName}
                setProjectName={setProjectName}
                projectDesc={projectDesc}
                setProjectDesc={setProjectDesc}
                mode="Edit"
                clearErrors={clearErrors}
                validateIdUniqueness={validateIdUniqueness}
            >
                <PermissionButton permission={UPDATE_PROJECT} type="submit">
                    Edit project
                </PermissionButton>
            </ProjectForm>
        </FormTemplate>
    );
};

export default EditProject;
