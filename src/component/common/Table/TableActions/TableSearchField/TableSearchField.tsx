import { IconButton, InputBase, Tooltip } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import ConditionallyRender from 'component/common/ConditionallyRender';
import { useStyles } from 'component/common/Table/TableActions/TableSearchField/TableSearchField.styles';
import classnames from 'classnames';

interface ITableSearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export const TableSearchField = ({
    value,
    onChange,
    className,
    placeholder,
}: ITableSearchFieldProps) => {
    const styles = useStyles();
    const placeholderText = placeholder ?? 'Search...';

    return (
        <div className={styles.container}>
            <div className={classnames(styles.search, className)}>
                <Search className={styles.searchIcon} />
                <InputBase
                    autoFocus
                    placeholder={placeholderText}
                    classes={{ root: styles.inputRoot }}
                    inputProps={{ 'aria-label': placeholderText }}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
                <div className={styles.clearContainer}>
                    <ConditionallyRender
                        condition={Boolean(value)}
                        show={
                            <Tooltip title="Clear search query" arrow>
                                <IconButton
                                    size="small"
                                    aria-label="Clear search query"
                                    onClick={() => onChange('')}
                                >
                                    <Close className={styles.clearIcon} />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </div>
            </div>
        </div>
    );
};
