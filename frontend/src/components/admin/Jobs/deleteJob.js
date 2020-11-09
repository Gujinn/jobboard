import Modal from 'react-bootstrap/Modal'
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteJob } from "../actions/jobActions";

class delJob extends Component {   

    constructor() {
        super();
        
        this.state = {
            _id: "",
            show: false,
        };
    }

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    onHide = () => {
        this.setState({ show: false });
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    };
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      onSubmit = e => {
        e.preventDefault();

        this.hideModal();
        this.onHide();
        
        const newJob = {
          _id : this.state._id,
        }; 
        this.props.deleteJob(newJob, this.props.history); 
      };

    render() {
    return (
        
    <>
    <button className="btn btn-outline-danger btn-sm mt-1" onClick={this.showModal}>Delete</button>
    <Modal show={this.state.show} onHide={this.onHide}>

        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Delete a job</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>

            <div className="form-group ml-2 mr-2">
                <label>Confirm id: </label>
                <input
                  name="_id"
                  type="text"
                  className="form-control"
                  value={this.state._id}
                  onChange={this.handleInputChange}
                  required
                />
            </div>
            
            <div className="form-group ml-5">
            <button type="submit" className="btn btn-primary">Delete job</button>
            </div>
        </form>
        <div className="form-group ml-5">
            <button className="btn btn-primary" onClick={this.hideModal}>close</button>
        </div>
      </Modal>
    </>
    )
    }
}

delJob.propTypes = {
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    job: state.job
  });
  
  export default connect(
    mapStateToProps,
    { deleteJob }
  )(delJob);


