import React, { useState } from 'react';
import UIContext, { createEmptyToast, themeMode } from 'contexts/UIContext';
import { IToast } from 'interfaces/toast';
import { getLocalStorageItem } from 'utils/storage';

const resolveMode = (): themeMode => {
    const value = getLocalStorageItem('unleash-theme');
    console.log(value);
    if (value) {
        return value as themeMode;
    }

    const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (osDark) {
        return 'dark';
    }
    return 'light';
};

const UIProvider: React.FC = ({ children }) => {
    const [toastData, setToast] = useState<IToast>(createEmptyToast());
    const [showFeedback, setShowFeedback] = useState(false);
    const [mode, setMode] = useState(resolveMode());

    const context = React.useMemo(
        () => ({
            setToast,
            toastData,
            showFeedback,
            setShowFeedback,
            mode,
            setMode,
        }),
        [toastData, showFeedback, mode]
    );

    return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIProvider;
