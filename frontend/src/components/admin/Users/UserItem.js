import React, { Component } from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from './editUser';
import Edi from './deleteUser';

class UserItem extends Component {
	render() {
	const {currentUser} = this.props;
	return (
		<tr>
        <td>{currentUser.email}</td>
        <td>{currentUser.phone}</td>
	    <td>{currentUser.name}</td>
		<td>{currentUser.date}</td>
		<td>{currentUser._id}</td>
		<td><Edit /> <Edi/></td>
    </tr>
	)
	}
	
}

UserItem.propTypes = {
    currentUser: PropTypes.object.isRequired
  };
  
export default UserItem;