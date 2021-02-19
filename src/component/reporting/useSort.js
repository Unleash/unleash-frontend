import { useState } from "react";

import { LAST_SEEN, NAME } from "./constants";
import {
    sortProjectsByNameAscending,
    sortProjectsByNameDescending
} from "./utils";

const ASCENDING = "ascending";
const DESCENDING = "descending";

const useSort = () => {
    const [sortKey, setSortKey] = useState(NAME);
    const [sortNameState, setSortNameState] = useState(DESCENDING);

    const sort = (features, preserve = false) => {
        switch (sortKey) {
            case NAME:
                return handleSortName(features, preserve);
            case LAST_SEEN:
                return sortProjectsByLastSeen(features);
            default:
                return features;
        }
    };

    const handleSortName = (projects, preserve) => {
        if (sortNameState === ASCENDING) {
            if (!preserve) {
                setSortNameState(DESCENDING);
            }

            return sortProjectsByNameDescending(projects);
        }

        if (!preserve) {
            setSortNameState(ASCENDING);
        }
        return sortProjectsByNameAscending(projects);
    };

    return [sort, setSortKey];
};

export default useSort;
