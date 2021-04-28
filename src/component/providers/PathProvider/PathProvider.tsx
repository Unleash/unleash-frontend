import { FC } from 'react';

import PathContext from '../../../contexts/PathContext';

// TODO: Type up redux store
interface IPathProvider {
    store: any;
}

const PathProvider: FC<IPathProvider> = ({ store, children }) => {
    const basePath = store.getState().uiConfig.get('baseUriPath') || '';

    const formatPath = (path: string): string => {
        return basePath;
    };

    const context = { formatPath };

    return (
        <PathContext.Provider value={context}>{children}</PathContext.Provider>
    );
};

export default PathProvider;
