import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'react-mdl';
import styles from './strategy-list-component.scss';

class StrategyListComponent extends React.Component {
    static propTypes = {
        strategies: PropTypes.object.isRequired,
        strategyDefinitions: PropTypes.bool.isRequired,
        removeStrategy: PropTypes.func.isRequired,
        updateStrategy: PropTypes.func.isRequired,
    };

    render() {
        const { strategies, removeStrategy } = this.props;
        return (
            <table className={styles.strategyList}>
                <tbody>
                    {strategies.map((item, i) => (
                        <tr>
                            <td>
                                <strong>{item.name}</strong>
                            </td>
                            <td className={styles.action}>
                                <IconButton name="edit" title="edit" onClick={() => {}} />
                                <IconButton name="delete" title="delete" onClick={removeStrategy.bind(this, i)} />
                                <IconButton name="reorder" title="reorder" onClick={() => {}} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default StrategyListComponent;
