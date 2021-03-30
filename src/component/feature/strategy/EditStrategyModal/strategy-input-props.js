import PropTypes from 'prop-types';

export default {
    strategyDefinition: PropTypes.shape({
        name: PropTypes.string,
        parameters: PropTypes.array,
    }).isRequired,
    parameters: PropTypes.object.isRequired,
    updateParameter: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
};
