import { FC, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAsyncDebounce } from 'react-table';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import AnimateOnMount from 'component/common/AnimateOnMount/AnimateOnMount';
import { TableSearchField } from './TableSearchField/TableSearchField';
import { useStyles } from './TableSearch.styles';
import { useKeyboardShortcut } from 'hooks/useKeyboardShortcut';

interface ITableSearchProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const TableSearch: FC<ITableSearchProps> = ({
    initialValue,
    onChange = () => {},
    placeholder: customPlaceholder,
}) => {
    const [searchInputState, setSearchInputState] = useState(initialValue);
    const [isSearchExpanded, setIsSearchExpanded] = useState(
        Boolean(initialValue)
    );
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const debouncedOnSearch = useAsyncDebounce(onChange, 200);
    const hotkey = useKeyboardShortcut(
        { modifiers: ['ctrl'], key: 'k', preventDefault: true },
        () => {
            setIsSearchExpanded(expanded => !expanded);
        }
    );
    useKeyboardShortcut({ modifiers: ['ctrl'], key: 'f' }, () => {
        setIsTooltipOpen(true);
    });
    useKeyboardShortcut({ key: 'Escape' }, () => {
        if (isSearchExpanded) {
            setIsSearchExpanded(false);
        }
    });
    const placeholder = customPlaceholder ?? `Search (${hotkey})`;

    const { classes: styles } = useStyles();

    const onBlur = (clear = false) => {
        if (!searchInputState || clear) {
            setIsSearchExpanded(false);
        }
    };

    const onSearchChange = (value: string) => {
        debouncedOnSearch(value);
        setSearchInputState(value);
    };

    return (
        <>
            <AnimateOnMount
                mounted={isSearchExpanded}
                start={styles.searchField}
                enter={styles.searchFieldEnter}
                leave={styles.searchFieldLeave}
                onStart={() => setIsAnimating(true)}
                onEnd={() => setIsAnimating(false)}
            >
                <TableSearchField
                    value={searchInputState!}
                    onChange={onSearchChange}
                    placeholder={placeholder}
                    onBlur={onBlur}
                />
            </AnimateOnMount>
            <ConditionallyRender
                condition={!isSearchExpanded && !isAnimating}
                show={
                    <Tooltip
                        title={placeholder}
                        arrow
                        open={isTooltipOpen}
                        onOpen={() => {
                            setIsTooltipOpen(true);
                        }}
                        onClose={() => {
                            setIsTooltipOpen(false);
                        }}
                    >
                        <IconButton
                            aria-label={placeholder}
                            onClick={() => setIsSearchExpanded(true)}
                            size="large"
                            className={styles.searchButton}
                        >
                            <Search />
                        </IconButton>
                    </Tooltip>
                }
            />
        </>
    );
};
