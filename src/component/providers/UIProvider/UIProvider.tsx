import React, { useState } from 'react';

import UIContext from '../../../contexts/UIContext';

const UIProvider = ({ children }) => {
    const [toastData, setToastData] = useState({
        title: '',
        text: '',
        components: [],
        show: false,
        persist: false,
    });

    const context = React.useMemo(
        () => ({
            setToastData,
            toastData,
        }),
        [toastData]
    );

    return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIProvider;
