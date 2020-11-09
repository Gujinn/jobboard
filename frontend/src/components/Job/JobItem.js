import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import Apply from '../Apply/Apply.js'

class JobItem extends Component {
	render() {
	const {currentJob} = this.props;

	return (
	<Accordion>
	<div className="card mt-1 ml-2 mr-2">
		<div className="card-body bg-secondary text-white border border-dark">
			<h5 className="card-title">{currentJob.jobName} -  {currentJob.jobType}</h5>
			<p className="card-text">{currentJob.firstDescription}</p>
			<p className="card-text float-left small"></p>
		</div>
		<Accordion.Toggle as={Button} className="bg-primary text-white" variant="link" eventKey={currentJob._id}>Learn more</Accordion.Toggle>
		<Accordion.Collapse eventKey={currentJob._id}>
		<Card.Body>
		<ul className="list-group list-group-flush">
			<li className="list-group-item h5">Description : {currentJob.description}</li>
			<li className="list-group-item h5">Wages : {currentJob.jobWages} £/Year</li>
			<li className="list-group-item h5">Company name : {currentJob.company?.name}</li>
			<li className="list-group-item h5">Company adress : {currentJob.company?.address}</li>
			<li className="list-group-item h5">From : {currentJob.dateStart?.slice(0,10)} To : {currentJob.dateEnd?.slice(0,10)}</li>
			<Apply />
		</ul>
		</Card.Body>
		</Accordion.Collapse>
	</div>
	</Accordion>
	)
	}
	
}

JobItem.propTypes = {
    currentJob: PropTypes.object.isRequired
  };
  
export default JobItem;