import { useEffect } from 'react';
import PropTypes from 'prop-types';

import EventLog from '../EventLog';

const EventHistory = ({ fetchHistory, history }) => {
    useEffect(() => {
        fetchHistory();
    }, []);

    if (history.length < 0) {
        return null;
    }

    return <EventLog history={history} title="Recent changes" />;
};

EventHistory.propTypes = {
    fetchHistory: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired,
};

export default EventHistory;
