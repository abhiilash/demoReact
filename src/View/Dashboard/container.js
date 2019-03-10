import { connect } from 'react-redux';

// Actions
import * as AuthActions from '../../redux/user/actions';

// The component we're mapping to
import DashboardRender from './component';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  usersData: state.user.usersData,
});

// Any actions to map to the component?
const mapDispatchToProps = {
  resetUsers: AuthActions.resetUsers,
  getUsers: AuthActions.getUsers,
  deleteUsers: AuthActions.deleteUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRender);
