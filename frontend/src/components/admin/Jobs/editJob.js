import Modal from 'react-bootstrap/Modal'
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateJob } from "../actions/jobActions";

class addApply extends Component {   

    showModal = () => {
        this.setState({ show: true });
      };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    onHide = () => {
        this.setState({ show: false });
    };

    constructor() {
        super();
        
        this.state = {
            jobName: "",
            jobType: "",
            jobWages: "",
            firstDescription: "",
            description: "",
            inCharge: "",
            dateStart: "",
            dateEnd: "",
            companyName: "",
            companyAddress: "",
            _id: "",
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.hideModal();
        this.onHide();
        
        const newJob = {
            jobName: this.state.jobName,
            jobType: this.state.jobType,
            jobWages: this.state.jobWages,
            firstDescription: this.state.firstDescription,
            description: this.state.description,
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            _id: this.state._id,
            company: {
                address: this.state.companyAddress,
                name: this.state.companyName,
            }, // TODO => transformer company en objet 
        }

        this.props.updateJob(newJob, this.props.history);
    }

    render() {
    return (
        
    <>
    <button className="btn btn-outline-warning btn-sm float-left" onClick={this.showModal}>Edit</button>
    <Modal show={this.state.show} onHide={this.onHide}>

        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Edit a job</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>
                    <div className="form-group ml-2 mr-2">
                        <label>Job Name: </label>
                        <input
                            name="jobName"
                            type="text"
                            className="form-control"
                            value={this.state.jobName}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group ml-2 mr-2">
                        <label>Type of contract: </label>
                        <div className="form-check form-check-inline ml-3">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="jobType"
                            id="jobTypeCDI"
                            value="CDI"
                            checked={this.state.jobType==='CDI'}
                            onChange={this.handleInputChange}
                        />
                        <label className="form-check-label">CDI</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="jobType"
                            id="jobTypeCDD"
                            value="CDD"
                            checked={this.state.jobType==='CDD'}
                            onChange={this.handleInputChange}
                        />
                        <label className="form-check-label">CDD</label>
                        </div>
                    </div>

                    <div className="form-group ml-2 mr-2">
                        <label>Job Wages: (USD/Year) </label>
                        <input
                            name="jobWages"
                            type="number"
                            min="0"
                            className="form-control"
                            value={this.state.jobWages}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="form-group ml-2 mr-2">
                        <label>First Description (- 40 char) :</label>
                        <input
                            name="firstDescription"
                            type="text"
                            className="form-control"
                            maxLength="40"
                            value={this.state.firstDescription}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group ml-2 mr-2">
                        <label>Description: </label>
                        <textarea
                            name="description"
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

                    {/* <div className="form-group ml-2 mr-2">
                        <label>In charge of the ad ? </label>
                        <div className="form-check form-check-inline ml-3">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="inCharge"
                                id="inChargeYes"
                                value="Yes"
                                checked={this.state.inCharge==='Yes'}
                                onChange={this.handleInputChange}
                            />
                            <label className="form-check-label">yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="inCharge"
                                id="inChargeNo"
                                value="No"
                                checked={this.state.inCharge==='No'}
                                onChange={this.handleInputChange}
                            />
                            <label className="form-check-label">no</label>
                        </div>
                    </div> */}

                    <div className="form-group ml-2 mr-2">
                        <label>Job Start: </label>
                        <input
                            name="dateStart"
                            type="date"
                            id="start"
                            className="form-control"
                            value={this.state.dateStart}
                            onChange={this.handleInputChange}
                        />
                        <label className="mt-1">Job End: </label>
                        <input
                            name="dateEnd"
                            type="date"
                            id="start"
                            className="form-control"
                            value={this.state.dateEnd}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="form-group ml-2 mr-2">
                        <label>Company Name: </label>
                        <input
                            name="companyName"
                            type="text"
                            id="companyName"
                            className="form-control"
                            value={this.state.companyName}
                            onChange={this.handleInputChange}
                            required
                        />
                        <label className="mt-1">Company Address: </label>
                        <input
                            name="companyAddress"
                            type="text"
                            id="companyAddress"
                            className="form-control"
                            value={this.state.companyAddress}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>

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

                    <div className="form-group ml-2">
                        <input type="submit" value="Edit Job" className="btn btn-primary" />
                    </div>
                    
                </form>
        <div className="form-group ml-2">
            <button className="btn btn-primary" onClick={this.hideModal}>close</button>
        </div>
      </Modal>
    </>
    )
    }
}

addApply.propTypes = {
    updateJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    job: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { updateJob }
  )(addApply);


