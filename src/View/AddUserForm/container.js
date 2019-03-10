import { connect } from 'react-redux';

// Actions
import * as AuthActions from '../../redux/user/actions';

// The component we're mapping to
import UserRender from './component';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
	addUsersRef: state.user.addUsersRef,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  addUsers: AuthActions.addUsers,
  resetUsers: AuthActions.resetUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRender);
