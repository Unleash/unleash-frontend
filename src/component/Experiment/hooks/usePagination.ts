import { useMemo, useState } from 'react';

export const usePagination = <T extends Record<string, any>>(
    data: T[],
    pageSize: number
) => {
    const [pageIndex, setPageIndex] = useState(0);

    const pageCount = useMemo(
        () => Math.ceil(data.length / pageSize),
        [data.length, pageSize]
    );
    const paginatedData = data.slice(
        pageIndex * pageSize,
        (pageIndex + 1) * pageSize
    );

    return {
        data: paginatedData,
        pageCount,
        pageIndex,
        onPageChange: setPageIndex,
    };
};
