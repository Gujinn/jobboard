import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone:"",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/edit");
    }
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
    e.preventDefault();const newUser = {
      name: this.state.name,
      phone: this.state.phone, 
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }; 
    this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    const { errors } = this.state;
    
    return (
        <div style={{marginTop: 5, marginLeft: 5, marginRight: 5}}>  
        <h3 className="ml-1">Register below</h3> 
        <form noValidate onSubmit={this.onSubmit}>

            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <span className="text-danger">{errors.name}</span>
                <input
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

            <div className="form-group">
                <label htmlFor="name">Phone: </label>
                <span className="text-danger">{errors.phone}</span>
                <input
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

            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <span className="text-danger">{errors.email}</span>
                <input
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

            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <span className="text-danger">{errors.password2}</span>
                <input
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

            <div className="form-group">
                <label htmlFor="password2">Confirm password: </label>
                <input
                  className="ml-2"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
            </div>

            <div className="form-group">
                <input type="submit" value="Sign up" className="btn btn-primary" />
            </div>
        </form>
        <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
        </div>
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
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
  )(withRouter(Register));