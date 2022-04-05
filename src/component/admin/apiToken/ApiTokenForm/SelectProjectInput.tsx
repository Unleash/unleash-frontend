import React, { FC } from 'react';
import { KeyboardArrowDownOutlined } from '@material-ui/icons';
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    FormControlLabel,
} from '@material-ui/core';
import {
    ISelectMenuProps,
    ISelectOption,
} from 'component/common/GeneralSelect/GeneralSelect';

const wildcard = '*';

const SelectProjectInput: FC<ISelectMenuProps> = ({
    classes,
    fullWidth,
    options,
    defaultValue,
    onChange,
    ...rest
}) => {
    const [project, setProject] = React.useState<string[]>([wildcard]);
    const isWildcardSelected = project.includes(wildcard);

    const handleChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: any;
        }>
    ) => {
        const {
            target: { value },
        } = event;

        setProject(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <>
            {(!isWildcardSelected || true) && (
                <FormControl
                    variant="outlined"
                    size="small"
                    classes={classes}
                    fullWidth={fullWidth}
                    disabled={isWildcardSelected}
                >
                    <InputLabel htmlFor="projects">
                        Selected projects
                    </InputLabel>
                    <Select
                        name="projects"
                        onChange={handleChange}
                        label="Selected projects"
                        id="projects"
                        multiple
                        value={isWildcardSelected ? [] : project}
                        IconComponent={KeyboardArrowDownOutlined}
                        renderValue={selected =>
                            options // start with original options, because 'selected' doesn't preserve order
                                .filter(({ key }) =>
                                    (selected as string[]).includes(key)
                                )
                                .map(
                                    (value: ISelectOption) =>
                                        value?.label ||
                                        value?.title ||
                                        value?.key
                                )
                                .join(', ')
                        }
                        {...rest}
                    >
                        {options.map(option => (
                            <MenuItem
                                key={option.key}
                                value={option.key}
                                title={option.title || ''}
                                disabled={option.disabled}
                            >
                                <Checkbox
                                    checked={project.indexOf(option.key) > -1}
                                />
                                <ListItemText primary={option.title} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isWildcardSelected}
                        onChange={e => {
                            setProject(e.target.checked ? [wildcard] : []);
                        }}
                        name="checkedA"
                    />
                }
                label="Allow all current and future projects"
            />
        </>
    );
};

export default SelectProjectInput;
