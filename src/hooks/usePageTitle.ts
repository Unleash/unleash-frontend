import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = DEFAULT_PAGE_TITLE;
        };
    }, [title]);
};

const DEFAULT_PAGE_TITLE = 'Unleash';
