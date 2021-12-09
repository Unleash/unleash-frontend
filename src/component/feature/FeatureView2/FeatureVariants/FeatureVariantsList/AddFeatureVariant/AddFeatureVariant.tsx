import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    FormControlLabel,
    Grid,
    TextField,
    InputAdornment,
    Button,
    Tooltip,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';

import { weightTypes } from '../../../../variant/enums';

import OverrideConfig from './OverrideConfig/OverrideConfig';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import GeneralSelect from '../../../../../common/GeneralSelect/GeneralSelect';
import { useCommonStyles } from '../../../../../../common.styles';
import Dialogue from '../../../../../common/Dialogue';
import { trim, modalStyles } from '../../../../../common/util';
import PermissionSwitch from '../../../../../common/PermissionSwitch/PermissionSwitch';
import { UPDATE_FEATURE } from '../../../../../providers/AccessProvider/permissions';
import useFeature from '../../../../../../hooks/api/getters/useFeature/useFeature';
import { useParams } from 'react-router-dom';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import { IFeatureVariant } from '../../../../../../interfaces/featureToggle';
import cloneDeep from 'lodash.clonedeep';

const payloadOptions = [
    { key: 'string', label: 'string' },
    { key: 'json', label: 'json' },
    { key: 'csv', label: 'csv' },
];

const EMPTY_PAYLOAD = { type: 'string', value: '' };

