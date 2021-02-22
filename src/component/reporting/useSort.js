import { useState } from "react";
import {
    sortProjectsByNameAscending,
    sortProjectsByNameDescending
} from "./utils";

import { LAST_SEEN, NAME } from "./constants";

const useSort = () => {
    const [sortData, setSortData] = useState({
        sortKey: NAME,
        ascending: true
    });

    const sort = features => {
        switch (sortData.sortKey) {
            case NAME:
                return handleSortName(features, sortData);
            case LAST_SEEN:
                return sortProjectsByLastSeen(features);
            default:
                return features;
        }
    };

    const handleSortName = features => {
        if (sortData.ascending) {
            return sortProjectsByNameAscending(features);
        }

        return sortProjectsByNameDescending(features);
    };

    const handleSortLastSeen = features => {};

    return [sort, setSortData];
};

export default useSort;
