import React, { FC, useState } from 'react';
import { Checkbox, FormControlLabel, TextField, Box } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IAutocompleteBoxOption } from 'component/common/AutocompleteBox/AutocompleteBox';

const wildcard = '*';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectProjectInput: FC<{
    disabled?: boolean;
    options: IAutocompleteBoxOption[];
    defaultValue: string[];
    onChange: (value: string[]) => void;
    onFocus?: () => void;
    error?: string;
}> = ({
    options,
    defaultValue = [wildcard],
    onChange,
    disabled,
    error,
    onFocus,
}) => {
    const [projects, setProjects] = useState<string[]>(
        typeof defaultValue === 'string' ? [defaultValue] : defaultValue
    );
    const [isWildcardSelected, selectWildcard] = useState(
        typeof defaultValue === 'string' || defaultValue.includes(wildcard)
    );

    return (
        <Box sx={{ mt: -1, mb: 3 }}>
            <Box sx={{ mt: 2, mb: 1, ml: 2 }}>
                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={disabled || isWildcardSelected}
                            onChange={e => {
                                if (e.target.checked) {
                                    selectWildcard(true);
                                    onChange([wildcard]);
                                } else {
                                    selectWildcard(false);
                                    onChange(
                                        projects.includes(wildcard)
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
                getOptionLabel={(option: IAutocompleteBoxOption) =>
                    option.label
                }
                style={{ width: '100%' }} // FIXME: style
                renderOption={(
                    option: IAutocompleteBoxOption,
                    { selected }
                ) => (
                    <>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
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
