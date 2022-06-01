import { IconButton, InputBase, Tooltip } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import classnames from 'classnames';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { useStyles } from './TableSearchField.styles';
import { TableSearchFieldSuggestions } from './TableSearchFieldSuggestions/TableSearchFieldSuggestions';
import { useState } from 'react';

interface ITableSearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder: string;
}

export const TableSearchField = ({
    value = '',
    onChange,
    className,
    placeholder,
}: ITableSearchFieldProps) => {
    const { classes: styles } = useStyles();
    const [showSuggestions, setShowSuggestions] = useState(false);

    return (
        <div className={styles.container}>
            <div
                className={classnames(
                    styles.search,
                    className,
                    'search-container'
                )}
            >
                <Search
                    className={classnames(styles.searchIcon, 'search-icon')}
                />
                <InputBase
                    placeholder={placeholder}
                    classes={{
                        root: classnames(styles.inputRoot, 'input-container'),
                    }}
                    inputProps={{ 'aria-label': placeholder }}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setShowSuggestions(false)}
                />
                <div
                    className={classnames(
                        styles.clearContainer,
                        'clear-container'
                    )}
                >
                    <ConditionallyRender
                        condition={Boolean(value)}
                        show={
                            <Tooltip title="Clear search query" arrow>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        onChange('');
                                    }}
                                >
                                    <Close className={styles.clearIcon} />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                </div>
            </div>
            <ConditionallyRender
                condition={showSuggestions && !Boolean(value)}
                show={<TableSearchFieldSuggestions />}
            />
        </div>
    );
};
