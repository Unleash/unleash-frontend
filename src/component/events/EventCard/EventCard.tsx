import EventDiff from 'component/events/EventDiff/EventDiff';
import { useStyles } from 'component/events/EventCard/EventCard.styles';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IEvent } from 'interfaces/event';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMDHMS } from 'utils/formatDate';
import { Link } from 'react-router-dom';

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
        <li className={styles.container}>
            <dl>
                <dt className={styles.title}>Event id:</dt>
                <dd>{entry.id}</dd>
                <dt className={styles.title}>Changed at:</dt>
                <dd>{createdAtFormatted}</dd>
                <dt className={styles.title}>Event:</dt>
                <dd>{entry.type}</dd>
                <dt className={styles.title}>Changed by:</dt>
                <dd title={entry.createdBy}>{entry.createdBy}</dd>
                <ConditionallyRender
                    condition={Boolean(entry.project)}
                    show={
                        <>
                            <dt className={styles.title}>Project:</dt>
                            <dd>
                                <Link to={`/projects/${entry.project}`}>
                                    {entry.project}
                                </Link>
                            </dd>
                        </>
                    }
                />
                <ConditionallyRender
                    condition={Boolean(entry.featureName)}
                    show={
                        <>
                            <dt className={styles.title}>Feature:</dt>
                            <dd>
                                <Link
                                    to={`/projects/${entry.project}/features/${entry.featureName}`}
                                >
                                    {entry.featureName}
                                </Link>
                            </dd>
                        </>
                    }
                />
            </dl>
            <ConditionallyRender
                condition={entry.data || entry.preData}
                show={
                    <div className={styles.code}>
                        <strong className={styles.title}>Changes:</strong>
                        <EventDiff entry={entry} />
                    </div>
                }
            />
        </li>
    );
};

export default EventCard;
