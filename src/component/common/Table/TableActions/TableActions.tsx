import { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Search, FilterList } from '@material-ui/icons';
import ConditionallyRender from 'component/common/ConditionallyRender';
import AnimateOnMount from 'component/common/AnimateOnMount/AnimateOnMount';
import { TableSearchField } from 'component/common/Table/TableActions/TableSearchField/TableSearchField';
import { useStyles } from 'component/common/Table/TableActions/TableActions.styles';

interface ITableActionsProps {
    search: string;
    onSearch: (value: string) => void;
}

export const TableActions = ({ search, onSearch }: ITableActionsProps) => {
    const [searchExpanded, setSearchExpanded] = useState(false);

    const styles = useStyles();

    return (
        <>
            <ConditionallyRender
                condition={searchExpanded}
                show={
                    <AnimateOnMount
                        mounted={searchExpanded}
                        start={styles.fieldWidth}
                        enter={styles.fieldWidthEnter}
                        leave={styles.fieldWidthLeave}
                    >
                        <TableSearchField
                            value={search}
                            onChange={onSearch}
                            placeholder="Search users..."
                        />
                    </AnimateOnMount>
                }
                elseShow={
                    <Tooltip title="Search users" arrow>
                        <IconButton
                            aria-label="Search users"
                            onClick={() => setSearchExpanded(true)}
                        >
                            <Search />
                        </IconButton>
                    </Tooltip>
                }
            />

            <Tooltip title="Filter users" arrow>
                <IconButton aria-label="Filter users" onClick={() => {}}>
                    <FilterList />
                </IconButton>
            </Tooltip>
            <div className={styles.verticalSeparator}></div>
        </>
    );
};
