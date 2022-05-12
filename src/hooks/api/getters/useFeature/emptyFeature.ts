import { FeatureSchema } from '../../../../openapi';

export const emptyFeature: FeatureSchema = {
    environments: [],
    name: '',
    type: '',
    stale: false,
    archived: false,
    createdAt: null,
    lastSeenAt: null,
    project: '',
    variants: [],
    description: '',
    impressionData: false,
};
