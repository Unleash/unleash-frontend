import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-mdl';
import StrategiesList from './strategies-list';
import ConfigureStrategy from './strategy-configure';
import AddStrategy from './strategies-add';
import { HeaderTitle } from '../../common';

const GROUP_STRATEGY = '__internal-strategy-group';

const ListStrategies = ({ strategies }) => (
    <table>
        <tbody>
            {strategies.map((strategy, i) => (
                <tr key={i}>
                    <td><SingleStrategy strategy={strategy} /></td>
                </tr>
            ))}
        </tbody>
    </table>
);

const StrategyGroup = ({ strategy }) => (
    <div style={{ backgroundColor: '#EFEFEF' }}>
        Group: <strong>{strategy.displayName || strategy.name}</strong>
        <br />
        Operator: <strong>{strategy.operator}</strong>
        <br />
        Strategies:
        <ListStrategies strategies={strategy.group} />
    </div>
);

const SingleStrategy = ({ strategy }) => (
    <div>
        <strong>{strategy.name}</strong>
    </div>
);

const Strategy = ({ strategy }) =>
    strategy.name === GROUP_STRATEGY ? <StrategyGroup strategy={strategy} /> : <SingleStrategy strategy={strategy} />;

class StrategiesSectionComponent extends React.Component {
    static propTypes = {
        strategies: PropTypes.array.isRequired,
        addStrategy: PropTypes.func.isRequired,
        removeStrategy: PropTypes.func.isRequired,
        updateStrategy: PropTypes.func.isRequired,
        fetchStrategies: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.fetchStrategies();
    }

    render() {
        if (!this.props.strategies || this.props.strategies.length === 0) {
            return <ProgressBar indeterminate />;
        }

        return (
            <div style={{ padding: '10px 0' }}>
                {this.props.addStrategy ? (
                    <HeaderTitle title="Activation strategies" actions={<AddStrategy {...this.props} />} />
                ) : (
                    <span />
                )}
                {this.props.configuredStrategies.map((strategy, i) => <Strategy key={i} strategy={strategy} />)}

                <a href="¤">+ create strategy group</a>
            </div>
        );
    }
}

export default StrategiesSectionComponent;
