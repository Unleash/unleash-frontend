import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StrategiesSection from './strategies-section-container';
class ViewFeatureComponent extends Component {
    render() {
        const { featureToggle } = this.props;
        const configuredStrategies = featureToggle.strategies || [];

        return (
            <section style={{ padding: '16px' }}>
                <StrategiesSection
                    configuredStrategies={configuredStrategies}
                    editable={false}
                    featureToggleName={featureToggle.name}
                />
            </section>
        );
    }
}

ViewFeatureComponent.propTypes = {
    featureToggle: PropTypes.object.isRequired,
};

export default ViewFeatureComponent;
