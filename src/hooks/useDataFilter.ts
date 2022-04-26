import React, { useState } from 'react';

export const useDataFilter = (
    data: any,
    filters: string[],
    setter: React.SetStateAction<React.Dispatch<any>>
) => {
    // setup filter state
    // return out filter functions to use in UI
    // filter data

    const filter = (data: any) => {
        return data;
    };

    const changeFilterState = () => {
        // change state for filter
    };

    return {
        filteredData: filter(data),
        filters: [{ name: 'merchant', onClick: changeFilterState }],
    };
};
