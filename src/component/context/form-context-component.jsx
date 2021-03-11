import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Chip, TextField, Paper, Switch } from '@material-ui/core';
import styles from './Context.module.scss';
import { FormButtons, styles as commonStyles } from '../common';
import { trim } from '../common/util';

const sortIgnoreCase = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a === b) return 0;
    if (a > b) return 1;
    return -1;
};

class AddContextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contextField: props.contextField,
            errors: {},
            currentLegalValue: '',
            dirty: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (state.contextField.initial && !props.contextField.initial) {
            return { contextField: props.contextField };
        } else {
            return null;
        }
    }

    setValue = (field, value) => {
        const { contextField } = this.state;
        contextField[field] = value;
        this.setState({ contextField, dirty: true });
    };

    validateContextName = async name => {
        const { errors } = this.state;
        const { validateName } = this.props;
        try {
            await validateName(name);
            errors.name = undefined;
        } catch (err) {
            errors.name = err.message;
        }

        this.setState({ errors });
    };

    onCancel = evt => {
        evt.preventDefault();
        this.props.history.push('/context');
    };

    onSubmit = evt => {
        evt.preventDefault();
        const { contextField } = this.state;
        this.props.submit(contextField).then(() => this.props.history.push('/context'));
    };

    updateCurrentLegalValue = evt => {
        this.setState({ currentLegalValue: trim(evt.target.value) });
    };

    addLegalValue = evt => {
        evt.preventDefault();
        const { contextField, currentLegalValue, errors } = this.state;

        if (!currentLegalValue) {
            return;
        }

        if (contextField.legalValues.indexOf(currentLegalValue) !== -1) {
            errors.currentLegalValue = 'Duplicate legal value';
            this.setState({ errors });
            return;
        }

        const legalValues = contextField.legalValues.concat(trim(currentLegalValue));
        contextField.legalValues = legalValues.sort(sortIgnoreCase);
        this.setState({
            contextField,
            currentLegalValue: '',
            errors: {},
        });
    };

    removeLegalValue = index => {
        const { contextField } = this.state;
        const legalValues = contextField.legalValues.filter((_, i) => i !== index);
        contextField.legalValues = legalValues;
        this.setState({ contextField });
    };

    renderLegalValue = (value, index) => (
        <Chip
            key={`${value}:${index}`}
            className="mdl-color--blue-grey-100"
            style={{ marginRight: '4px' }}
            onDelete={() => this.removeLegalValue(index)}
            label={value}
        />
    );

    render() {
        const { contextField, errors } = this.state;
        const { editMode } = this.props;
        const submitText = editMode ? 'Update' : 'Create';

        return (
            <Paper shadow={0} className={commonStyles.fullwidth}>
                <div className={styles.header}>
                    <h1>Create context field</h1>
                </div>
                <div className={styles.supporting}>
                    Context fields are a basic building block used in Unleash to control roll-out. They can be used
                    together with strategy constraints as part of the activation strategy evaluation.
                </div>
                <section className={styles.container}>
                    <form onSubmit={this.onSubmit}>
                        <section className={commonStyles.sectionPadding}>
                            <TextField
                                label="Name"
                                name="name"
                                defaultValue={contextField.name}
                                error={errors.name}
                                helperText={errors.name}
                                disabled={editMode}
                                onBlur={v => this.validateContextName(v.target.value)}
                                onChange={v => this.setValue('name', trim(v.target.value))}
                            />
                            <TextField
                                className={commonStyles.fullwidth}
                                rowsMax={1}
                                label="Description"
                                error={errors.description}
                                helperText={errors.description}
                                defaultValue={contextField.description}
                                onChange={v => this.setValue('description', v.target.value)}
                            />
                            <br />
                            <br />
                        </section>
                        <section className={commonStyles.sectionPadding}>
                            <h6 className={styles.h6}>Legal values</h6>
                            <p className={styles.alpha}>
                                By defining the legal values the Unleash Admin UI will validate the user input. A
                                concrete example would be that we know all values for our “environment” (local,
                                development, stage, production).
                            </p>
                            <TextField
                                label="Value"
                                name="value"
                                className={styles.valuefield}
                                value={this.state.currentLegalValue}
                                error={errors.currentLegalValue}
                                helperText={errors.currentLegalValue}
                                onChange={this.updateCurrentLegalValue}
                            />
                            <Button onClick={this.addLegalValue} variant="contained">
                                Add
                            </Button>
                            <div>{contextField.legalValues.map(this.renderLegalValue)}</div>
                        </section>
                        <br />
                        <section className={commonStyles.sectionPadding}>
                            <h6 className={styles.h6}>Custom stickiness (beta)</h6>
                            <p className={styles.alpha}>
                                By enabling stickiness on this context field you can use it together with the
                                flexible-rollout strategy. This will guarantee a consistent behavior for specific values
                                of this context field. PS! Not all client SDK's support this feature yet!{' '}
                                <a
                                    href="https://unleash.github.io/docs/activation_strategy#flexiblerollout"
                                    target="_blank"
                                >
                                    Read more
                                </a>
                            </p>
                            <Switch
                                label="Allow stickiness"
                                checked={contextField.stickiness}
                                onChange={() => this.setValue('stickiness', !contextField.stickiness)}
                            />
                        </section>
                        <div className={styles.formbuttons}>
                            <FormButtons submitText={submitText} onCancel={this.onCancel} />
                        </div>
                    </form>
                </section>
            </Paper>
        );
    }
}

AddContextComponent.propTypes = {
    contextField: PropTypes.object.isRequired,
    validateName: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default AddContextComponent;
