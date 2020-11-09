import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/jobActions";
import { withRouter } from "react-router-dom";

class AddJobs extends Component {
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

        const newJob = {
            jobName: this.state.jobName,
            jobType: this.state.jobType,
            jobWages: this.state.jobWages,
            firstDescription: this.state.firstDescription,
            description: this.state.description,
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            company: {
                address: this.state.companyAddress,
                name: this.state.companyName,
            }, // TODO => transformer company en objet 
        }

        this.props.addJob(newJob, this.props.history);
    }

    render() {
        return (
            <div style={{marginTop: 5, marginLeft: 5, marginRight: 5}}>  
                <h3 className="ml-1 text-center">Add new job</h3> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
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

                    {/* <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
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

                    <div className="form-group">
                        <input 
                        style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                        type="submit" value="Create Job" className="btn btn-primary" />
                    </div>
                    
                </form>
            </div>
        )
    }
}

AddJobs.propTypes = {
    addJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
  };

  
  const mapStateToProps = state => ({
    job: state.job,
  });
  
  export default connect(
    mapStateToProps,
    { addJob }
  )(withRouter(AddJobs));
