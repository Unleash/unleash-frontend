import React, { Fragment, useMemo, useState, ChangeEvent } from 'react';
import {
    Link,
    Checkbox,
    FormControlLabel,
    TextField,
    Box,
    Paper,
} from '@material-ui/core';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IAutocompleteBoxOption } from 'component/common/AutocompleteBox/AutocompleteBox';
import { useStyles } from './ApiTokenForm.styles';

const ALL_PROJECTS = '*';

// Fix for shadow under Autocomplete - match with Select input
const CustomPaper = ({ ...props }) => <Paper elevation={8} {...props} />;

export const SelectProjectInput = ({
    options,
    defaultValue = [ALL_PROJECTS],
    onChange,
    disabled,
    error,
    onFocus,
}: {
    disabled?: boolean;
    options: IAutocompleteBoxOption[];
    defaultValue: string[];
    onChange: (value: string[]) => void;
    onFocus?: () => void;
    error?: string;
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
        const toggleSelection = () => {
            setProjects(isAllSelected ? [] : options.map(({ value }) => value));
        };

        return (
            <Box sx={{ ml: 3.5, my: 0.5 }}>
                <Link
                    onClick={toggleSelection}
                    className={styles.selectOptionsLink}
                >
                    {isAllSelected ? 'Deselect all' : 'Select all'}
                </Link>
            </Box>
        );
    }, [projects.length, options, styles.selectOptionsLink]);

    const onAllProjectsChange = (
        e: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        if (checked) {
            selectWildcard(true);
            onChange([ALL_PROJECTS]);
        } else {
            selectWildcard(false);
            onChange(projects.includes(ALL_PROJECTS) ? [] : projects);
        }
    };

    const renderOption = (
        option: IAutocompleteBoxOption,
        { selected }: AutocompleteRenderOptionState
    ) => (
        <>
            <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
                className={styles.selectOptionCheckbox}
            />
            {option.label}
        </>
    );

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            error={!!error}
            helperText={error}
            variant="outlined"
            label="Projects"
            placeholder="Select one or more projects"
            onFocus={onFocus}
        />
    );

    return (
        <Box sx={{ mt: -1, mb: 3 }}>
            <Box sx={{ mt: 1, mb: 0.25, ml: 1.5 }}>
                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={disabled || isWildcardSelected}
                            onChange={onAllProjectsChange}
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
                getOptionLabel={({ label }) => label}
                groupBy={() => 'Select/Deselect all'}
                renderGroup={({ key, children }) => (
                    <Fragment key={key}>
                        {selectAllButton}
                        {children}
                    </Fragment>
                )}
                fullWidth
                PaperComponent={CustomPaper}
                renderOption={renderOption}
                renderInput={renderInput}
                value={
                    isWildcardSelected || disabled
                        ? options
                        : options.filter(option =>
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
