import { FC, useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import AnimateOnMount from 'component/common/AnimateOnMount/AnimateOnMount';
import { TableSearchField } from './TableSearchField/TableSearchField';
import { useStyles } from './TableActions.styles';

interface ITableActionsProps {
    search: string;
    onSearch: (value: string) => void;
    searchTip?: string;
}

export const TableActions: FC<ITableActionsProps> = ({
    search,
    onSearch,
    searchTip = 'Search',
    children,
}) => {
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [animating, setAnimating] = useState(false);

    const styles = useStyles();

    const onBlur = (clear = false) => {
        if (!search || clear) {
            setSearchExpanded(false);
        }
    };

    return (
        <div className={styles.tableActions}>
            <AnimateOnMount
                mounted={searchExpanded}
                start={styles.fieldWidth}
                enter={styles.fieldWidthEnter}
                leave={styles.fieldWidthLeave}
                onStart={() => setAnimating(true)}
                onEnd={() => setAnimating(false)}
            >
                <TableSearchField
                    value={search}
                    onChange={onSearch}
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
                        >
                            <Search />
                        </IconButton>
                    </Tooltip>
                }
            />
            <ConditionallyRender
                condition={Boolean(children)}
                show={<div className={styles.verticalSeparator} />}
            />

            {children}
        </div>
    );
};
