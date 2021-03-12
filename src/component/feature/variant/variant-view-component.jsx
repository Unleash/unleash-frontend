import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Chip, Icon } from '@material-ui/core';
import { UPDATE_FEATURE } from '../../../permissions';
import { weightTypes } from './enums';

import ConditionallyRender from '../../common/conditionally-render';

import styles from './variant.module.scss';
function VariantViewComponent({ variant, editVariant, removeVariant, hasPermission }) {
    const { FIX } = weightTypes;
    return (
        <tr>
            <td onClick={editVariant}>{variant.name}</td>
            <td>
                <ConditionallyRender condition={variant.payload} show={<Chip label="Payload" />} />
                <ConditionallyRender
                    condition={variant.overrides && variant.overrides.length > 0}
                    show={
                        <Chip
                            style={{
                                backgroundColor: 'rgba(173, 216, 230, 0.2)',
                            }}
                            label="Overrides"
                        />
                    }
                />
            </td>
            <td>{variant.weight / 10.0} %</td>
            <td>{variant.weightType === FIX ? 'Fix' : 'Variable'}</td>
            <ConditionallyRender
                condition={hasPermission(UPDATE_FEATURE)}
                show={
                    <td className={styles.actions}>
                        <IconButton onClick={editVariant}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton onClick={removeVariant}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </td>
                }
                elseShow={<td className={styles.actions} />}
            />
        </tr>
    );
}

VariantViewComponent.propTypes = {
    variant: PropTypes.object,
    removeVariant: PropTypes.func,
    editVariant: PropTypes.func,
    hasPermission: PropTypes.func.isRequired,
};

export default VariantViewComponent;
