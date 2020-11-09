import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { userList } from "../actions/userActions";
import PropTypes from "prop-types";
import UserItem from './UserItem';
import User from './addUser';

class UsersList extends Component {

	componentDidMount() {
		this.props.userList();
    }
    
    componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
		  this.setState({
			errors: nextProps.errors
		  });
		}
	}

    renderUser = ({currentUser, i}) => {
        return (
            <UserItem currentUser={currentUser} key={currentUser._id} />
        )
    }

    render() {
		const {users} = this.props.user
		
    return (
      users?.length &&
        <div>
          <div>
            <div className="container-fluid mt-2">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Users Table<User /></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>id</th> 
                            <th>Edit/Delete</th>
                          </tr>
                        </thead>
                      <tbody>
                        {
                        users.map((currentUser, i) =>
                        this.renderUser({currentUser, i})
                        )
                        }
                      </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

UsersList.propTypes = {
    userList: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    user: state.user
  });
  
  export default connect(
    mapStateToProps,
    { userList }
)(UsersList);