import { ChangeEvent, useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useCommonStyles } from '../../../common.styles';
import icons from '../icon-names';
import GeneralSelect from '../../common/GeneralSelect/GeneralSelect';
import useApplicationsApi from '../../../hooks/api/actions/useApplicationsApi/useApplicationsApi';
import useToast from '../../../hooks/useToast';
import { IApplication } from '../../../interfaces/application';

interface IApplicationUpdateProps {
    application: IApplication;
}

export const ApplicationUpdate = ({ application }: IApplicationUpdateProps) => {
    const { storeApplicationMetaData } = useApplicationsApi();
    const { appName, icon, url, description } = application;
    const [localUrl, setLocalUrl] = useState(url || '');
    const [localDescription, setLocalDescription] = useState(description || '');
    const { setToastData, setToastApiError } = useToast();
    const commonStyles = useCommonStyles();

    const handleChange = (
        evt: ChangeEvent<{ name?: string | undefined; value: unknown }>,
        field: string,
        value: string
    ) => {
        evt.preventDefault();
        try {
            storeApplicationMetaData(appName, field, value);
            setToastData({
                type: 'success',
                title: 'Updated Successfully',
                text: `${field} successfully updated`,
            });
        } catch (e: any) {
            setToastApiError(e.toString());
        }
    };

    return (
        <Grid container style={{ marginTop: '1rem' }}>
            <Grid item sm={12} xs={12} className={commonStyles.contentSpacingY}>
                <Grid item>
                    <GeneralSelect
                        name="iconSelect"
                        id="selectIcon"
                        label="Icon"
                        options={icons.map(v => ({ key: v, label: v }))}
                        value={icon || 'apps'}
                        onChange={e =>
                            handleChange(e, 'icon', e.target.value as string)
                        }
                    />
                </Grid>
                <Grid item>
                    <TextField
                        value={localUrl}
                        onChange={e => setLocalUrl(e.target.value)}
                        label="Application URL"
                        placeholder="https://example.com"
                        type="url"
                        variant="outlined"
                        size="small"
                        onBlur={e => handleChange(e, 'url', localUrl)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        value={localDescription}
                        label="Description"
                        variant="outlined"
                        size="small"
                        rows={2}
                        onChange={e => setLocalDescription(e.target.value)}
                        onBlur={e =>
                            handleChange(e, 'description', localDescription)
                        }
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};
