import React, { Component } from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import Job from './editJob'
import Jo from './deleteJob'

class JobItem extends Component {
	render() {
	const {currentJob} = this.props;

	return (
			<tr>
            	<td>{currentJob.jobName}</td>
                <td>{currentJob.jobType}</td>
				<td>{currentJob.jobWages}</td>
				<td>{currentJob.firstDescription}</td>
			 	<td>{currentJob.description}</td>
				<td>{currentJob.dateStart}</td>
				<td>{currentJob.dateEnd}</td>
				<td>{currentJob.company?.name}</td>
				<td>{currentJob.company?.address}</td>
				<td>{currentJob._id}</td>
				<td><Job /> <Jo/></td>
            </tr>
	)
	}
	
}

JobItem.propTypes = {
    currentJob: PropTypes.object.isRequired
  };
  
export default JobItem;