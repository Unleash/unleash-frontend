import { Switch, FormControlLabel, useMediaQuery } from '@mui/material';
import EventJson from 'component/events/EventJson/EventJson';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import EventCard from 'component/events/EventCard/EventCard';
import { useStyles } from './EventLog.styles';
import { useEventSettings } from 'hooks/useEventSettings';
import React, { useState, useEffect } from 'react';
import { Search } from 'component/common/Search/Search';
import theme from 'themes/theme';
import { useEventSearch } from 'hooks/api/getters/useEventSearch/useEventSearch';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useOnVisible } from 'hooks/useOnVisible';
import { IEvent } from 'interfaces/event';

interface IEventLogProps {
    title: string;
    project?: string;
    feature?: string;
    displayInline?: boolean;
}

export const EventLog = ({
    title,
    project,
    feature,
    displayInline,
}: IEventLogProps) => {
    const [query, setQuery] = useState('');
    const { events, fetchNextPage } = useEventSearch(project, feature, query);
    const fetchNextPageRef = useOnVisible<HTMLDivElement>(fetchNextPage);
    const { eventSettings, setEventSettings } = useEventSettings();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { classes: styles } = useStyles();

    // Cache the previous search results so that we can show those while
    // fetching new results for a new search query in the background.
    const [cache, setCache] = useState<IEvent[]>();
    useEffect(() => events && setCache(events), [events]);

    const onShowData = () => {
        setEventSettings(prev => ({ showData: !prev.showData }));
    };

    const searchInputField = <Search onChange={setQuery} debounceTime={500} />;

    const showDataSwitch = (
        <FormControlLabel
            label="Full events"
            control={
                <Switch
                    checked={eventSettings.showData}
                    onChange={onShowData}
                    color="primary"
                />
            }
        />
    );

    return (
        <PageContent
            disablePadding={displayInline}
            disableBorder={displayInline}
            header={
                <PageHeader
                    title={title}
                    actions={
                        <>
                            {showDataSwitch}
                            {!isSmallScreen && searchInputField}
                        </>
                    }
                >
                    {isSmallScreen && searchInputField}
                </PageHeader>
            }
        >
            <ConditionallyRender
                condition={Boolean(cache && cache.length === 0)}
                show={() => <p>No events found.</p>}
            />
            <ConditionallyRender
                condition={Boolean(cache && cache.length > 0)}
                show={() => (
                    <ul className={styles.events}>
                        {cache?.map(entry => (
                            <ConditionallyRender
                                key={entry.id}
                                condition={eventSettings.showData}
                                show={() => <EventJson entry={entry} />}
                                elseShow={() => <EventCard entry={entry} />}
                            />
                        ))}
                    </ul>
                )}
            />
            <div ref={fetchNextPageRef} />
        </PageContent>
    );
};
