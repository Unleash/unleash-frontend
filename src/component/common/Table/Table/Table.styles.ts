import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<{
    rowHeight: 'flex' | 'standard' | 'dense' | 'compact' | number;
}>()((theme, { rowHeight }) => ({
    table: {
        '& tbody tr': {
            height:
                rowHeight === 'flex'
                    ? 'auto'
                    : rowHeight === 'dense'
                    ? theme.shape.tableRowHeightDense
                    : rowHeight === 'standard'
                    ? theme.shape.tableRowHeight
                    : rowHeight === 'compact'
                    ? theme.shape.tableRowHeightCompact
                    : rowHeight,
        },
    },
}));
