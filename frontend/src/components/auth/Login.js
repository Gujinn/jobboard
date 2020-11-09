import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); 
    }

    if (nextProps.auth.isAuthenticated && nextProps.auth.user.email === 'admin@gmail.com') {
      this.props.history.push("/admin");
    }
    
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };  console.log(userData);

    this.props.loginUser(userData);
  };
  
  render() {
    const { errors } = this.state;
    
    return (
        <div style={{marginTop: 5, marginLeft: 5, marginRight: 5}}>  
        <h3 className="ml-1">Login</h3> 
        <form noValidate onSubmit={this.onSubmit}>

            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <span className="text-danger">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("ml-2", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <span className="text-danger">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("ml-2", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
            </div>

            <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
            </div>
        </form>
        <p className="grey-text text-darken-1">
                No account ? <Link to="/register">Register</Link>
              </p>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
) (Login);