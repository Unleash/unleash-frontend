import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import AnimateOnMount from 'component/common/AnimateOnMount/AnimateOnMount';
import { TableSearchField } from 'component/common/Table/TableActions/TableSearchField/TableSearchField';
import { useStyles } from 'component/common/Table/TableActions/TableActions.styles';

interface ITableActionsProps {
    search: string;
    onSearch: (value: string) => void;
}

export const TableActions = ({ search, onSearch }: ITableActionsProps) => {
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [animating, setAnimating] = useState(false);

    const { classes: styles } = useStyles();

    const onBlur = (clear = false) => {
        if (!search || clear) {
            setSearchExpanded(false);
        }
    };

    return (
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
                    value={search}
                    onChange={onSearch}
                    placeholder="Search users..."
                    onBlur={onBlur}
                />
            </AnimateOnMount>
            <ConditionallyRender
                condition={!searchExpanded && !animating}
                show={
                    <Tooltip title="Search users" arrow>
                        <IconButton
                            aria-label="Search users"
                            onClick={() => setSearchExpanded(true)}
                            size="large"
                        >
                            <Search />
                        </IconButton>
                    </Tooltip>
                }
            />
            <div className={styles.verticalSeparator} />
        </>
    );
};
