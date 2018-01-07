import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, Form } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { TextField } from './../form/form';
import { email as validEmail, required } from './../form/validators';
import { userLogin } from './_actions/userActions';

class UserLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();

    const email = this.props.userLoginForm.values.email;
    const password = this.props.userLoginForm.values.password;
    this.props.userLogin(email, password);
  }

  form() {
    return (
      <Form onSubmit={this.formSubmit}>
        <h3>User Login</h3>
        qwe@qwe.qwe
        <Field
          name="email"
          type="text"
          placeholder="Email"
          component={TextField}
          validate={[required, validEmail]}
        />

        <Field
          placeholder="Password"
          name="password"
          component={TextField}
          type="password"
          validate={[required]}
        />

        <Button
          type="submit"
          color="primary"
          disabled={this.props.userLoginForm && {}.hasOwnProperty.call(this.props.userLoginForm, 'syncErrors')}
          value="Register"
        >Login
        </Button>
      </Form>
    );
  }

  insteadForm() {
    return (
      <span>User already logged</span>
    );
  }

  render() {
    return (
      <div>
        {_.isEmpty(this.props.userInfo)
          ? this.form()
          : this.insteadForm()
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLoginForm: state.form.userLogin,
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = dispatch => ({
  userLogin: (email, password) => dispatch(userLogin(email, password)),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'userLogin' }),
)(UserLoginForm);
