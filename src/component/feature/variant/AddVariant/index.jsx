import { connect } from 'react-redux';

import AddVariant from './AddVariant';

const mapStateToProps = state => ({ uiConfig: state.uiConfig.toJS() });

export default connect(mapStateToProps)(AddVariant);
