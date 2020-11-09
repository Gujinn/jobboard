import Modal from 'react-bootstrap/Modal'
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class adUser extends Component {   

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
            name: "",
            email: "",
            phone: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
      
      onSubmit = e => {
        e.preventDefault();

        this.hideModal();
        this.onHide();
        
        const newUser = {
          name: this.state.name,
          phone: this.state.phone, 
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        }; 
        this.props.registerUser(newUser, this.props.history); 
      };

    render() {
        const  {errors} = this.state;
    return (
        
    <>
    <button className="btn btn-primary btn-sm float-right" onClick={this.showModal}>Add</button>
    <Modal show={this.state.show} onHide={this.onHide}>

        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Add a user</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>
        <div className="form-group ml-2 mr-2 mt-2">
                <label htmlFor="name">Name: </label>
                <span className="text-danger">{errors.name}</span>
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("ml-2", {
                    invalid: errors.name
                  })}
                />
            </div>

            <div className="form-group ml-2 mr-2">
                <label htmlFor="name">Phone: </label>
                <span className="text-danger">{errors.phone}</span>
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  maxLength="10"
                  id="phone"
                  type="text"
                  className={classnames("ml-2", {
                    invalid: errors.phone
                  })}
                />
            </div>

            <div className="form-group ml-2 mr-2">
                <label htmlFor="email">Email: </label>
                <span className="text-danger">{errors.email}</span>
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("ml-2", {
                    invalid: errors.email
                  })}
                />
            </div>

            <div className="form-group ml-2 mr-2">
                <label htmlFor="password">Password: </label>
                <span className="text-danger">{errors.password2}</span>
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("ml-2", {
                    invalid: errors.password
                  })}
                />
            </div>

            <div className="form-group ml-2 mr-2">
                <label htmlFor="password2">Confirm password: </label>
                <input
                  required
                  className="ml-2"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
            </div>

                    <div className="form-group ml-2">
                        <input type="submit" value="Add User" className="btn btn-primary" />
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

adUser.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { registerUser }
  )(adUser);


