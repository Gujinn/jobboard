import React, { Component } from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apply from './editApply'
import Aply from './deleteApply'

class ApplyItem extends Component {
	render() {
	const {currentApply} = this.props;
	return (
		<tr>
        <td>{currentApply.email}</td>
        <td>{currentApply.phone}</td>
	    <td>{currentApply.name}</td>
		<td>{currentApply.message}</td>
		<td>{currentApply._id}</td>
		<td><Apply /> <Aply /></td>
    </tr>
	)
	}
	
}

ApplyItem.propTypes = {
    currentApply: PropTypes.object.isRequired
  };
  
export default ApplyItem;