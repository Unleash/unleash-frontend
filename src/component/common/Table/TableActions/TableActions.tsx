import { IconButton, Tooltip } from '@material-ui/core';
import { Search, FilterList } from '@material-ui/icons';
import { useStyles } from 'component/common/Table/TableActions/TableActions.styles';

export const TableActions = () => {
    const styles = useStyles();

    return (
        <>
            <Tooltip title="Search users" arrow>
                <IconButton aria-label="Search users" onClick={() => {}}>
                    <Search />
                </IconButton>
            </Tooltip>
            <Tooltip title="Filter users" arrow>
                <IconButton aria-label="Filter users" onClick={() => {}}>
                    <FilterList />
                </IconButton>
            </Tooltip>
            <div className={styles.verticalSeparator}></div>
        </>
    );
};
