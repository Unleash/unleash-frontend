import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Typography
} from "@material-ui/core";

import CreateStrategyCard from "./CreateStrategyCard/CreateStrategyCard";
import { useStyles } from "./CreateStrategy.styles";
import ConditionallyRender from "../../../common/ConditionallyRender";

const resolveDefaultParamValue = (name, featureToggleName) => {
    switch (name) {
        case "percentage":
        case "rollout":
            return "100";
        case "stickiness":
            return "default";
        case "groupId":
            return featureToggleName;
        default:
            return "";
    }
};

const CreateStrategy = ({
    strategies,
    showCreateStrategy,
    setShowCreateStrategy,
    featureToggleName,
    addStrategy
}) => {
    if (!strategies) return null;

    const nameMapping = {
        applicationHostname: {
            name: "Hosts",
            description: "Enable the feature for a specific set of hostnames"
        },
        default: {
            name: "Standard",
            description:
                "The standard strategy is strictly on / off for your entire userbase."
        },
        flexibleRollout: {
            name: "Gradual rollout",
            description:
                "Roll out to a percentage of your userbase, and ensure that the experience is the same for the user on each visit."
        },
        gradualRolloutRandom: {
            name: "Randomized",
            description:
                "Roll out to a percentage of your userbase and randomly enable the feature on a per request basis"
        },
        gradualRolloutSessionId: {
            name: "Sessions",
            description:
                "Roll out to a percentage of your userbase and configure stickiness based on sessionId"
        },
        gradualRolloutUserId: {
            name: "Users",
            description:
                "Roll out to a percentage of your userbase and configure stickiness based on userId"
        },
        remoteAddress: {
            name: "IPs",
            description: "Enable the feature for a specific set of IP addresses"
        },
        userWithId: {
            name: "Users",
            description: "Enable the feature for a specific set of userIds"
        }
    };

    const builtInStrategies = strategies.filter(
        strategy => strategy.editable !== true
    );
    const customStrategies = strategies.filter(strategy => strategy.editable);

    const styles = useStyles();

    const renderBuiltInStrategies = () =>
        builtInStrategies.map(strategy => (
            <CreateStrategyCard
                strategy={nameMapping[strategy.name]}
                key={strategy.name}
                onClick={() => {
                    setShowCreateStrategy(false);
                    setStrategyByName(strategy.name);
                }}
            />
        ));

    const renderCustomStrategies = () =>
        customStrategies.map(strategy => (
            <CreateStrategyCard
                strategy={strategy}
                key={strategy.name}
                onClick={() => {
                    setShowCreateStrategy(false);
                    setStrategyByName(strategy.name);
                }}
            />
        ));

    const setStrategyByName = strategyName => {
        const selectedStrategy = strategies.find(s => s.name === strategyName);
        const parameters = {};

        selectedStrategy.parameters.forEach(({ name }) => {
            parameters[name] = resolveDefaultParamValue(
                name,
                featureToggleName
            );
        });

        addStrategy({
            name: selectedStrategy.name,
            parameters
        });
    };

    return (
        <Dialog
            open={showCreateStrategy}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="form-dialog-title">Add a new strategy</DialogTitle>

            <DialogContent>
                <Typography variant="subtitle1" className={styles.subTitle}>
                    Built in strategies
                </Typography>
                <div className={styles.createStrategyCardContainer}>
                    {renderBuiltInStrategies()}
                </div>

                <ConditionallyRender
                    condition={customStrategies.length > 0}
                    show={
                        <>
                            <Typography
                                variant="subtitle1"
                                className={styles.subTitle}
                            >
                                Custom strategies
                            </Typography>
                            <div className={styles.createStrategyCardContainer}>
                                {renderCustomStrategies()}
                            </div>
                        </>
                    }
                />
            </DialogContent>

            <DialogActions>
                <Button
                    color="secondary"
                    onClick={() => setShowCreateStrategy(false)}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CreateStrategy.propTypes = {
    strategy: PropTypes.object.isRequired,
    updateStrategy: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveStrategy: PropTypes.func.isRequired,
    strategyDefinition: PropTypes.object.isRequired,
    context: PropTypes.array // TODO: fix me
};

export default CreateStrategy;
