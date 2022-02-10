import { StrategyForm } from '../../component/strategies/StrategyForm/StrategyForm';
import PropTypes from 'prop-types';

const render = ({ history }) => <StrategyForm history={history} />;

render.propTypes = {
    history: PropTypes.object.isRequired,
};

export default render;
