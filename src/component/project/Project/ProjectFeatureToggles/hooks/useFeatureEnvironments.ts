import { useEffect, useRef } from 'react';
import { IFeatureToggleListItem } from 'interfaces/featureToggle';

const getEnvirnmentsFromFeature = (feature?: IFeatureToggleListItem) =>
    feature?.environments
        ?.sort(({ sortOrder: a }, { sortOrder: b }) => (a || 0) - (b || 0))
        ?.map(({ name }) => name) || [];

export const useFeatureEnvironments = (feature: IFeatureToggleListItem) => {
    const ref = useRef<string[]>(getEnvirnmentsFromFeature(feature));

    const newValue = getEnvirnmentsFromFeature(feature);

    if (newValue?.join('') !== ref.current?.join('')) {
        ref.current = newValue;
    }

    return ref.current;
};
