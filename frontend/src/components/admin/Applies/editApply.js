import Modal from 'react-bootstrap/Modal'
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateApply } from "../actions/applyActions";

class addApply extends Component {   

    constructor() {
        super();
        
        this.state = {
            name: "",
            email: "",
            message: "",
            phone: "",
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
        
        const newApply = {
          name: this.state.name,
          phone: this.state.phone, 
          email: this.state.email,
          message: this.state.message,
          _id : this.state._id,
        }; 
        this.props.updateApply(newApply, this.props.history); 
      };

    render() {
    return (
        
    <>
    <button className="btn btn-outline-warning float-left" onClick={this.showModal}>Edit</button>
    <Modal show={this.state.show} onHide={this.onHide}>

        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Edit an application</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>

            <div className="form-group ml-2 mr-2">
            <label>Name :</label>
            <input
                name="name"
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.handleInputChange}
                required
            />
            </div>

            <div className="form-group ml-2 mr-2">
            <label>Email : </label>
            <input
                name="email"
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
            />
            </div>

            <div className="form-group ml-2 mr-2">
            <label>Phone : </label>
            <input
                maxLength="10"
                name="phone"
                type="text"
                className="form-control"
                value={this.state.phone}
                onChange={this.handleInputChange}
                required
            />
            </div>

            <div className="form-group ml-2 mr-2">
            <label>Message : </label>
            <textarea
                name="message"
                type="text"
                className="form-control"
                value={this.state.message}
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
            
            <div className="form-group ml-5">
            <button type="submit" className="btn btn-primary">Send edit</button>
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

addApply.propTypes = {
    updateApply: PropTypes.func.isRequired,
    apply: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    apply: state.apply
  });
  
  export default connect(
    mapStateToProps,
    { updateApply }
  )(addApply);


