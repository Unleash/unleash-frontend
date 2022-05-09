import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { Paper, PaperProps } from '@mui/material';
import { useStyles } from './styles';

interface IPageContentProps extends PaperProps {
    headerContent?: ReactNode;
    disablePadding?: boolean;
    disableBorder?: boolean;
    bodyClass?: string;
}

export const PageContent: FC<IPageContentProps> = ({
    children,
    headerContent,
    disablePadding = false,
    disableBorder = false,
    bodyClass = '',
    ...rest
}) => {
    const { classes: styles } = useStyles();

    const headerClasses = classnames(styles.headerContainer, {
        [styles.paddingDisabled]: disablePadding,
        [styles.borderDisabled]: disableBorder,
    });

    const bodyClasses = classnames(styles.bodyContainer, {
        [styles.paddingDisabled]: disablePadding,
        [styles.borderDisabled]: disableBorder,
        [bodyClass]: bodyClass,
    });

    let header = null;
    if (headerContent) {
        if (typeof headerContent === 'string') {
            header = (
                <div className={headerClasses}>
                    <PageHeader title={headerContent} />
                </div>
            );
        } else {
            header = <div className={headerClasses}>{headerContent}</div>;
        }
    }

    const paperProps = disableBorder ? { elevation: 0 } : {};

    return (
        <Paper
            {...rest}
            {...paperProps}
            style={{ borderRadius: '10px', boxShadow: 'none' }}
        >
            {header}
            <div className={bodyClasses}>{children}</div>
        </Paper>
    );
};
