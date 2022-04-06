import React, { Fragment, FC, useMemo, useState } from 'react';
import {
    Link,
    Checkbox,
    FormControlLabel,
    TextField,
    Box,
    Paper,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IAutocompleteBoxOption } from 'component/common/AutocompleteBox/AutocompleteBox';
import { useStyles } from './ApiTokenForm.styles';

const ALL_PROJECTS = '*';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Fix for shadow under Autocomplete - match with Select input
const CustomPaper: FC = ({ ...props }) => <Paper elevation={8} {...props} />;

const SelectProjectInput: FC<{
    disabled?: boolean;
    options: IAutocompleteBoxOption[];
    defaultValue: string[];
    onChange: (value: string[]) => void;
    onFocus?: () => void;
    error?: string;
}> = ({
    options,
    defaultValue = [ALL_PROJECTS],
    onChange,
    disabled,
    error,
    onFocus,
}) => {
    const styles = useStyles();
    const [projects, setProjects] = useState<string[]>(
        typeof defaultValue === 'string' ? [defaultValue] : defaultValue
    );
    const [isWildcardSelected, selectWildcard] = useState(
        typeof defaultValue === 'string' || defaultValue.includes(ALL_PROJECTS)
    );
    const selectAllButton = useMemo(() => {
        const isAllSelected = projects.length === options.length;
        return (
            <Box sx={{ ml: 3.5, my: 0.5 }}>
                <Link
                    onClick={() => {
                        setProjects(
                            isAllSelected
                                ? []
                                : options.map(({ value }) => value)
                        );
                    }}
                    className={styles.selectOptionsLink}
                >
                    {isAllSelected ? 'Deselect all' : 'Select all'}
                </Link>
            </Box>
        );
    }, [projects.length, options, styles.selectOptionsLink]);

    return (
        <Box sx={{ mt: -1, mb: 3 }}>
            <Box sx={{ mt: 1, mb: 0.25, ml: 1.5 }}>
                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={disabled || isWildcardSelected}
                            onChange={e => {
                                if (e.target.checked) {
                                    selectWildcard(true);
                                    onChange([ALL_PROJECTS]);
                                } else {
                                    selectWildcard(false);
                                    onChange(
                                        projects.includes(ALL_PROJECTS)
                                            ? []
                                            : projects
                                    );
                                }
                            }}
                        />
                    }
                    label="ALL current and future projects"
                />
            </Box>
            <Autocomplete
                disabled={disabled || isWildcardSelected}
                multiple
                limitTags={2}
                options={options}
                disableCloseOnSelect
                getOptionLabel={({ label }: IAutocompleteBoxOption) => label}
                groupBy={() => 'Select/Deselect all'}
                renderGroup={({ key, children }) => (
                    <Fragment key={key}>
                        {selectAllButton}
                        {children}
                    </Fragment>
                )}
                fullWidth
                PaperComponent={CustomPaper}
                renderOption={(
                    option: IAutocompleteBoxOption,
                    { selected }
                ) => (
                    <>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                            className={styles.selectOptionCheckbox}
                        />
                        {option.label}
                    </>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        error={!!error}
                        helperText={error}
                        variant="outlined"
                        label="Projects"
                        placeholder="Select one or more projects"
                        onFocus={onFocus}
                    />
                )}
                value={
                    isWildcardSelected || disabled
                        ? options
                        : options.filter((option: IAutocompleteBoxOption) =>
                              projects.includes(option.value)
                          )
                }
                onChange={(_, input) => {
                    const state = input.map(({ value }) => value);
                    setProjects(state);
                    onChange(state);
                }}
            />
        </Box>
    );
};

export default SelectProjectInput;
