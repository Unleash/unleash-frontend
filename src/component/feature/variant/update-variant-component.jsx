import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from 'react-mdl';
import { FormButtons } from '../../common';
import VariantViewComponent from './variant-view-component';
import VariantEditComponent from './variant-edit-component';
import styles from './variant.scss';

class UpdateVariantComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // TODO unwind this stuff
        if (this.props.initCallRequired === true) {
            this.props.init(this.props.input);
        }
    }

    updateWeight = newWeight => {
        const variants = this.props.input.variants || [];
        variants.forEach((v, i) => {
            v.weight = newWeight;
            this.props.updateVariant(i, v);
        });
    };

    addVariant = (e, variants) => {
        e.preventDefault();
        const size = variants.length + 1;
        const percentage = parseInt(1 / size * 100);
        const variant = {
            name: '',
            weight: percentage,
            edit: true,
        };

        this.updateWeight(percentage);
        this.props.addVariant(variant);
    };

    removeVariant = (e, index) => {
        e.preventDefault();
        const variants = this.props.input.variants;
        const size = variants.length - 1;
        const percentage = parseInt(1 / size * 100);
        this.updateWeight(percentage);
        this.props.removeVariant(index);
    };

    editVariant = (e, index, v) => {
        e.preventDefault();
        v.edit = true;
        this.props.updateVariant(index, v);
    };

    closeVariant = (e, index, v) => {
        e.preventDefault();
        v.edit = false;
        this.props.updateVariant(index, v);
    };

    updateVariant = (index, newVariant) => {
        this.props.updateVariant(index, newVariant);
    };

    renderVariant = (variant, index) =>
        variant.edit ? (
            <VariantEditComponent
                key={index}
                variant={variant}
                removeVariant={e => this.removeVariant(e, index)}
                closeVariant={e => this.closeVariant(e, index, variant)}
                updateVariant={this.updateVariant.bind(this, index)}
            />
        ) : (
            <VariantViewComponent
                key={index}
                variant={variant}
                editVariant={e => this.editVariant(e, index, variant)}
                removeVariant={e => this.removeVariant(e, index)}
            />
        );

    render() {
        const { onSubmit, onCancel, input, features } = this.props;
        const variants = input.variants || [];
        return (
            <form onSubmit={onSubmit(input, features)}>
                <section style={{ padding: '16px' }}>
                    <p>
                        Variants is a new <i>beta feature</i> and the implementation is subject to change at any time
                        until it is made in to a permanent feature. In order to use variants you will have use a Client
                        SDK which supports variants.
                    </p>
                    <p>
                        If you want to give feedback on this feature, experiences issues or have questions please feel
                        free to open an issue request on <a href="https://github.com/Unleash/unleash/">GitHub</a>.
                    </p>
                    <table className={['mdl-data-table mdl-shadow--2dp', styles.variantTable].join(' ')}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Weight</th>
                                <th className={styles.actions}>
                                    <IconButton
                                        raised
                                        accent
                                        name="add"
                                        onClick={e => this.addVariant(e, variants)}
                                        title="Add variant"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>{variants.map(this.renderVariant)}</tbody>
                    </table>
                    <br />
                    <FormButtons submitText={'Save'} onCancel={onCancel} />
                </section>
            </form>
        );
    }
}

UpdateVariantComponent.propTypes = {
    input: PropTypes.object,
    features: PropTypes.array,
    setValue: PropTypes.func.isRequired,
    addVariant: PropTypes.func.isRequired,
    removeVariant: PropTypes.func.isRequired,
    updateVariant: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initCallRequired: PropTypes.bool,
    init: PropTypes.func,
};

export default UpdateVariantComponent;
