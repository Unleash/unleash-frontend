import useSWR, { mutate, SWRConfiguration } from 'swr';
import { useCallback } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import handleErrorResponses from '../httpErrorResponseHandler';
import { IEvent } from '../../../../interfaces/event';

const PATH = formatApiPath('api/admin/events');

export interface IUseEventsOutput {
    events: IEvent[];
    refetchEvents: () => void;
    loading: boolean;
    error?: Error;
}

export const useEvents = (
    featureName?: string,
    options?: SWRConfiguration
): IUseEventsOutput => {
    const { data, error } = useSWR<{ events: IEvent[] }>(
        [PATH, featureName],
        () => fetchEvents(featureName),
        options
    );

    const refetchEvents = useCallback(() => {
        mutate(PATH).catch(console.warn);
    }, []);

    return {
        events: data?.events || [],
        loading: !error && !data,
        refetchEvents,
        error,
    };
};

function fetchEvents(featureName?: string) {
    return featureName ? fetchFeatureEvents(featureName) : fetchAllEvents();
}

function fetchAllEvents() {
    return fetch(PATH, { method: 'GET' })
        .then(handleErrorResponses('Event history'))
        .then(res => res.json());
}

function fetchFeatureEvents(featureName: string) {
    return fetch(`${PATH}/${featureName}`, { method: 'GET' })
        .then(handleErrorResponses('Event history'))
        .then(res => res.json());
}
