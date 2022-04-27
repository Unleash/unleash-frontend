import { FC } from 'react';
import {
    createStyles,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingTop: '20px', // TODO: theme
            paddingBottom: '20px', // TODO: theme
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        title: {
            flex: '1 1 100%',
        },
    })
);

interface ITableToolbarProps {
    title?: string;
}

export const TableToolbar: FC<ITableToolbarProps> = ({ title, children }) => {
    const styles = useToolbarStyles();

    return (
        <Toolbar className={styles.root}>
            <Typography variant="h2" component="h2" className={styles.title}>
                {title}
            </Typography>
            {children}
        </Toolbar>
    );
};
