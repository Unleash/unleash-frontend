import { IFeatureToggle } from '../interfaces/featureToggle';
import { useCallback, useMemo, useState } from 'react';

export interface IFeaturesFilter {
    query?: string;
    project: string;
}

export interface IFeaturesSortOutput {
    filtered: IFeatureToggle[];
    filter: IFeaturesFilter;
    setFilter: (fn: (prev: IFeaturesFilter) => IFeaturesFilter) => void;
}

export const useFeaturesFilter = (
    features: IFeatureToggle[],
    initialValue?: Partial<IFeaturesFilter>
): IFeaturesSortOutput => {
    const [filter, setFilter] = useState<IFeaturesFilter>(() => {
        return createInitialValue(initialValue);
    });

    const filtered = useMemo(() => {
        return filterFeatures(features, filter);
    }, [features, filter]);

    const setFilterWithValidation = useCallback(
        (fn: (prev: IFeaturesFilter) => IFeaturesFilter) => {
            setFilter(prev => {
                const next = fn(prev);
                assertValidFilter(next);
                return next;
            });
        },
        [setFilter]
    );

    return {
        setFilter: setFilterWithValidation,
        filtered,
        filter,
    };
};

// Return the current project ID a project has been selected,
// or the 'default' project if showing all projects.
export const resolveFilteredProjectId = (
    filter: IFeaturesFilter
): string => {
    if (!filter.project || filter.project === '*') {
        return 'default';
    }

    return filter.project;
};

const createInitialValue = (
    initialFilter?: Partial<IFeaturesFilter>
): IFeaturesFilter => {
    return {
        project: '*',
        ...initialFilter,
    };
};

// The project filter should always be a non-empty string.
// It can be a project ID or a '*' to match all projects.
const assertValidFilter = (filter: IFeaturesFilter) => {
    if (!filter.project) {
        throw new Error(`Invalid useFeaturesFilter project: ${filter.project}`);
    }
};

const filterFeatures = (
    features: IFeatureToggle[],
    filter: IFeaturesFilter
): IFeatureToggle[] => {
    return filterFeaturesByQuery(
        filterFeaturesByProject(features, filter),
        filter
    );
};

const filterFeaturesByProject = (
    features: IFeatureToggle[],
    filter: IFeaturesFilter
): IFeatureToggle[] => {
    return filter.project === '*'
        ? features
        : features.filter(f => f.project === filter.project);
};

const filterFeaturesByQuery = (
    features: IFeatureToggle[],
    filter: IFeaturesFilter
): IFeatureToggle[] => {
    if (!filter.query) {
        return features;
    }

    // Try to parse the search query as a RegExp.
    // Return all features if it can't be parsed.
    try {
        const regExp = new RegExp(filter.query, 'i');
        return features.filter(f => filterFeatureByRegExp(f, filter, regExp));
    } catch (err) {
        if (err instanceof SyntaxError) {
            return features;
        } else {
            throw err;
        }
    }
};

const filterFeatureByRegExp = (
    feature: IFeatureToggle,
    filter: IFeaturesFilter,
    regExp: RegExp
): boolean => {
    if (regExp.test(feature.name) || regExp.test(feature.description)) {
        return true;
    }

    if (
        filter.query &&
        filter.query.length > 1 &&
        regExp.test(JSON.stringify(feature))
    ) {
        return true;
    }

    if (!feature.strategies) {
        return false;
    }

    return feature.strategies.some(
        s =>
            regExp.test(s.name) ||
            s.constraints.some(c => c.values.some(v => regExp.test(v)))
    );
};
