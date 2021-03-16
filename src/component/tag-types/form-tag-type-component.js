import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { FormButtons, styles as commonStyles } from '../common';
class AddTagTypeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagType: props.tagType,
            errors: {},
            dirty: false,
            currentLegalValue: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.tagType && props.tagType.name) {
            return { tagType: props.tagType };
        } else {
            return null;
        }
    }

    onValidateName = async evt => {
        evt.preventDefault();
        const name = evt.target.value;
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

    setValue = (field, value, trim = true) => {
        const { tagType } = this.state;
        tagType[field] = trim ? value.trim() : value;
        this.setState({ tagType, dirty: true });
    };

    onCancel = evt => {
        evt.preventDefault();
        this.props.history.push('/tag-types');
    };

    onSubmit = async evt => {
        evt.preventDefault();
        const { tagType } = this.state;

        try {
            await this.props.submit(tagType);
            this.props.history.push('/tag-types');
        } catch (e) {
            this.setState({
                errors: {
                    general: e.message,
                },
            });
        }
    };

    render() {
        const { tagType, errors } = this.state;
        const { editMode } = this.props;
        const submitText = editMode ? 'Update' : 'Create';
        return (
            <Card shadow={0} className={commonStyles.fullWidth} style={{ overflow: 'visible' }}>
                <CardHeader style={{ paddingTop: '24px', paddingBottom: '0', wordBreak: 'break-all' }}>
                    {submitText} Tag type
                </CardHeader>
                <CardContent>
                    Tag types allows you to group tags together in the management UI
                    <form onSubmit={this.onSubmit}>
                        <section style={{ padding: '16px' }}>
                            <p style={{ color: 'red' }}>{errors.general}</p>
                            <TextField
                                label="Name"
                                name="name"
                                placeholder="url-friendly-unique-name"
                                value={tagType.name}
                                error={errors.name !== undefined}
                                helperText={errors.name}
                                disabled={editMode}
                                onBlur={this.onValidateName}
                                onChange={v => this.setValue('name', v.target.value)}
                            />
                            <TextField
                                style={{ width: '100%' }}
                                label="Description"
                                name="description"
                                placeholder="Some short explanation of the tag type"
                                rows={1}
                                error={errors.description !== undefined}
                                helperText={errors.description}
                                value={tagType.description}
                                onChange={v => this.setValue('description', v.target.value, false)}
                            />
                        </section>
                        <CardActions>
                            <FormButtons submitText={submitText} onCancel={this.onCancel} />
                        </CardActions>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

AddTagTypeComponent.propTypes = {
    tagType: PropTypes.object.isRequired,
    validateName: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
};

export default AddTagTypeComponent;
