import FormTemplate from 'component/common/FormTemplate/FormTemplate';
import { UPDATE_SEGMENT } from 'component/providers/AccessProvider/permissions';
import { useSegmentsApi } from 'hooks/api/actions/useSegmentsApi/useSegmentsApi';
import { useConstraintsValidation } from 'hooks/api/getters/useConstraintsValidation/useConstraintsValidation';
import { useSegment } from 'hooks/api/getters/useSegment/useSegment';
import { useSegments } from 'hooks/api/getters/useSegments/useSegments';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import useToast from 'hooks/useToast';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatUnknownError } from 'utils/format-unknown-error';
import { useSegmentForm } from '../hooks/useSegmentForm';
import { SegmentForm } from '../SegmentForm/SegmentForm';
import {
    segmentsFormDocsLink,
    segmentsFormDescription,
} from 'component/segments/CreateSegment/CreateSegment';
import { UpdateButton } from 'component/common/UpdateButton/UpdateButton';

export const EditSegment = () => {
    const segmentId = useRequiredPathParam('segmentId');
    const { segment } = useSegment(Number(segmentId));
    const { uiConfig } = useUiConfig();
    const { setToastData, setToastApiError } = useToast();
    const history = useHistory();
    const { updateSegment, loading } = useSegmentsApi();
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
    } = useSegmentForm(
        segment?.name,
        segment?.description,
        segment?.constraints
    );

    const hasValidConstraints = useConstraintsValidation(constraints);

    const formatApiCode = () => {
        return `curl --location --request PUT '${
            uiConfig.unleashUrl
        }/api/admin/segments/${segmentId}' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getSegmentPayload(), undefined, 2)}'`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        if (segment) {
            e.preventDefault();
            clearErrors();
            try {
                await updateSegment(segment.id, getSegmentPayload());
                await refetchSegments();
                history.push('/segments/');
                setToastData({
                    title: 'Segment updated',
                    type: 'success',
                });
            } catch (error: unknown) {
                setToastApiError(formatUnknownError(error));
            }
        }
    };

    return (
        <FormTemplate
            loading={loading}
            title="Edit segment"
            description={segmentsFormDescription}
            documentationLink={segmentsFormDocsLink}
            documentationLinkLabel="More about segments"
            formatApiCode={formatApiCode}
        >
            <SegmentForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                constraints={constraints}
                setConstraints={setConstraints}
                mode="Edit"
                errors={errors}
                clearErrors={clearErrors}
            >
                <UpdateButton
                    permission={UPDATE_SEGMENT}
                    disabled={!hasValidConstraints}
                />
            </SegmentForm>
        </FormTemplate>
    );
};
