import React, { VFC } from 'react';
import useProjects from '../../../../hooks/api/getters/useProjects/useProjects';
import { styles as themeStyles } from 'component/common';
import { Autocomplete, Checkbox, FormControlLabel, Grid, Paper, TextField } from '@mui/material';
import { useEnvironments } from '../../../../hooks/api/getters/useEnvironments/useEnvironments';
import { AutocompleteRenderInputParams, AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import { IAutocompleteBoxOption } from '../../../common/AutocompleteBox/AutocompleteBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useThemeStyles } from '../../../../themes/themeStyles';
import { useStyles } from '../../../admin/apiToken/ApiTokenForm/ApiTokenForm.styles';
interface IAddonEnvironmentProps {
    options: IAutocompleteBoxOption[];
    selectedEnvironments: string[],
    onChange: (value: string[]) => void;
    error?: string;
    onFocus?: () => void;
}
// Fix for shadow under Autocomplete - match with Select input
const CustomPaper = ({ ...props }) => <Paper elevation={8} {...props} />;

export const AddonEnvironments: VFC<IAddonEnvironmentProps> = ({
                                  options,
                                  selectedEnvironments,
                                  error,
                                  onFocus,
                                  onChange
                              }) => {
    const { environments: availableEnvironments } = useEnvironments();
    const { classes: styles } = useStyles();
    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            label="Environments"
            placeholder="Select one or more environments"
            onFocus={onFocus}
            data-testid="select-environment-input"
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
            <h4>Environments</h4>
            <span className={themeStyles.error}>{error}</span>
            <Autocomplete multiple
                          limitTags={2}
                          renderInput={renderInput}
                          options={options}
                          disableCloseOnSelect
                          getOptionLabel={({ label }) => label}
                          fullWidth
                          PaperComponent={CustomPaper}
                          renderOption={renderOption}
                          value={options.filter(option => selectedEnvironments.includes(option.value))}
                          onChange={(_, input) => {
                              const state = input.map(({ value }) => value);
                              onChange(state);
                          }}
                          />
        </React.Fragment>
    )
}
