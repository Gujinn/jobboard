import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { applyList } from "../../actions/jobActions";
import PropTypes from "prop-types";
import apply from './Apply'

class applyList extends Component {

	componentDidMount() {
		this.props.applyList();
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
        <div>
            {
                jobs.map((currentJob, i) =>
                    this.renderItem({currentJob, i})
                )
            }
		    </div>
      )
    }
}

applyList.propTypes = {
    applyList: PropTypes.func.isRequired,
    apply: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    apply: state.apply
  });
  
  export default connect(
    mapStateToProps,
    { applyList }
)(JobList);