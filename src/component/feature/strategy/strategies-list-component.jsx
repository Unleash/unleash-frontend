import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import cloneDeep from "lodash.clonedeep";
import arrayMove from "array-move";
import { Button, Icon } from "@material-ui/core";

import DragAndDrop from "../../common/drag-and-drop";
import ConfigureStrategy from "./ConfigureStrategy";
import AddStrategy from "./strategies-add";
import HeaderTitle from "../../common/HeaderTitle";
import { updateIndexInArray } from "../../common/util";
import styles from "./strategy.module.scss";
import StrategyCard from "./StrategyCard";
import EditStrategyModal from "./EditStrategyModal/EditStrategyModal";

const cleanStrategy = strategy => ({
    name: strategy.name,
    parameters: cloneDeep(strategy.parameters),
    constraints: cloneDeep(strategy.constraints || [])
});

const StrategiesList = props => {
    const [editableStrategies, updateEditableStrategies] = useState(
        cloneDeep(props.configuredStrategies)
    );
    const dirty = editableStrategies.some(p => p.dirty);

    useEffect(() => {
        if (!dirty) {
            updateEditableStrategies(cloneDeep(props.configuredStrategies));
        }
    }, [props.configuredStrategies]);

    const updateStrategy = index => (strategy, dirty = true) => {
        const newStrategy = { ...strategy, dirty };
        const newStrategies = updateIndexInArray(
            editableStrategies,
            index,
            newStrategy
        );
        updateEditableStrategies(newStrategies);
    };

    const saveStrategy = index => async () => {
        const strategies = [...props.configuredStrategies];
        const strategy = editableStrategies[index];
        const cleanedStrategy = cleanStrategy(strategy);

        if (strategy.new) {
            strategies.push(cleanedStrategy);
        } else {
            strategies[index] = cleanedStrategy;
        }

        // store in server
        await props.saveStrategies(strategies);

        // update local state
        updateStrategy(index)(cleanedStrategy, false);
    };

    const addStrategy = strategy => {
        const strategies = [...editableStrategies];
        strategies.push({ ...strategy, dirty: true, new: true });
        updateEditableStrategies(strategies);
    };

    const moveStrategy = async (index, toIndex) => {
        if (!dirty) {
            // console.log(`move strategy from ${index} to ${toIndex}`);
            const strategies = arrayMove(editableStrategies, index, toIndex);
            await props.saveStrategies(strategies);
            updateEditableStrategies(strategies);
        }
    };

    const removeStrategy = index => async () => {
        // eslint-disable-next-line no-alert
        if (
            window.confirm(
                "Are you sure you want to remove this activation strategy?"
            )
        ) {
            const strategy = editableStrategies[index];
            if (!strategy.new) {
                await props.saveStrategies(
                    props.configuredStrategies.filter((_, i) => i !== index)
                );
            }

            updateEditableStrategies(
                editableStrategies.filter((_, i) => i !== index)
            );
        }
    };

    const clearAll = () => {
        updateEditableStrategies(cloneDeep(props.configuredStrategies));
    };

    const saveAll = async () => {
        const cleanedStrategies = editableStrategies.map(cleanStrategy);
        await props.saveStrategies(cleanedStrategies);
        updateEditableStrategies(cleanedStrategies);
    };

    const {
        strategies,
        configuredStrategies,
        featureToggleName,
        editable
    } = props;

    if (!configuredStrategies || configuredStrategies.length === 0) {
        return (
            <p style={{ padding: "0 16px" }}>
                <i>No activation strategies selected.</i>
            </p>
        );
    }

    const resolveStrategyDefinition = strategyName => {
        if (!strategies || strategies.length === 0) {
            return { name: "Loading" };
        }
        return strategies.find(s => s.name === strategyName);
    };

    const blocks = editableStrategies.map((strategy, i) => (
        <ConfigureStrategy
            index={i}
            key={i}
            featureToggleName={featureToggleName}
            strategy={strategy}
            moveStrategy={moveStrategy}
            removeStrategy={removeStrategy(i)}
            updateStrategy={updateStrategy(i)}
            saveStrategy={saveStrategy(i)}
            strategyDefinition={resolveStrategyDefinition(strategy.name)}
            editable={editable}
            movable={!dirty}
        />
    ));

    // Hard-code for now
    const editingStrategy = editableStrategies.findIndex(e => e.dirty);
    const cards = editableStrategies.map((strategy, i) => (
        <StrategyCard
            key={i}
            strategy={strategy}
            strategyDefinition={resolveStrategyDefinition(strategy.name)}
            removeStrategy={removeStrategy(i)}
            moveStrategy={moveStrategy}
            index={i}
            movable
        />
    ));

    return (
        <div>
            {editingStrategy > -1 ? (
                <EditStrategyModal
                    strategy={editableStrategies[editingStrategy]}
                    updateStrategy={updateStrategy(editingStrategy)}
                    saveStrategy={saveStrategy(editingStrategy)}
                    strategyDefinition={resolveStrategyDefinition(
                        editableStrategies[editingStrategy].name
                    )}
                    onCancel={clearAll}
                />
            ) : null}
            <DragAndDrop>
                {editable && (
                    <HeaderTitle
                        title="Activation strategies"
                        actions={
                            <AddStrategy
                                strategies={strategies}
                                addStrategy={addStrategy}
                                featureToggleName={featureToggleName}
                            />
                        }
                    />
                )}
                <div className={styles.strategyListCards}>{cards}</div>
                <div className={styles.strategyList}>{blocks}</div>
                <div
                    style={{
                        visibility: dirty ? "visible" : "hidden",
                        padding: "10px"
                    }}
                >
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        icon="add"
                        onClick={saveAll}
                    >
                        <Icon>save</Icon>
                        &nbsp;&nbsp;&nbsp; Save all
                    </Button>
                    &nbsp;
                    <Button type="cancel" onClick={clearAll}>
                        Clear all
                    </Button>
                </div>
            </DragAndDrop>
        </div>
    );
};

StrategiesList.propTypes = {
    strategies: PropTypes.array.isRequired,
    configuredStrategies: PropTypes.array.isRequired,
    featureToggleName: PropTypes.string.isRequired,
    saveStrategies: PropTypes.func,
    editable: PropTypes.bool
};

export default StrategiesList;
