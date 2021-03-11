import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper } from '@material-ui/core';

import styles from './Project.module.scss';
import { FormButtons, styles as commonStyles } from '../common';
import { trim } from '../common/util';

class AddContextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.project,
            errors: {},
            currentLegalValue: '',
            dirty: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.project.id && props.project.id) {
            return { project: props.project };
        } else {
            return null;
        }
    }

    setValue = (field, value) => {
        const { project } = this.state;
        project[field] = value;
        this.setState({ project, dirty: true });
    };

    validateId = async id => {
        const { errors } = this.state;
        const { validateId } = this.props;
        try {
            await validateId(id);
            errors.id = undefined;
        } catch (err) {
            errors.id = err.message;
        }

        this.setState({ errors });
    };

    onCancel = evt => {
        evt.preventDefault();
        this.props.history.push('/projects');
    };

    onSubmit = async evt => {
        evt.preventDefault();
        const { project } = this.state;
        await this.props.submit(project);
        this.props.history.push('/projects');
    };

    render() {
        const { project, errors } = this.state;
        const { editMode } = this.props;
        const submitText = editMode ? 'Update' : 'Create';

        return (
            <Paper shadow={0} className={commonStyles.fullwidth}>
                <div className={styles.header}>
                    <h1>{submitText} Project</h1>
                </div>
                <section className={styles.container}>
                    <div className={styles.supporting}>
                        Projects allows you to group feature toggles together in the management UI.
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <section className={styles.formContainer}>
                            <TextField
                                label="Project Id"
                                name="id"
                                placeholder="A-unique-key"
                                value={project.id}
                                error={!!errors.id}
                                helperText={errors.id}
                                disabled={editMode}
                                onBlur={v => this.validateId(v.target.value)}
                                onChange={v => this.setValue('id', trim(v.target.value))}
                            />
                            <br />
                            <TextField
                                label="Name"
                                name="name"
                                placeholder="Project name"
                                value={project.name}
                                error={!!errors.name}
                                helperText={errors.name}
                                onChange={v => this.setValue('name', v.target.value)}
                            />
                            <TextField
                                className={commonStyles.fullwidth}
                                placeholder="A short description"
                                rowsMax={1}
                                label="Description"
                                error={!!errors.description}
                                helperText={errors.description}
                                value={project.description}
                                onChange={v => this.setValue('description', v.target.value)}
                            />
                        </section>
                        <div className={styles.formButtons}>
                            <FormButtons submitText={submitText} onCancel={this.onCancel} />
                        </div>
                    </form>
                </section>
            </Paper>
        );
    }
}

AddContextComponent.propTypes = {
    project: PropTypes.object.isRequired,
    validateId: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default AddContextComponent;
