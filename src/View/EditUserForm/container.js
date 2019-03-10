import { connect } from 'react-redux';

// Actions
import * as AuthActions from '../../redux/user/actions';

// The component we're mapping to
import UserRender from './component';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
	getUsersByIdData: state.user.getUsersByIdData,
	editUsersRef: state.user.editUsersRef
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getUserById: AuthActions.getUserById,
  editUsers: AuthActions.editUsers,
  resetUsers: AuthActions.resetUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRender);
