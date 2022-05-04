import { FC, useMemo, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import AnimateOnMount from 'component/common/AnimateOnMount/AnimateOnMount';
import { TableSearchField } from './TableSearchField/TableSearchField';
import { useStyles } from './TableActions.styles';
import { debounce } from 'debounce';

interface ITableActionsProps {
    search?: string;
    onSearch?: (value: string) => void;
    searchTip?: string;
    isSeparated?: boolean;
}

export const TableActions: FC<ITableActionsProps> = ({
    search,
    onSearch,
    searchTip = 'Search',
    children,
    isSeparated,
}) => {
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchInputState, setSearchInputState] = useState(search);
    const [animating, setAnimating] = useState(false);
    const debauncedOnSearch = useMemo(
        () => (onSearch ? debounce(onSearch, 50) : () => {}),
        [onSearch]
    );

    const { classes: styles } = useStyles();

    const onBlur = (clear = false) => {
        if (!search || clear) {
            setSearchExpanded(false);
        }
    };

    const onSearchChange = (value: string) => {
        debauncedOnSearch(value);
        setSearchInputState(value);
    };

    return (
        <div className={styles.tableActions}>
            <ConditionallyRender
                condition={Boolean(onSearch)}
                show={
                    <>
                        <AnimateOnMount
                            mounted={searchExpanded}
                            start={styles.fieldWidth}
                            enter={styles.fieldWidthEnter}
                            leave={styles.fieldWidthLeave}
                            onStart={() => setAnimating(true)}
                            onEnd={() => setAnimating(false)}
                        >
                            <TableSearchField
                                value={searchInputState!}
                                onChange={onSearchChange}
                                placeholder={`${searchTip}...`}
                                onBlur={onBlur}
                            />
                        </AnimateOnMount>
                        <ConditionallyRender
                            condition={!searchExpanded && !animating}
                            show={
                                <Tooltip title={searchTip} arrow>
                                    <IconButton
                                        aria-label={searchTip}
                                        onClick={() => setSearchExpanded(true)}
                                        size="large"
                                    >
                                        <Search />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                    </>
                }
            />
            <ConditionallyRender
                condition={Boolean(isSeparated)}
                show={<div className={styles.verticalSeparator} />}
            />
            {children}
        </div>
    );
};
