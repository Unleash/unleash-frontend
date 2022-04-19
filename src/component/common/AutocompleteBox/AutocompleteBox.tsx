import { useStyles } from 'component/common/AutocompleteBox/AutocompleteBox.styles';
import { Search, ArrowDropDown } from '@material-ui/icons';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import classNames from 'classnames';

interface IAutocompleteBoxProps {
    label: string;
    options: IAutocompleteBoxOption[];
    value?: IAutocompleteBoxOption[];
    onChange: (value: IAutocompleteBoxOption[]) => void;
    disabled?: boolean;
}

export interface IAutocompleteBoxOption {
    value: string;
    label: string;
}

export const AutocompleteBox = ({
    label,
    options,
    value = [],
    onChange,
    disabled,
}: IAutocompleteBoxProps) => {
    const styles = useStyles();

    const renderInput = (params: AutocompleteRenderInputParams) => {
        return <TextField {...params} variant="outlined" label={label} />;
    };

    return (
        <div className={styles.container}>
            <div
                className={classNames(
                    styles.icon,
                    disabled && styles.iconDisabled
                )}
                aria-hidden
            >
                <Search />
            </div>
            <Autocomplete
                className={styles.autocomplete}
                classes={{ inputRoot: styles.inputRoot }}
                options={options}
                value={value}
                popupIcon={<ArrowDropDown titleAccess="Toggle" />}
                onChange={(event, value) => onChange(value || [])}
                renderInput={renderInput}
                getOptionLabel={value => value.label}
                disabled={disabled}
                multiple
            />
        </div>
    );
};
