import { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Button } from '@material-ui/core';

import styles from './Project.module.scss';
import classnames from 'classnames';
import { FormButtons, styles as commonStyles } from '../common';
import { trim } from '../common/util';
import PageContent from '../common/PageContent/PageContent';
import AccessContext from '../../contexts/AccessContext';
import ConditionallyRender from '../common/ConditionallyRender';
import { CREATE_PROJECT } from '../AccessProvider/permissions';
import HeaderTitle from '../common/HeaderTitle';

class ProjectFormComponent extends Component {
    static contextType = AccessContext;

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
        const { validateId, editMode } = this.props;
        if (editMode) return true;

        try {
            await validateId(id);
            errors.id = undefined;
        } catch (err) {
            errors.id = err.message;
        }

        this.setState({ errors });
        if (errors.id) return false;
        return true;
    };

    validateName = () => {
        const { project } = this.state;
        if (project.name.length === 0) {
            this.setState(prev => ({
                errors: { ...prev.errors, name: 'Name can not be empty.' },
            }));
            return false;
        }
        return true;
    };

    validate = async id => {
        const validId = await this.validateId(id);
        const validName = this.validateName();

        return validId && validName;
    };

    onCancel = evt => {
        const { project } = this.state;
        evt.preventDefault();

        const { editMode } = this.props;

        if (editMode) {
            this.props.history.push(`/projects/${project.id}`);
            return;
        }
        this.props.history.goBack();
    };

    onSubmit = async evt => {
        evt.preventDefault();
        const { project } = this.state;

        const valid = await this.validate(project.id);

        if (valid) {
            const { editMode } = this.props;
            const query = editMode ? 'edited=true' : 'created=true';
            await this.props.submit(project);
            this.props.history.push(`/projects/${project.id}?${query}`);
        }
    };

    render() {
        const { project, errors } = this.state;
        const { hasAccess } = this.context;
        const { editMode } = this.props;
        const submitText = editMode ? 'Update' : 'Create';

        return (
            <PageContent
                headerContent={
                    <HeaderTitle
                        title={`${submitText} Project`}
                        actions={
                            <ConditionallyRender
                                condition={
                                    hasAccess(CREATE_PROJECT) && editMode
                                }
                                show={
                                    <>
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            this.props.history.push(
                                                `/projects/${project.id}/environments`
                                            )
                                        }
                                    >
                                        Environments
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            this.props.history.push(
                                                `/projects/${project.id}/access`
                                            )
                                        }
                                    >
                                        Manage access
                                    </Button>
                                    </>
                                }
                            />
                        }
                    />
                }
            >
                <Typography
                    variant="subtitle1"
                    style={{ marginBottom: '0.5rem' }}
                >
                    Projects allows you to group feature toggles together in the
                    management UI.
                </Typography>
                <form
                    onSubmit={this.onSubmit}
                    className={classnames(
                        commonStyles.contentSpacing,
                        styles.formContainer
                    )}
                >
                    <TextField
                        label="Project Id"
                        name="id"
                        placeholder="A-unique-key"
                        value={project.id}
                        error={!!errors.id}
                        helperText={errors.id}
                        disabled={editMode}
                        variant="outlined"
                        size="small"
                        onBlur={v => this.validateId(v.target.value)}
                        onChange={v =>
                            this.setValue('id', trim(v.target.value))
                        }
                    />
                    <br />
                    <TextField
                        label="Name"
                        name="name"
                        placeholder="Project name"
                        value={project.name}
                        error={!!errors.name}
                        variant="outlined"
                        size="small"
                        helperText={errors.name}
                        onChange={v => this.setValue('name', v.target.value)}
                    />
                    <TextField
                        className={commonStyles.fullwidth}
                        placeholder="A short description"
                        rowsMax={2}
                        label="Description"
                        error={!!errors.description}
                        helperText={errors.description}
                        variant="outlined"
                        size="small"
                        multiline
                        value={project.description}
                        onChange={v =>
                            this.setValue('description', v.target.value)
                        }
                    />

                    <ConditionallyRender
                        condition={hasAccess(CREATE_PROJECT)}
                        show={
                            <div className={styles.formButtons}>
                                <FormButtons
                                    submitText={submitText}
                                    onCancel={this.onCancel}
                                />
                            </div>
                        }
                    />
                </form>
            </PageContent>
        );
    }
}

ProjectFormComponent.propTypes = {
    project: PropTypes.object.isRequired,
    validateId: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default ProjectFormComponent;
