import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { jobList } from "../../actions/jobActions";
import PropTypes from "prop-types";
import JobItem from './JobItem'

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
		    jobs?.length &&
        <div className="card-deck ml-5 mt-2">
            {
                jobs.map((currentJob, i) =>
                    this.renderItem({currentJob, i})
                )
            }
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