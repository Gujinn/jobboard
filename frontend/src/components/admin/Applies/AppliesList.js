import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { applyList } from "../actions/applyActions";
import PropTypes from "prop-types";
import ApplyItem from './ApplyItem';
import Apply from './addApply'

class AppliesList extends Component {

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

    renderApply = ({currentApply, i}) => {
        return (
            <ApplyItem currentApply={currentApply} key={currentApply._id} />
        )
    }

    render() {
      const {applies} = this.props.apply
      return (
        <div>
          <div>
            <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Applies Table<Apply /></h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Name</th>
                            <th>Message</th>
                            <th>id</th> 
                            <th>Edit/Delete</th>
                          </tr>
                        </thead>
                      <tbody>
                        {
                        applies.map((currentApply, i) =>
                        this.renderApply({currentApply, i})
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
  

AppliesList.propTypes = {
    applyList: PropTypes.func.isRequired,
    apply: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    apply: state.apply
  });
  
  export default connect(
    mapStateToProps,
    { applyList }
)(AppliesList);