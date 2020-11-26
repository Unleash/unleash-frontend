import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StrategiesSection from './strategies-section-container';

import styles from './strategy/strategy.scss';

class UpdateFeatureComponent extends Component {
    // static displayName = `UpdateFeatureComponent-{getDisplayName(Component)}`;

    render() {
        const { featureToggle, addStrategy, removeStrategy, updateStrategy, moveStrategy } = this.props;
        const { name } = featureToggle;
        const configuredStrategies = featureToggle.strategies || [];

        return (
            <section className={styles.paddingDesktop}>
                <StrategiesSection
                    configuredStrategies={configuredStrategies}
                    featureToggleName={name}
                    addStrategy={addStrategy}
                    updateStrategy={updateStrategy}
                    moveStrategy={moveStrategy}
                    removeStrategy={removeStrategy}
                />
            </section>
        );
    }
}

UpdateFeatureComponent.propTypes = {
    featureToggle: PropTypes.object,
    features: PropTypes.array,
    addStrategy: PropTypes.func.isRequired,
    removeStrategy: PropTypes.func.isRequired,
    moveStrategy: PropTypes.func.isRequired,
    updateStrategy: PropTypes.func.isRequired,
};

export default UpdateFeatureComponent;
