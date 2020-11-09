import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentUser } from "../../actions/authActions";

class Apply extends Component {   

    constructor(props) {
        super(props);
        
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

        const {user} = this.props.auth;
        const newApply = {
            name: this.state.name || user.name,
            email: this.state.email || user.email,
            message: this.state.message,
            phone: this.state.phone || user.phone,
        }
        axios.post('http://localhost:4000/apply/add', newApply)
        
        emailjs.sendForm('service_hitrauf', 'template_0q8o6jc', e.target, 'user_k7Lj81e4BTmGqpaBhbn5j')
          .then((result) => {
                console.log(result.text);
            },
            (error) => {
            console.log(error.text);
        })
    }

    render() {
        const { user } = this.props.auth;
    return (
        
    <>
    <div className="text-center">
    <Button 
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            className="mt-2" variant="primary" onClick={this.showModal}>Apply</Button>
    </div>
    <Modal show={this.state.show} onHide={this.onHide}>

        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Apply to the Job</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>

            <div className="form-group ml-2 mr-2">
            <label>Name :</label>
            <input
                name="name"
                type="text"
                className="form-control"
                value={this.state.name || user.name}
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
                value={this.state.email || user.email}
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
                value={this.state.phone || user.phone}
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
            <button 
            style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.0px",
            }}
            type="submit" className="btn btn-primary">Send application</button>
            
            <Button 
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
            }}
            className="btn btn-primary float-right mr-5" onClick={this.hideModal}>close</Button>
            </div>
        </form>
      </Modal>
    </>
    )
    }
}

Apply.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { setCurrentUser }
  )(Apply);


