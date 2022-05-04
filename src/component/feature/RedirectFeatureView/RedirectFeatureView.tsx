import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';
import { getTogglePath } from 'utils/routePathHelpers';
import { FeatureSchema } from 'openapi';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';

const RedirectFeatureView = () => {
    const name = useRequiredPathParam('name');
    const { features = [] } = useFeatures();
    const [featureToggle, setFeatureToggle] = useState<FeatureSchema>();

    useEffect(() => {
        const toggle = features.find(
            (toggle: FeatureSchema) => toggle.name === name
        );

        setFeatureToggle(toggle);
    }, [features, name]);

    if (!featureToggle) {
        return null;
    }

    return (
        <Navigate
            to={getTogglePath(featureToggle?.project, featureToggle?.name)}
            replace
        />
    );
};

export default RedirectFeatureView;
