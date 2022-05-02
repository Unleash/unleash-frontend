import { Dispatch, SetStateAction, useMemo } from 'react';
import classnames from 'classnames';
import { useMediaQuery, useTheme } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './PaginationUI.styles';

interface IPaginationProps {
    pageCount: number;
    pageIndex: number;
    onPageChange: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
    pageCount,
    pageIndex,
    onPageChange,
}: IPaginationProps) => {
    const styles = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [start, end] = useMemo(() => {
        const length = isMobile ? 1 : 3;
        if (pageIndex - length < 0) {
            return [0, length * 2 + 1];
        }
        if (pageIndex + length > pageCount - 1) {
            return [pageCount - 1 - length * 2, pageCount];
        }
        return [pageIndex - length, pageIndex + 1 + length];
    }, [isMobile, pageCount, pageIndex]);

    return (
        <ConditionallyRender
            condition={pageCount > 1}
            show={
                <div className={styles.pagination}>
                    <div className={styles.paginationInnerContainer}>
                        <ConditionallyRender
                            condition={pageIndex > 0}
                            show={
                                <>
                                    <button
                                        className={classnames(
                                            styles.idxBtn,
                                            styles.idxBtnLeft
                                        )}
                                        onClick={() => {
                                            onPageChange(prev => prev - 1);
                                        }}
                                    >
                                        <ArrowBackIosIcon
                                            className={styles.idxBtnIcon}
                                        />
                                    </button>
                                    <ConditionallyRender
                                        condition={
                                            pageCount > 2 && pageIndex > 1
                                        }
                                        show={
                                            <button
                                                className={classnames(
                                                    styles.idxBtn,
                                                    styles.doubleArrowBtnLeft
                                                )}
                                                onClick={() => {
                                                    onPageChange(0);
                                                }}
                                            >
                                                <DoubleArrowIcon
                                                    className={classnames(
                                                        styles.arrowIcon,
                                                        styles.arrowIconLeft
                                                    )}
                                                />
                                            </button>
                                        }
                                    />
                                </>
                            }
                        />

                        {Array(pageCount)
                            .fill(0)
                            .map((_, index) => index)
                            .slice(start, end)
                            .map(index => {
                                const isActive = pageIndex === index;
                                return (
                                    <button
                                        key={index}
                                        className={classnames(
                                            styles.paginationButton,
                                            {
                                                [styles.paginationButtonActive]:
                                                    isActive,
                                            }
                                        )}
                                        onClick={() => {
                                            onPageChange(index);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        <ConditionallyRender
                            condition={pageIndex < pageCount - 1}
                            show={
                                <>
                                    <button
                                        onClick={() => {
                                            onPageChange(prev => prev + 1);
                                        }}
                                        className={classnames(
                                            styles.idxBtn,
                                            styles.idxBtnRight
                                        )}
                                    >
                                        <ArrowForwardIosIcon
                                            className={styles.idxBtnIcon}
                                        />
                                    </button>
                                    <ConditionallyRender
                                        condition={
                                            pageCount > 2 &&
                                            pageIndex < pageCount - 2
                                        }
                                        show={
                                            <button
                                                className={classnames(
                                                    styles.idxBtn,
                                                    styles.doubleArrowBtnRight
                                                )}
                                                onClick={() => {
                                                    onPageChange(pageCount - 1);
                                                }}
                                            >
                                                <DoubleArrowIcon
                                                    className={styles.arrowIcon}
                                                />
                                            </button>
                                        }
                                    />
                                </>
                            }
                        />
                    </div>
                </div>
            }
        />
    );
};

export default Pagination;
