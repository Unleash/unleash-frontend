import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './FeatureLinkCell.styles';
import { Highlighter } from 'component/common/Highlighter/Highlighter';
import { useSearchHighlightContext } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';

interface IFeatureLinkCellProps {
    title?: string;
    to: string;
    subtitle?: string;
}

export const FeatureLinkCell: FC<IFeatureLinkCellProps> = ({
    title,
    to,
    subtitle,
}) => {
    const { classes: styles } = useStyles();
    const search = useSearchHighlightContext();

    return (
        <Link
            component={RouterLink}
            to={to}
            underline="hover"
            className={styles.wrapper}
        >
            <div className={styles.container}>
                <span
                    data-loading
                    className={styles.title}
                    style={{
                        WebkitLineClamp: Boolean(subtitle) ? 1 : 2,
                        lineClamp: Boolean(subtitle) ? 1 : 2,
                    }}
                >
                    <Highlighter search={search}>{title}</Highlighter>
                </span>
                <ConditionallyRender
                    condition={Boolean(subtitle)}
                    show={
                        <>
                            <Typography
                                className={styles.description}
                                component="span"
                                data-loading
                            >
                                <Highlighter search={search}>
                                    {subtitle}
                                </Highlighter>
                            </Typography>
                        </>
                    }
                />
            </div>
        </Link>
    );
};
