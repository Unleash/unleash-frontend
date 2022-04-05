import React, { FC, useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Box,
    Typography,
} from '@material-ui/core';
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
}> = ({
    options,
    // defaultValue,
    // onChange,
    disabled,
    ...rest
}) => {
    const [project, setProject] = useState<string[]>([wildcard]);
    const [isWildcardSelected, selectWildcard] = useState(true);

    return (
        <Box sx={{ mt: -1, mb: 3 }}>
            <Box sx={{ my: 2, ml: 2 }}>
                <FormControlLabel
                    disabled={disabled}
                    control={
                        <Checkbox
                            checked={disabled || isWildcardSelected}
                            onChange={e => {
                                selectWildcard(e.target.checked);
                            }}
                            name="checkedA"
                        />
                    }
                    label={
                        <Box>
                            <Typography>ALL</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Current and future projects
                            </Typography>
                        </Box>
                    }
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
                style={{ width: '100%' }}
                renderOption={(
                    option: IAutocompleteBoxOption,
                    { selected }
                ) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                    </React.Fragment>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Projects"
                        placeholder="Select one or more projects"
                    />
                )}
                value={
                    isWildcardSelected || disabled
                        ? options
                        : options.filter((option: IAutocompleteBoxOption) =>
                              project.includes(option.value)
                          )
                }
                onChange={(_, input) => {
                    setProject(input.map(({ value }) => value));
                }}
            />
        </Box>
    );
};

export default SelectProjectInput;
