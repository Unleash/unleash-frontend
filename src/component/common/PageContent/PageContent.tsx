import React, { FC, ReactNode, useRef } from 'react';
import classnames from 'classnames';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { Paper, PaperProps } from '@mui/material';
import { useStyles } from './PageContent.styles';
import useLoading from 'hooks/useLoading';
import { ConditionallyRender } from '../ConditionallyRender/ConditionallyRender';
import { useAsyncDebounce } from 'react-table';

interface IPageContentProps extends PaperProps {
    header?: ReactNode;
    isLoading?: boolean;
    /**
     * @deprecated fix feature event log and remove
     */
    disablePadding?: boolean;
    /**
     * @deprecated fix feature event log and remove
     */
    disableBorder?: boolean;
    bodyClass?: string;
    onScrollHandler?: (ref: HTMLDivElement | null) => void;
}

export const PageContent: FC<IPageContentProps> = ({
    children,
    header,
    disablePadding = false,
    disableBorder = false,
    bodyClass = '',
    isLoading = false,
    className,
    onScrollHandler,
    ...rest
}) => {
    const { classes: styles } = useStyles();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const ref = useLoading(isLoading);

    const headerClasses = classnames(styles.headerContainer, {
        [styles.paddingDisabled]: disablePadding,
        [styles.borderDisabled]: disableBorder,
    });

    const bodyClasses = classnames(
        bodyClass ? bodyClass : styles.bodyContainer,
        {
            [styles.paddingDisabled]: disablePadding,
            [styles.borderDisabled]: disableBorder,
        }
    );

    const paperProps = disableBorder ? { elevation: 0 } : {};

    const onScroll = () => {
        if (onScrollHandler) {
            onScrollHandler(scrollRef.current);
        }
    };

    const debouncedScroll = useAsyncDebounce(onScroll, 50);

    return (
        <div ref={ref}>
            <Paper
                {...rest}
                {...paperProps}
                className={classnames(styles.container, className)}
            >
                <ConditionallyRender
                    condition={Boolean(header)}
                    show={
                        <div className={headerClasses}>
                            <ConditionallyRender
                                condition={typeof header === 'string'}
                                show={<PageHeader title={header as string} />}
                                elseShow={header}
                            />
                        </div>
                    }
                />
                <div
                    onScroll={debouncedScroll}
                    ref={scrollRef}
                    className={bodyClasses}
                >
                    {children}
                </div>
            </Paper>
        </div>
    );
};
