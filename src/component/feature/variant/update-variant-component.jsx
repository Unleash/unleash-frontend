import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, IconButton } from 'react-mdl';
import { FormButtons } from '../../common';
import VariantItemComponent from './variant-item-component';

class UpdateVariantComponent extends Component {
    componentWillMount() {
        // TODO unwind this stuff
        if (this.props.initCallRequired === true) {
            this.props.init(this.props.input);
        }
    }

    updateWeight = newWeight => {
        this.props.input.variants.forEach((v, i) => {
            v.weight = newWeight;
            this.props.updateVariant(i, v);
        });
    };

    addVariant = (e, variants) => {
        e.preventDefault();
        const size = variants.length + 1;
        const percentage = parseInt(1 / size * 100);
        const variant = {
            name: `variant${size}`,
            weight: percentage,
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

    renderVariant = (variant, index) => (
        <VariantItemComponent
            key={index}
            variant={variant}
            update={this.props.updateVariant.bind(null, index)}
            remove={e => this.removeVariant(e, index)}
        />
    );

    render() {
        const { onSubmit, onCancel, input, features } = this.props;
        const variants = input.variants || [];

        return (
            <form onSubmit={onSubmit(input, features)}>
                <section style={{ padding: '16px' }}>
                    <p>
                        Variants is a new Beta feature. In order to use variants you must use a Client SDK which Client
                        Client SDK which supports variants.
                    </p>
                    <table className="mdl-data-table mdl-shadow--2dp">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Name</th>
                                <th style={{ textAlign: 'left' }}>Percentage</th>
                                <th style={{ textAlign: 'center' }}>
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
                    <FormButtons submitText={'Update'} onCancel={onCancel} />
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
