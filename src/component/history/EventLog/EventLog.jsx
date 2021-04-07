import { List, Switch, FormControlLabel } from '@material-ui/core';

import { formatFullDateTimeWithLocale } from '../../common/util';

import EventJson from './EventJson/EventJson';
import PageContent from '../../common/PageContent/PageContent';
import HeaderTitle from '../../common/HeaderTitle';
import EventCard from './EventCard/EventCard';

import styles from '../history.module.scss';

const EventLog = ({
    updateSetting,
    title,
    history,
    settings,
    location,
    hideName,
}) => {
    const toggleShowDiff = () => {
        updateSetting('showData', !settings.showData);
    };
    const formatFulldateTime = v => {
        return formatFullDateTimeWithLocale(v, location.locale);
    };

    const showData = settings.showData;

    if (!history || history.length < 0) {
        return null;
    }

    let entries;

    const renderListItemCards = entry => (
        <div key={entry.id} className={styles.eventEntry}>
            <EventCard
                entry={entry}
                timeFormatted={formatFulldateTime(entry.createdAt)}
            />
        </div>
    );

    if (showData) {
        entries = history.map(entry => (
            <EventJson key={`log${entry.id}`} entry={entry} />
        ));
    } else {
        entries = history.map(renderListItemCards);
    }

    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title={title}
                    actions={
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showData}
                                    onChange={toggleShowDiff}
                                    color="primary"
                                />
                            }
                            label="Full events"
                        />
                    }
                />
            }
        >
            <div className={styles.history}>
                <List>{entries}</List>
            </div>
        </PageContent>
    );
};

export default EventLog;
