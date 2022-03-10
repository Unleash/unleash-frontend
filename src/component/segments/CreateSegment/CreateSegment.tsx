import { CreateButton } from 'component/common/CreateButton/CreateButton';
import FormTemplate from 'component/common/FormTemplate/FormTemplate';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import { useSegmentsApi } from 'hooks/api/actions/useSegmentsApi/useSegmentsApi';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import useToast from 'hooks/useToast';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatUnknownError } from 'utils/format-unknown-error';
import { useSegmentForm } from '../hooks/useSegmentForm';
import { SegmentForm } from '../SegmentForm/SegmentForm';

export const CreateSegment = () => {
    const { uiConfig } = useUiConfig();
    const { setToastData, setToastApiError } = useToast();
    const history = useHistory();
    const { createSegment, loading } = useSegmentsApi();
    const { refetchSegments } = useSegments();
    const {
        name,
        setName,
        description,
        setDescription,
        constraints,
        setConstraints,
        getSegmentPayload,
        errors,
        clearErrors,
    } = useSegmentForm();

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/segments' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getSegmentPayload(), undefined, 2)}'`;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        try {
            //@ts-expect-error
            await createSegment(getSegmentPayload());
            refetchSegments();
            history.push('/segments/');
            setToastData({
                title: 'Segment created',
                text: 'Segment created successfully created',
                confetti: true,
                type: 'success',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };
    const handleCancel = () => {
        history.goBack();
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create segment"
            description="Segment makes it easy for you to define who should be exposed to your feature.
            The segment is often a collection of constraints and can be reused.
            Create a segment and use it when you configure an activation strategy on a feature toggle. "
            documentationLink="https://docs.getunleash.io/how-to/how-to-create-and-assign-custom-project-roles"
            formatApiCode={formatApiCode}
        >
            <SegmentForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                constraints={constraints}
                setConstraints={setConstraints}
                mode="Create"
                errors={errors}
                clearErrors={clearErrors}
            >
                <CreateButton name="segment" permission={ADMIN} />
            </SegmentForm>
        </FormTemplate>
    );
};
