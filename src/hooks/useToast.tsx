import { useContext } from 'react';
import UIContext, { IToastData } from '../contexts/UIContext';

interface IToastOptions {
    title: string;
    text?: string;
    type: string;
    persist?: boolean;
    confetti?: boolean;
    autoHideDuration?: number;
    show?: boolean;
}

const useToast = () => {
    // @ts-expect-error
    const { setToast } = useContext(UIContext);

    const hideToast = () =>
        setToast((prev: IToastData) => ({
            ...prev,
            show: false,
        }));

    const setToastApiError = (errorText: string, overrides?: IToastOptions) => {
        setToast({
            title: 'Something went wrong',
            text: `We had trouble talking to our API. Here's why: ${errorText}`,
            type: 'error',
            show: true,
            autoHideDuration: 12000,
            ...overrides,
        });
    };

    const setToastData = (options: IToastOptions) => {
        if (options.persist) {
            setToast({ ...options, show: true });
        } else {
            setToast({ ...options, show: true, autoHideDuration: 6000 });
        }
    };

    return { setToastData, setToastApiError, hideToast };
};

export default useToast;
