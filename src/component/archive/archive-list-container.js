import { connect } from 'react-redux';
import FeatureListComponent from '../feature/FeatureToggleList/FeatureToggleList';
import { fetchArchive, revive } from './../../store/archive/actions';
import { updateSettingForGroup } from './../../store/settings/actions';
import { mapStateToPropsConfigurable } from '../feature/FeatureToggleList/list-container';

const mapStateToProps = mapStateToPropsConfigurable(false);
const mapDispatchToProps = {
    fetchArchive,
    revive,
    updateSetting: updateSettingForGroup('feature'),
};

const ArchiveListContainer = connect(mapStateToProps, mapDispatchToProps)(FeatureListComponent);

export default ArchiveListContainer;
