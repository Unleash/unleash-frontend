import PropTypes from 'prop-types';
import EventLog from '../EventLog';
import { useEvents } from '../../../hooks/api/getters/useEvents/useEvents';

export const FeatureEventHistory = ({ toggleName }) => {
    const { events } = useEvents(toggleName);

    if (events.length === 0) {
        return null;
    }

    return (
        <EventLog history={events} hideName title="Change log" displayInline />
    );
};

FeatureEventHistory.propTypes = {
    toggleName: PropTypes.string.isRequired,
};