const AddVariant = ({
    showDialog,
    closeDialog,
    save,
    editVariant,
    validateName,
    validateWeight,
    title,
    editing,
}) => {
    const [data, setData] = useState({});
    const [payload, setPayload] = useState(EMPTY_PAYLOAD);
    const [overrides, setOverrides] = useState([]);
    const [error, setError] = useState({});
    const commonStyles = useCommonStyles();
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { feature } = useFeature(projectId, featureId);
    const [variants, setVariants] = useState<IFeatureVariant[]>([]);

    const clear = () => {
        if (editVariant) {
            setData({
                name: editVariant.name,
                weight: editVariant.weight / 10,
                weightType: editVariant.weightType || weightTypes.VARIABLE,
                stickiness: editVariant.stickiness,
            });
            if (editVariant.payload) {
                setPayload(editVariant.payload);
            } else {
                setPayload(EMPTY_PAYLOAD);
            }
            if (editVariant.overrides) {
                setOverrides(editVariant.overrides);
            } else {
                setOverrides([]);
            }
        } else {
            setData({});
            setPayload(EMPTY_PAYLOAD);
            setOverrides([]);
        }
        setError({});
    };

    const setClonedVariants = clonedVariants =>
        setVariants(cloneDeep(clonedVariants));

    useEffect(() => {
        if (feature) {
            setClonedVariants(feature.variants);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [feature.variants]);

    useEffect(() => {
        clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editVariant]);

    const setVariantValue = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: trim(value),
        });
    };

    const setVariantWeightType = e => {
        const { checked, name } = e.target;
        const weightType = checked ? weightTypes.FIX : weightTypes.VARIABLE;
        setData({
            ...data,
            [name]: weightType,
        });
    };

    const submit = async e => {
        setError({});
        e.preventDefault();

        const nameValidation = validateName(data.name);
        if (nameValidation) {
            setError(nameValidation);
            return;
        }
        const weightValidation = validateWeight(data.weight);
        if (weightValidation) {
            setError(weightValidation);
            return;
        }
        if (payload.type === 'json' && !isJSON(payload.value)) {
            setError({ payload: 'The payload is not a valid JSON format' });
            return;
        }

        try {
            const variant = {
                name: data.name,
                weight: data.weight * 10,
                weightType: data.weightType,
                stickiness: data.stickiness,
                payload: payload.value ? payload : undefined,
                overrides: overrides
                    .map(o => ({
                        contextName: o.contextName,
                        values: o.values,
                    }))
                    .filter(o => o.values && o.values.length > 0),
            };
            await save(variant);
            clear();
            closeDialog();
        } catch (error) {
            if (error?.body?.details[0]?.message?.includes('duplicate value')) {
                setError({ name: 'A variant with that name already exists.' });
            } else if (
                error?.body?.details[0]?.message?.includes('must be a number')
            ) {
                setError({ weight: 'Weight must be a number' });
            } else {
                const msg =
                    error?.body?.details[0]?.message || 'Could not add variant';
                setError({ general: msg });
            }
        }
    };

    const onPayload = e => {
        e.preventDefault();
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };

    const onCancel = e => {
        e.preventDefault();
        clear();
        closeDialog();
    };

    const updateOverrideType = index => e => {
        e.preventDefault();
        setOverrides(
            overrides.map((o, i) => {
                if (i === index) {
                    o[e.target.name] = e.target.value;
                }

                return o;
            })
        );
    };

    const updateOverrideValues = (index, values) => {
        setOverrides(
            overrides.map((o, i) => {
                if (i === index) {
                    o.values = values;
                }
                return o;
            })
        );
    };

    const removeOverride = index => e => {
        e.preventDefault();
        setOverrides(overrides.filter((o, i) => i !== index));
    };

    const onAddOverride = e => {
        e.preventDefault();
        setOverrides([
            ...overrides,
            ...[{ contextName: 'userId', values: [] }],
        ]);
    };

    const isJSON = jsonString => {
        try {
            let parsedString = JSON.parse(jsonString);
            if (parsedString && typeof parsedString === 'object') {
                return true;
            }
        } catch (e) {}

        return false;
    };

    const isFixWeight = data.weightType === weightTypes.FIX;

    const formId = 'add-feature-variant-form';

    return (
        <Dialogue
            open={showDialog}
            contentLabel="Add variant modal"
            style={modalStyles}
            onClose={onCancel}
            onClick={submit}
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
            title={title}
            fullWidth
            maxWidth="md"
            formId={formId}
        >
            <form
                id={formId}
                onSubmit={submit}
                className={commonStyles.contentSpacingY}
            >
                <p style={{ color: 'red' }}>{error.general}</p>
                <TextField
                    label="Variant name"
                    autoFocus
                    name="name"
                    placeholder=""
                    className={commonStyles.fullWidth}
                    style={{ maxWidth: '350px' }}
                    helperText={error.name}
                    value={data.name || ''}
                    error={Boolean(error.name)}
                    variant="outlined"
                    required
                    size="small"
                    type="name"
                    disabled={editing}
                    onChange={setVariantValue}
                    data-test={'VARIANT_NAME_INPUT'}
                />
                <br />
                <Grid container>
                    {/* If we're editing, we need to have at least 2 existing variants, since we require at least 1 variable. If adding, we could be adding nr 2, and as such should be allowed to set weightType to variable */}
                    <ConditionallyRender
                        condition={(editing && variants.length > 1) || (!editing && variants.length > 0)}
                        show={
                            <Grid
                                item
                                md={12}
                                style={{ marginBottom: '0.5rem' }}
                            >
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <PermissionSwitch
                                                permission={UPDATE_FEATURE}
                                                name="weightType"
                                                checked={isFixWeight}
                                                data-test={
                                                    'VARIANT_WEIGHT_TYPE'
                                                }
                                                onChange={setVariantWeightType}
                                            />
                                        }
                                        label="Custom percentage"
                                    />
                                </FormControl>
                            </Grid>
                        }
                    />

                    <ConditionallyRender
                        condition={data.weightType === weightTypes.FIX}
                        show={
                            <Grid item md={4}>
                                <TextField
                                    id="weight"
                                    label="Weight"
                                    name="weight"
                                    variant="outlined"
                                    size="small"
                                    placeholder=""
                                    data-test={'VARIANT_WEIGHT_INPUT'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                %
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{ marginRight: '0.8rem' }}
                                    value={data.weight}
                                    error={Boolean(error.weight)}
                                    helperText={error.weight}
                                    type="number"
                                    disabled={!isFixWeight}
                                    onChange={e => {
                                        setVariantValue(e);
                                    }}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </Grid>
                        }
                    />
                </Grid>
                <p style={{ marginBottom: '1rem' }}>
                    <strong>Payload </strong>
                    <Tooltip
                        title="Passed to the variant object. Can be anything
                        (json, value, csv)"
                    >
                        <Info
                            style={{
                                width: '18.5px',
                                height: '18.5px',
                                color: 'grey',
                            }}
                        />
                    </Tooltip>
                </p>
                <Grid container>
                    <Grid item md={2} sm={2} xs={4}>
                        <GeneralSelect
                            name="type"
                            label="Type"
                            className={commonStyles.fullWidth}
                            value={payload.type}
                            options={payloadOptions}
                            onChange={onPayload}
                            style={{ minWidth: '100px', width: '100%' }}
                            data-test={'VARIANT_PAYLOAD_TYPE'}
                        />
                    </Grid>
                    <Grid item md={8} sm={8} xs={6}>
                        <TextField
                            rows={payload.type === 'json' ? 10 : 1}
                            label="Value"
                            name="value"
                            error={Boolean(error.payload)}
                            helperText={error.payload}
                            className={commonStyles.fullWidth}
                            value={payload.value}
                            onChange={onPayload}
                            variant="outlined"
                            size="small"
                            multiline
                            data-test={'VARIANT_PAYLOAD_VALUE'}
                        />
                    </Grid>
                </Grid>
                <ConditionallyRender
                    condition={overrides.length > 0}
                    show={
                        <p style={{ marginBottom: '1rem' }}>
                            <strong>Overrides </strong>
                            <Tooltip title="Here you can specify which users should get this variant.">
                                <Info
                                    style={{
                                        width: '18.5px',
                                        height: '18.5px',
                                        color: 'grey',
                                    }}
                                />
                            </Tooltip>
                        </p>
                    }
                />
                <OverrideConfig
                    overrides={overrides}
                    removeOverride={removeOverride}
                    updateOverrideType={updateOverrideType}
                    updateOverrideValues={updateOverrideValues}
                    updateValues={updateOverrideValues}
                />
                <Button
                    onClick={onAddOverride}
                    variant="contained"
                    color="primary"
                >
                    Add override
                </Button>{' '}
            </form>
        </Dialogue>
    );
};

AddVariant.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    validateName: PropTypes.func.isRequired,
    validateWeight: PropTypes.func.isRequired,
    editVariant: PropTypes.object,
    title: PropTypes.string,
    uiConfig: PropTypes.object,
};

export default AddVariant;
