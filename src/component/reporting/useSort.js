import { useState } from "react";
import {
    sortFeaturesByNameAscending,
    sortFeaturesByNameDescending,
    sortFeaturesByLastSeenAscending,
    sortFeaturesByLastSeenDescending,
    sortFeaturesByCreatedAtAscending,
    sortFeaturesByCreatedAtDescending,
    sortFeaturesByExpiredAtAscending,
    sortFeaturesByExpiredAtDescending,
    sortFeaturesByStatusAscending,
    sortFeaturesByStatusDescending
} from "./utils";

import { LAST_SEEN, NAME, CREATED, EXPIRED, STATUS, REPORT } from "./constants";

const useSort = () => {
    const [sortData, setSortData] = useState({
        sortKey: NAME,
        ascending: true
    });

    const sort = features => {
        switch (sortData.sortKey) {
            case NAME:
                return handleSortName(features);
            case LAST_SEEN:
                return handleSortLastSeen(features);
            case CREATED:
                return handleCreated(features);
            case EXPIRED:
            case REPORT:
                return handleExpired(features);
            case STATUS:
                return handleStatus(features);
            default:
                return features;
        }
    };

    const handleSortName = features => {
        if (sortData.ascending) {
            return sortFeaturesByNameAscending(features);
        }

        return sortFeaturesByNameDescending(features);
    };

    const handleSortLastSeen = features => {
        if (sortData.ascending) {
            return sortFeaturesByLastSeenAscending(features);
        }
        return sortFeaturesByLastSeenDescending(features);
    };

    const handleCreated = features => {
        if (sortData.ascending) {
            return sortFeaturesByCreatedAtAscending(features);
        }
        return sortFeaturesByCreatedAtDescending(features);
    };

    const handleExpired = features => {
        if (sortData.ascending) {
            return sortFeaturesByExpiredAtAscending(features);
        }
        return sortFeaturesByExpiredAtDescending(features);
    };

    const handleStatus = features => {
        if (sortData.ascending) {
            return sortFeaturesByStatusAscending(features);
        }
        return sortFeaturesByStatusDescending(features);
    };

    return [sort, setSortData];
};

export default useSort;
