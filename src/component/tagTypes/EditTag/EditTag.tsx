import { useHistory, useParams } from 'react-router-dom';
import useTagTypesApi from '../../../hooks/api/actions/useTagTypesApi/useTagTypesApi';
import useTagType from '../../../hooks/api/getters/useTagType/useTagType';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../hooks/useToast';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import useTagForm from '../hooks/useTagForm';
import TagForm from '../TagForm/TagForm';

const EditTag = () => {
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const { name } = useParams<{ name: string }>();
    const { tagType } = useTagType(name);
    const {
        tagName,
        tagDesc,
        setTagName,
        setTagDesc,
        getTagPayload,
        errors,
        clearErrors,
    } = useTagForm(tagType?.name, tagType?.description);
    const { updateTagType, loading } = useTagTypesApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
            const payload = getTagPayload();
            try {
                await updateTagType(tagName, payload);
                history.push('/tag-types');
                setToastData({
                    title: 'Tag type updated',
                    type: 'success',
                });
            } catch (e: any) {
                setToastApiError(e.toString());
            }
    };

    const formatApiCode = () => {
        return `curl --location --request PUT '${
            uiConfig.unleashUrl
        }/api/admin/tag-types/${name}' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getTagPayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <FormTemplate
            loading={loading}
            title="Edit tag type"
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
                submitButtonText="Edit"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default EditTag;
