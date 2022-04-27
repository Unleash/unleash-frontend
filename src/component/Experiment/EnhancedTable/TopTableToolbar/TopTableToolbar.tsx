import { VFC } from 'react';
import {
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        title: {
            flex: '1 1 100%',
        },
    })
);

interface ITopTableToolbarProps<T> {
    rows: T[];
}

export const TopTableToolbar = <T extends unknown>({
    rows,
}: ITopTableToolbarProps<T>): ReturnType<VFC<ITopTableToolbarProps<T>>> => {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Feature toggles ({rows.length})
            </Typography>
            <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};
