import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper } from '@material-ui/core';
import styles from './Tag.module.scss';
import { FormButtons, styles as commonStyles } from '../common';
import TagTypeSelect from '../feature/tag-type-select-container';
class AddTagComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: props.tag,
            errors: {},
            dirty: false,
            currentLegalValue: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.tag.id && props.tag.id) {
            return { tag: props.tag };
        } else {
            return null;
        }
    }

    setValue = (field, value) => {
        const { tag } = this.state;
        tag[field] = value;
        this.setState({ tag, dirty: true });
    };

    onCancel = evt => {
        evt.preventDefault();
        this.props.history.push('/tags');
    };

    onSubmit = async evt => {
        evt.preventDefault();
        const { tag } = this.state;
        if (!tag.type || tag.type === '') {
            tag.type = 'simple';
        }
        try {
            await this.props.submit(tag);
            this.props.history.push('/tags');
        } catch (e) {
            this.setState({
                errors: {
                    general: e.message,
                },
            });
        }
    };

    render() {
        const { tag, errors } = this.state;
        const submitText = 'Create';
        return (
            <Paper shadow={0} className={commonStyles.fullwidth}>
                <div className={styles.header}>
                    <h1>{`${submitText} Tag`}</h1>
                </div>
                <section className={styles.container}>
                    <form onSubmit={this.onSubmit}>
                        <p style={{ color: 'red' }}>{errors.general}</p>
                        <TagTypeSelect
                            name="type"
                            value={tag.type}
                            onChange={v => this.setValue('type', v.target.value)}
                            className={styles.select}
                        />
                        <TextField
                            label="Value"
                            name="value"
                            placeholder="Your tag"
                            size="small"
                            variant="outlined"
                            value={tag.value}
                            error={errors.value}
                            helperText={errors.value}
                            onChange={v => this.setValue('value', v.target.value)}
                            className={styles.textfield}
                        />
                        <div className={styles.formbuttons}>
                            <FormButtons submitText={submitText} onCancel={this.onCancel} />
                        </div>
                    </form>
                </section>
            </Paper>
        );
    }
}

AddTagComponent.propTypes = {
    tag: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default AddTagComponent;
