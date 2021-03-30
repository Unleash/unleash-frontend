import { connect } from 'react-redux';
import { toggleFeature, fetchFeatureToggles } from '../../../store/feature-toggle/actions';
import { updateSettingForGroup } from '../../../store/settings/actions';
import FeatureToggleList from './FeatureToggleList';

import { hasPermission } from '../../../permissions';

function checkConstraints(strategy, regex) {
    if (!strategy.constraints) {
        return;
    }
    return strategy.constraints.some(c => c.values.some(v => regex.test(v)));
}

export const mapStateToPropsConfigurable = isFeature => state => {
    const featureMetrics = state.featureMetrics.toJS();
    const settings = state.settings.toJS().feature || {};
    let features = isFeature ? state.features.toJS() : state.archive.get('list').toArray();

    if (settings.currentProjectId && settings.currentProjectId !== '*') {
        features = features.filter(f => f.project === settings.currentProjectId);
    }

    if (settings.filter) {
        try {
            const regex = new RegExp(settings.filter, 'i');
            features = features.filter(
                feature =>
                    feature.strategies.some(s => checkConstraints(s, regex)) ||
                    regex.test(feature.name) ||
                    regex.test(feature.description) ||
                    feature.strategies.some(s => s && s.name && regex.test(s.name)) ||
                    (settings.filter.length > 1 && regex.test(JSON.stringify(feature)))
            );
        } catch (e) {
            // Invalid filter regex
        }
    }

    if (!settings.sort) {
        settings.sort = 'name';
    }

    if (settings.sort === 'enabled') {
        features = features.sort((a, b) =>
            // eslint-disable-next-line
            a.enabled === b.enabled ? 0 : a.enabled ? -1 : 1
        );
    } else if (settings.sort === 'stale') {
        features = features.sort((a, b) =>
            // eslint-disable-next-line
            a.stale === b.stale ? 0 : a.stale ? -1 : 1
        );
    } else if (settings.sort === 'created') {
        features = features.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1));
    } else if (settings.sort === 'Last seen') {
        features = features.sort((a, b) => (new Date(a.lastSeenAt) > new Date(b.lastSeenAt) ? -1 : 1));
    } else if (settings.sort === 'name') {
        features = features.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    } else if (settings.sort === 'strategies') {
        features = features.sort((a, b) => (a.strategies.length > b.strategies.length ? -1 : 1));
    } else if (settings.sort === 'type') {
        features = features.sort((a, b) => {
            if (a.type < b.type) {
                return -1;
            }
            if (a.type > b.type) {
                return 1;
            }
            return 0;
        });
    } else if (settings.sort === 'metrics') {
        const target = settings.showLastHour ? featureMetrics.lastHour : featureMetrics.lastMinute;

        features = features.sort((a, b) => {
            if (!target[a.name]) {
                return 1;
            }
            if (!target[b.name]) {
                return -1;
            }
            if (target[a.name].yes > target[b.name].yes) {
                return -1;
            }
            return 1;
        });
    }

    return {
        features,
        featureMetrics,
        settings,
        hasPermission: hasPermission.bind(null, state.user.get('profile')),
    };
};
const mapStateToProps = mapStateToPropsConfigurable(true);
const mapDispatchToProps = {
    toggleFeature,
    fetcher: () => fetchFeatureToggles(),
    updateSetting: updateSettingForGroup('feature'),
};

const FeatureToggleListContainer = connect(mapStateToProps, mapDispatchToProps)(FeatureToggleList);

export default FeatureToggleListContainer;
