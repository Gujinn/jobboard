import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { jobList } from "../actions/jobActions";
import PropTypes from "prop-types";
import JobItem from './JobItem';
import Job from './addJob'

class JobList extends Component {

	componentDidMount() {
		this.props.jobList();
    }
    
    componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
		  this.setState({
			errors: nextProps.errors
		  });
		}
	}

    renderItem = ({currentJob, i}) => {
        return (
            <JobItem currentJob={currentJob} key={currentJob._id} />
        )
    }

    render() {
		const {jobs} = this.props.job
		
      return (
        <div>
          <div>
            <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Jobs Table<Job /></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Wages</th>
					            <th>fDescription</th>
                      <th>description</th>
					            <th>Start</th>
                      <th>End</th>
                      <th>Name</th>
					            <th>Address</th>
                      <th>id</th> 
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                jobs.map((currentJob, i) =>
                    this.renderItem({currentJob, i})
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

JobList.propTypes = {
    jobList: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    job: state.job
  });
  
  export default connect(
    mapStateToProps,
    { jobList }
)(JobList);