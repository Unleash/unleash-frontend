import React, { useState } from 'react';

import UIContext from '../../../contexts/UIContext';

const UIProvider = ({ children }) => {
    const [updatedResource, setUpdatedResource] = useState({
        title: '',
        text: '',
        components: [],
        show: false,
        persist: false,
    });

    const context = React.useMemo(
        () => ({
            setUpdatedResource,
            updatedResource,
        }),
        [updatedResource]
    );

    return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIProvider;
