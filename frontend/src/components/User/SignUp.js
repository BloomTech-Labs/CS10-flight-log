import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isLoggedIn } from '../../utils/helper/helperFuncions';

import './SignUp.css';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			passwordComfirm: '',
			errorMessage: '',
		};
	}

	componentDidMount() {
		if (isLoggedIn()) {
			{
				/*changed endpoint from '/' to '/home'*/
			}
			this.props.history.push('/home');
			window.location.reload();
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//check the username are not empty
		if (this.state.username) {
			//check the password field is not empty
			if (!this.state.password) {
				this.setState({ errorMessage: 'Please enter a password' });
				return; // terminates the handle function function
			}
			//check if the passwords match
			if (this.state.password !== this.state.passwordComfirm) {
				this.setState({ errorMessage: 'The password does not match' });
			} else {
				// ready to sign up
				const user = {
					username: this.state.username,
					password: this.state.password,
				};
				axios
					.post('https://flightloggercs10.herokuapp.com/flights/users/', user)
					.then((response) => {
						// set the token to local storage
						localStorage.setItem('token', response.data.token);

						// reset the fields
						this.setState({
							username: '',
							password: '',
							passwordComfirm: '',
							errorMessage: '',
						});
						{
							/*changed.push('/') to .push('/flights')*/
						}
						this.props.history.push('/home');
						window.location.reload();
					})
					.catch((err) => {
						console.log(err);
					});
			}
		} else {
			this.setState({ errorMessage: 'Please enter a username' });
		}
	};

	render() {
		return (
			<div className="SignUp">
				{/*most likely don't need top nav in SignUp*/}
				{/*<TopHeader />*/}
				<div className="SignUp-card">
					<form onSubmit={this.handleSubmit}>
						<input
							onChange={this.handleChange}
							value={this.state.username}
							name="username"
							type="text"
							className="form-control"
							placeholder="Username"
						/>

						<input
							onChange={this.handleChange}
							value={this.state.password}
							name="password"
							type="password"
							className="form-control"
							placeholder="password"
						/>

						<input
							onChange={this.handleChange}
							value={this.state.passwordComfirm}
							name="passwordComfirm"
							type="password"
							className="form-control"
							placeholder="confirm password"
						/>

						<button>Sign Up</button>
						<div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
					</form>
					<Link className="SignUp-right" to={'/SignIn'}>
						LogIn
					</Link>
				</div>
			</div>
		);
	}
}

SignUp.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	passwordComfirm: PropTypes.string,
};

export default SignUp;
