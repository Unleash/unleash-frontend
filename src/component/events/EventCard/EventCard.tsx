import EventDiff from 'component/events/EventDiff/EventDiff';
import { useStyles } from 'component/events/EventCard/EventCard.styles';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IEvent } from 'interfaces/event';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMDHMS } from 'utils/formatDate';

interface IEventCardProps {
    entry: IEvent;
}

const EventCard = ({ entry }: IEventCardProps) => {
    const { classes: styles } = useStyles();
    const { locationSettings } = useLocationSettings();

    const createdAtFormatted = formatDateYMDHMS(
        entry.createdAt,
        locationSettings.locale
    );

    return (
        <li className={styles.eventEntry}>
            <dl>
                <dt className={styles.eventLogHeader}>Event id: </dt>
                <dd>{entry.id}</dd>
                <dt className={styles.eventLogHeader}>Changed at:</dt>
                <dd>{createdAtFormatted}</dd>
                <dt className={styles.eventLogHeader}>Event: </dt>
                <dd>{entry.type}</dd>
                <dt className={styles.eventLogHeader}>Changed by: </dt>
                <dd title={entry.createdBy}>{entry.createdBy}</dd>
                <ConditionallyRender
                    condition={Boolean(entry.project)}
                    show={
                        <>
                            <dt className={styles.eventLogHeader}>Project: </dt>
                            <dd>{entry.project}</dd>
                        </>
                    }
                />
                <ConditionallyRender
                    condition={Boolean(entry.featureName)}
                    show={
                        <>
                            <dt className={styles.eventLogHeader}>Feature: </dt>
                            <dd>{entry.featureName}</dd>
                        </>
                    }
                />
            </dl>
            <ConditionallyRender
                condition={entry.data || entry.preData}
                show={
                    <>
                        <strong>Change</strong>
                        <EventDiff entry={entry} />
                    </>
                }
            />
        </li>
    );
};

export default EventCard;
