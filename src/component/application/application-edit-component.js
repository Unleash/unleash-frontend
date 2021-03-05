/* eslint react/no-multi-comp:off */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
    Paper,
    Avatar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Icon,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    LinearProgress,
    Tabs,
    Tab
} from "@material-ui/core";
import ConditionallyRender from "../common/conditionally-render";
import { styles as commonStyles } from "../common";
import {
    formatFullDateTimeWithLocale,
    formatDateWithLocale
} from "../common/util";
import { UPDATE_APPLICATION } from "../../permissions";
import ApplicationView from "./application-view";
import ApplicationUpdate from "./application-update";
import TabNav from "../common/tabNav";

class ClientApplications extends PureComponent {
    static propTypes = {
        fetchApplication: PropTypes.func.isRequired,
        appName: PropTypes.string,
        application: PropTypes.object,
        location: PropTypes.object,
        storeApplicationMetaData: PropTypes.func.isRequired,
        deleteApplication: PropTypes.func.isRequired,
        hasPermission: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super();
        this.state = {
            activeTab: 0,
            loading: !props.application,
            prompt: false
        };
    }

    componentDidMount() {
        this.props
            .fetchApplication(this.props.appName)
            .finally(() => this.setState({ loading: false }));
    }
    formatFullDateTime = v =>
        formatFullDateTimeWithLocale(v, this.props.location.locale);
    formatDate = v => formatDateWithLocale(v, this.props.location.locale);

    deleteApplication = async evt => {
        evt.preventDefault();
        // if (window.confirm('Are you sure you want to remove this application?')) {
        const { deleteApplication, appName } = this.props;
        await deleteApplication(appName);
        this.props.history.push("/applications");
        // }
    };

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <p>Loading...</p>
                    <LinearProgress />
                </div>
            );
        } else if (!this.props.application) {
            return <p>Application ({this.props.appName}) not found</p>;
        }
        const {
            application,
            storeApplicationMetaData,
            hasPermission
        } = this.props;
        const {
            appName,
            instances,
            strategies,
            seenToggles,
            url,
            description,
            icon = "apps",
            createdAt
        } = application;

        const toggleModal = () => {
            this.setState(prev => ({ ...prev, prompt: !prev.prompt }));
        };

        const renderModal = () => (
            <Dialog
                open={this.state.prompt}
                onClose={this.toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <DialogTitle>
                    Are you sure you want to delete this application?
                </DialogTitle>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={this.deleteApplication}
                        autoFocus
                    >
                        Yes, I'm sure
                    </Button>
                    <Button onClick={toggleModal}>No, take me back.</Button>
                </DialogActions>
            </Dialog>
        );

        const tabData = [
            {
                label: "Application overview",
                component: (
                    <ApplicationView
                        strategies={strategies}
                        instances={instances}
                        seenToggles={seenToggles}
                        hasPermission={hasPermission}
                        formatFullDateTime={this.formatFullDateTime}
                    />
                )
            },
            {
                label: "Edit application",
                component: (
                    <ApplicationUpdate
                        application={application}
                        storeApplicationMetaData={storeApplicationMetaData}
                    />
                )
            }
        ];

        return (
            <Card className={commonStyles.fullwidth}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <Icon>{icon || "apps"}</Icon>
                        </Avatar>
                    }
                    title={appName}
                    action={
                        url && (
                            <IconButton href={url}>
                                <Icon>link</Icon>
                            </IconButton>
                        )
                    }
                />
                <CardContent style={{ paddingTop: "0" }}>
                    <p>{description || ""}</p>
                    <p>
                        Created: <strong>{this.formatDate(createdAt)}</strong>
                    </p>
                </CardContent>
                {hasPermission(UPDATE_APPLICATION) && (
                    <div>
                        <CardActions
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderTop: "1px solid #efefef"
                            }}
                        >
                            <span />
                            <Button
                                color="secondary"
                                title="Delete application"
                                onClick={toggleModal}
                            >
                                Delete
                            </Button>

                            <ConditionallyRender
                                condition={this.state.prompt}
                                show={renderModal}
                            />
                        </CardActions>
                        <hr />
                        <TabNav tabData={tabData} />
                    </div>
                )}
            </Card>
        );
    }
}

export default ClientApplications;
