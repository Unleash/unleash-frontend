import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';

import styles from './Project.module.scss';
import classnames from 'classnames';
import { FormButtons, styles as commonStyles } from '../common';
import { trim } from '../common/util';
import PageContent from '../common/PageContent/PageContent';
import AccessContext from '../../contexts/AccessContext';
import ConditionallyRender from '../common/ConditionallyRender';
import { CREATE_PROJECT } from '../AccessProvider/permissions';
import HeaderTitle from '../common/HeaderTitle';
import useUiConfig from '../../hooks/api/getters/useUiConfig/useUiConfig';
import { Alert } from '@material-ui/lab';

const ProjectFormComponent = (props) => {
    const { editMode } = props;

    const { hasAccess } = useContext(AccessContext);
    const [project, setProject ] = useState(props.project || {});
    const [errors, setErrors ] = useState({});
    const { isOss } = useUiConfig();


    useEffect(() => {
        if(!project.id && props.project.id) {
            setProject(project);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.project]);

    if(isOss()) {
        return (
            <PageContent>
                <Alert severity="error">
                    Creating and updating projects requires a paid version of Unleash. 
                    Check out <a href="https://www.getunleash.io" target="_blank" rel="noreferrer">getunleash.io</a> 
                    to find out more.
                </Alert>
            </PageContent>
        );
    }
    const setValue = (field, value) => {
        const p = {...project}
        p[field] = value;
        setProject(p)
    };

    const validateId = async id => {
        if (editMode) return true;

        const e = {...errors};
        try {
            await props.validateId(id);
            e.id = undefined;
        } catch (err) {
            e.id = err.message;
        }

        setErrors(e)
        if (e.id) return false;
        return true;
    };

    const validateName = () => {
        if (project.name.length === 0) {
            setErrors({...errors, name: 'Name can not be empty.' })
            return false;
        }
        return true;
    };

    const validate = async id => {
        const validId = await validateId(id);
        const validName = validateName();

        return validId && validName;
    };

    const onCancel = evt => {
        evt.preventDefault();

        if (editMode) {
            props.history.push(`/projects/${project.id}`);
            return;
        }
        props.history.push(`/projects/`);
    };

    const onSubmit = async evt => {
        evt.preventDefault();

        const valid = await validate(project.id);

        if (valid) {
            const query = editMode ? 'edited=true' : 'created=true';
            await props.submit(project);
            props.history.push(`/projects/${project.id}?${query}`);
        }
    };

    const submitText = editMode ? 'Update' : 'Create';

    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title={`${submitText} Project`}
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
                onSubmit={onSubmit}
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
                    onBlur={v => validateId(v.target.value)}
                    onChange={v =>
                        setValue('id', trim(v.target.value))
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
                    onChange={v => setValue('name', v.target.value)}
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
                        setValue('description', v.target.value)
                    }
                />

                <ConditionallyRender
                    condition={hasAccess(CREATE_PROJECT)}
                    show={
                        <div className={styles.formButtons}>
                            <FormButtons
                                submitText={submitText}
                                onCancel={onCancel}
                            />
                        </div>
                    }
                />
            </form>
        </PageContent>
    );
}

ProjectFormComponent.propTypes = {
    project: PropTypes.object.isRequired,
    validateId: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default ProjectFormComponent;
