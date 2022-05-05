import { createContext, useContext } from 'react';

export const SearchHighlightContext = createContext('');

export const SearchHighlightProvider = SearchHighlightContext.Provider;

export const useSearchHighlightContext = () =>
    useContext(SearchHighlightContext);
