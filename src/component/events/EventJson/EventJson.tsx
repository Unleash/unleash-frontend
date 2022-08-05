import { useStyles } from 'component/events/EventJson/EventJson.styles';
import { IEvent } from 'interfaces/event';

interface IEventJsonProps {
    entry: IEvent;
}

const EventJson = ({ entry }: IEventJsonProps) => {
    const { classes: styles } = useStyles();

    const localEventData = JSON.parse(JSON.stringify(entry));
    delete localEventData.description;
    delete localEventData.name;
    delete localEventData.diffs;

    const prettyPrinted = JSON.stringify(localEventData, null, 2);

    return (
        <li className={styles.container}>
            <div>
                <code>{prettyPrinted}</code>
            </div>
        </li>
    );
};

export default EventJson;
