import { Fragment, useState, ChangeEvent, VFC } from 'react';
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Box,
    Paper,
    capitalize,
    styled,
} from '@mui/material';
import { Autocomplete } from '@mui/material';

import {
    AutocompleteRenderGroupParams,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IAutocompleteBoxOption } from 'component/common/AutocompleteBox/AutocompleteBox';
import { SelectAllButton } from './SelectAllButton/SelectAllButton';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    marginRight: theme.spacing(0.5),
}));

const ALL = '*';

// Fix for shadow under Autocomplete - match with Select input
const CustomPaper = ({ ...props }) => <Paper elevation={8} {...props} />;

export interface ISelectAllAutocompleteProps {
    disabled?: boolean;
    options: IAutocompleteBoxOption[];
    defaultValue: string[];
    onChange: (value: string[]) => void;
    onFocus?: () => void;
    label?: string;
    error?: string;
}

export const SelectAllAutocomplete: VFC<ISelectAllAutocompleteProps> = ({
    options,
    defaultValue = [ALL],
    onChange,
    disabled,
    label = 'options',
    error,
    onFocus,
}) => {
    const [values, setValues] = useState<string[]>(
        typeof defaultValue === 'string' ? [defaultValue] : defaultValue
    );
    const [isWildcardSelected, selectWildcard] = useState(
        typeof defaultValue === 'string' || defaultValue.includes(ALL)
    );
    const isAllSelected =
        values.length > 0 &&
        values.length === options.filter(option => !option.disabled).length &&
        values[0] !== ALL;

    const onAllValuesChange = (
        e: ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        if (checked) {
            selectWildcard(true);
            onChange([ALL]);
        } else {
            selectWildcard(false);
            onChange(values.includes(ALL) ? [] : values);
        }
    };

    const onSelectAllClick = () => {
        const newValues = isAllSelected
            ? []
            : options
                  .filter(option => !option.disabled)
                  .map(({ value }) => value);
        setValues(newValues);
        onChange(newValues);
    };

    const renderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: IAutocompleteBoxOption,
        { selected }: AutocompleteRenderOptionState
    ) => (
        <li
            {...props}
            onClick={e =>
                option.disabled ? e.preventDefault() : props.onClick?.(e)
            }
        >
            <StyledCheckbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={selected}
                disabled={option.disabled}
            />
            {option.label}
        </li>
    );

    const renderGroup = ({ key, children }: AutocompleteRenderGroupParams) => (
        <Fragment key={key}>
            <ConditionallyRender
                condition={options.length > 2}
                show={
                    <SelectAllButton
                        isAllSelected={isAllSelected}
                        onClick={onSelectAllClick}
                    />
                }
            />
            {children}
        </Fragment>
    );

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            label={capitalize(label)}
            placeholder={`Select one or more ${label}`}
            onFocus={onFocus}
            data-testid="select-input"
        />
    );

    return (
        <Box sx={{ mt: -1, mb: 3 }}>
            <Box sx={{ mt: 1, mb: 0.25, ml: 1.5 }}>
                <FormControlLabel
                    disabled={disabled}
                    data-testid={`select-all-${label}`}
                    control={
                        <Checkbox
                            checked={disabled || isWildcardSelected}
                            onChange={onAllValuesChange}
                        />
                    }
                    label={`ALL current and future ${label}`}
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
                renderGroup={renderGroup}
                fullWidth
                PaperComponent={CustomPaper}
                renderOption={renderOption}
                renderInput={renderInput}
                value={
                    isWildcardSelected || disabled
                        ? options.filter(option => !option.disabled)
                        : options.filter(option =>
                              values.includes(option.value)
                          )
                }
                onChange={(_, input) => {
                    const state = input.map(({ value }) => value);
                    setValues(state);
                    onChange(state);
                }}
            />
        </Box>
    );
};
