import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addApply } from "../actions/applyActions";

class adApply extends Component {   

    constructor() {
        super();
        
        this.state = {
            name: "",
            email: "",
            message: "",
            phone: "",
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
    
    onSubmit = (e) => {
        e.preventDefault();

        this.hideModal();
        this.onHide();

        const newApply = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            phone: this.state.phone,
        }
        this.props.addApply(newApply, this.props.history);
        
    };

    render() {
    return (
        
    <>
    <Button className="btn btn-sm float-right" variant="primary" onClick={this.showModal}>Add</Button>
    <Modal show={this.state.show} onHide={this.onHide}>

        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Add an application</Modal.Title>
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
            
            <div className="form-group ml-5">
            <button type="submit" className="btn btn-primary">Send application</button>
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

adApply.propTypes = {
    addApply: PropTypes.func.isRequired,
    apply: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    apply: state.apply
  });
  
  export default connect(
    mapStateToProps,
    { addApply }
  )(adApply);


