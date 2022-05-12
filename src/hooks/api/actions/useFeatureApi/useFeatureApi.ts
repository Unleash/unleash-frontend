import { ITag } from 'interfaces/tags';
import useAPI from '../useApi/useApi';
import { Operation } from 'fast-json-patch';
import { CreateFeatureSchema } from 'openapi';
import { openApiAdmin } from 'utils/openapiClient';
import { IConstraint } from 'interfaces/strategy';

const useFeatureApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });

    const validateFeatureToggleName = async (name: string | undefined) => {
        const path = `api/admin/features/validate`;
        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify({ name }),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const validateConstraint = async (
        constraint: IConstraint
    ): Promise<void> => {
        const path = `api/admin/constraints/validate`;
        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify(constraint),
        });
        await makeRequest(req.caller, req.id);
    };

    const createFeatureToggle = async (
        projectId: string,
        createFeatureSchema: CreateFeatureSchema
    ) => {
        return openApiAdmin.createFeature({
            projectId,
            createFeatureSchema,
        });
    };

    const toggleFeatureEnvironmentOn = async (
        projectId: string,
        featureName: string,
        environment: string
    ) => {
        return openApiAdmin.toggleEnvironmentOn({
            projectId,
            featureName,
            environment,
        });
    };

    const toggleFeatureEnvironmentOff = async (
        projectId: string,
        featureName: string,
        environment: string
    ) => {
        return openApiAdmin.toggleEnvironmentOff({
            projectId,
            featureName,
            environment,
        });
    };

    const changeFeatureProject = async (
        projectId: string,
        featureId: string,
        newProjectId: string
    ) => {
        const path = `api/admin/projects/${projectId}/features/${featureId}/changeProject`;
        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify({ newProjectId }),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const addTagToFeature = async (featureId: string, tag: ITag) => {
        return openApiAdmin.addTag({
            featureName: featureId,
            tagSchema: tag,
        });
    };

    const deleteTagFromFeature = async (
        featureId: string,
        type: string,
        value: string
    ) => {
        return openApiAdmin.removeTag({
            featureName: featureId,
            type,
            value,
        });
    };

    const archiveFeatureToggle = async (
        projectId: string,
        featureId: string
    ) => {
        const path = `api/admin/projects/${projectId}/features/${featureId}`;
        const req = createRequest(path, {
            method: 'DELETE',
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const patchFeatureToggle = async (
        projectId: string,
        featureName: string,
        patchPayload: any
    ) => {
        return openApiAdmin.patchFeature({
            featureName,
            projectId,
            patchOperationSchema: patchPayload,
        });
    };

    const patchFeatureVariants = async (
        projectId: string,
        featureId: string,
        patchPayload: Operation[]
    ) => {
        const path = `api/admin/projects/${projectId}/features/${featureId}/variants`;
        const req = createRequest(path, {
            method: 'PATCH',
            body: JSON.stringify(patchPayload),
        });

        try {
            const res = await makeRequest(req.caller, req.id);
            return res;
        } catch (e) {
            throw e;
        }
    };

    const cloneFeatureToggle = async (
        projectId: string,
        featureName: string,
        payload: { name: string; replaceGroupId: boolean }
    ) => {
        return openApiAdmin.cloneFeature({
            projectId,
            featureName,
            cloneFeatureSchema: payload,
        });
    };

    return {
        validateFeatureToggleName,
        validateConstraint,
        createFeatureToggle,
        changeFeatureProject,
        errors,
        toggleFeatureEnvironmentOn,
        toggleFeatureEnvironmentOff,
        addTagToFeature,
        deleteTagFromFeature,
        archiveFeatureToggle,
        patchFeatureToggle,
        patchFeatureVariants,
        cloneFeatureToggle,
        loading,
    };
};

export default useFeatureApi;
