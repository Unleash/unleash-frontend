import { ReactNode, FC } from 'react';
import classnames from 'classnames';

import { Typography, TypographyProps } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

import { useStyles } from './PageHeader.styles';
import { usePageTitle } from 'hooks/usePageTitle';

interface IPageHeaderProps {
    title: string;
    titleElement?: ReactNode;
    subtitle?: string;
    variant?: TypographyProps['variant'];
    loading?: boolean;
    actions?: ReactNode;
    className?: string;
}

export const PageHeader: FC<IPageHeaderProps> = ({
    title,
    titleElement,
    actions,
    subtitle,
    variant,
    loading,
    className = '',
    children,
}) => {
    const { classes: styles } = useStyles();
    const headerClasses = classnames({ skeleton: loading });

    usePageTitle(title);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.topContainer}>
                <div className={headerClasses} data-loading>
                    <Typography
                        variant={variant || 'h1'}
                        className={classnames(styles.headerTitle, className)}
                    >
                        {titleElement || title}
                    </Typography>
                    {subtitle && <small>{subtitle}</small>}
                </div>
                <ConditionallyRender
                    condition={Boolean(actions)}
                    show={<div className={styles.headerActions}>{actions}</div>}
                />
            </div>
            {children}
        </div>
    );
};
