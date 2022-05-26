import { VFC } from 'react';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { useSearchHighlightContext } from '../../SearchHighlightContext/SearchHighlightContext';
import { Box, Typography } from '@mui/material';
import { useStyles } from '../HighlightCell/HighlightCell.styles';

interface IHighlightCellProps {
    value: string;
    subtitle?: string;
}

export const HighlightCell: VFC<IHighlightCellProps> = ({
    value,
    subtitle,
}) => {
    const { searchQuery } = useSearchHighlightContext();
    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <span
                className={classes.title}
                style={{
                    WebkitLineClamp: Boolean(subtitle) ? 1 : 2,
                    lineClamp: Boolean(subtitle) ? 1 : 2,
                }}
                data-loading
            >
                <Highlighter search={searchQuery}>{value}</Highlighter>
            </span>
            {Boolean(subtitle) && (
                <Typography
                    component="span"
                    className={classes.subtitle}
                    data-loading
                >
                    <Highlighter search={searchQuery}>{subtitle}</Highlighter>
                </Typography>
            )}
        </Box>
    );
};
