import { Autocomplete, Checkbox, Paper, TextField } from '@mui/material';
import React, { VFC } from 'react';
import { IAutocompleteBoxOption } from '../../../common/AutocompleteBox/AutocompleteBox';
import { AutocompleteRenderInputParams, AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useStyles } from '../../../admin/apiToken/ApiTokenForm/ApiTokenForm.styles';
import { styles as themeStyles } from 'component/common';

// Fix for shadow under Autocomplete - match with Select input
const CustomPaper = ({ ...props }) => <Paper elevation={8} {...props} />;


interface IAddonProjectProps {
    options: IAutocompleteBoxOption[];
    selectedProjects: string[],
    onChange: (value: string[]) => void;
    error?: string;
    onFocus?: () => void;
}

export const AddonProjects: VFC<IAddonProjectProps> = ({options, selectedProjects, onChange, error, onFocus}) => {
    const { classes: styles } = useStyles();
    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            label="Projects"
            placeholder="Select projects to filter by"
            onFocus={onFocus}
            data-testid="select-projects-input"
        />
    );

    const renderOption = (
        props: object,
        option: IAutocompleteBoxOption,
        { selected }: AutocompleteRenderOptionState
    ) => (
        <li {...props}>
            <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
                className={styles.selectOptionCheckbox}
            />
            {option.label}
        </li>
    );

    return (
        <React.Fragment>
            <h4>Projects</h4>
            <span className={themeStyles.error}>{error}</span>
        <Autocomplete
            multiple
            limitTags={2}
            options={options}
            disableCloseOnSelect
            getOptionLabel={({ label }) => label}
            fullWidth
            PaperComponent={CustomPaper}
            renderOption={renderOption}
            renderInput={renderInput}
            value={options.filter(option => selectedProjects.includes(option.value))}
            onChange={(_, input) => {
                const state = input.map(({ value }) => value);
                onChange(state);
            }}
        />
        </React.Fragment>
    );
}
