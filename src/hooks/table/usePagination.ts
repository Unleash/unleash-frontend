import { useMemo, useState } from 'react';

export const usePagination = <T extends Record<string, any>>(
    data: T[],
    pageSize?: number
) => {
    const [pageIndex, setPageIndex] = useState(0);

    const pageCount = useMemo(
        () => (pageSize ? Math.ceil(data.length / (pageSize || 1)) : 1),
        [data.length, pageSize]
    );

    const paginatedData = data.slice(
        pageSize ? pageIndex * pageSize : 0,
        pageSize ? (pageIndex + 1) * pageSize : data.length
    );

    return {
        data: paginatedData,
        pageCount,
        pageIndex,
        onPageChange: setPageIndex,
    };
};
