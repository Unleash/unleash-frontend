import { useHistory } from 'react-router-dom';
import useTagTypesApi from '../../../hooks/api/actions/useTagTypesApi/useTagTypesApi';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../hooks/useToast';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import useTagForm from '../hooks/useTagForm';
import TagForm from '../TagForm/TagForm';

const CreateTag = () => {
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const {
        tagName,
        tagDesc,
        setTagName,
        setTagDesc,
        getTagPayload,
        validateNameUniqueness,
        errors,
        clearErrors,
    } = useTagForm();
    const { createTag } = useTagTypesApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        const validName = await validateNameUniqueness();
        if (validName) {
            const payload = getTagPayload();
            try {
                await createTag(payload);
                history.push('/tag-types');
                setToastData({
                    title: 'Tag type created',
                    confetti: true,
                    type: 'success',
                });
            } catch (e: any) {
                setToastApiError(e.toString());
            }
        }
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/tag-types' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getTagPayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <FormTemplate
            // loading={loading}
            title="Create tag type"
            description="Tag types allow you to group tags together in the management UI"
            documentationLink="https://docs.getunleash.io/"
            formatApiCode={formatApiCode}
        >
            <TagForm
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                tagName={tagName}
                setTagName={setTagName}
                tagDesc={tagDesc}
                setTagDesc={setTagDesc}
                submitButtonText="Create"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default CreateTag;
