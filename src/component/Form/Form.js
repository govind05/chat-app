import React from 'react';
import { Field, Form, withFormik } from 'formik';
import Yup from 'yup';
import * as firebase from 'firebase';

import './Form.css';

class FormLogin extends React.Component {
  state = {
    mode: 'login'
  }

  //For auto signin.
  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.props.history.push('/chat');
      }
    })
  }
  //Changing login to signup and vice versa.
  changeModeHandler = () => {
    let mode = this.state.mode === 'login' ? 'signUp' : 'login'
    this.setState({
      mode
    })
  }

  render() {
    let confirmPass = <div className='Input'>
      <Field type='password' name='confirmPassword' placeholder='Confirm Password' />
      {this.props.touched.confirmPassword && this.props.errors.confirmPassword && <p>{this.props.errors.confirmPassword}</p>}
    </div>
    return (
      <div className='AppForm'>
        <Form className='Form' >
          <div className='Error'>
            <Field type='hidden' name='error' />
            {this.props.errors.error && <p>{this.props.errors.error}</p>}
          </div>
          <Field type='hidden' value={this.state.mode} name='mode' />
          <div className='Input'>
            <Field type='email' name='email' placeholder='Email' autoFocus />
            {this.props.touched.email && this.props.errors.email && <p>{this.props.errors.email}</p>}
          </div>
          <div className='Input'>
            <Field type='password' name='password' placeholder='Password' />
            {this.props.touched.password && this.props.errors.password && <p>{this.props.errors.password}</p>}
          </div>
          {this.state.mode === 'signUp' ? confirmPass : null}
          <button disabled={this.props.isSubmitting}>{this.state.mode === 'login' ? 'Login' : 'Sign Up'}</button>
          <button type='button' onClick={this.changeModeHandler} >Switch to {this.state.mode === 'login' ? 'Sign Up' : 'Login'}</button>
        </Form>
      </div>
    )
  }
}
//A custom Yup check method for confirm password to be equal to password.
Yup.addMethod(Yup.mixed, 'sameAs', function (ref, message) {
  return this.test('sameAs', message, function (value) {
    const other = this.resolve(ref);
    return !other || !value || value === other;
  })
})

//Adding formik to the form.
const FormikApp = withFormik({
  //Mapping user input to values.
  mapPropsToValues({ email, password, confirmPassword, mode }) {
    console.log(mode)
    return {
      email: email || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
      mode: mode || '',
    }
  },
  //Validation schema for the form.
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required'),
    confirmPassword: Yup.string().sameAs(Yup.ref('password'), "Password doesn't match")
  }),

  // Handling the login or Signup event.
  handleSubmit(values, { resetForm, setErrors, setFieldError, setSubmitting }) {
    const auth = firebase.auth();
    console.log(values.mode)
    if (values.confirmPassword) {
      auth.createUserWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          resetForm();
          setSubmitting(false);
          console.log('Submitted', res);
        })
        .catch((e) => {
          values.confirmPassword = '';
          console.log(e);
          setFieldError('error', e.message);
          setSubmitting(false);
        });
    } else {
      auth.signInWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          resetForm();
          setSubmitting(false);
          console.log('Submitted', res);
        })
        .catch((e) => {
          console.log(e)
          setSubmitting(false);
          setFieldError('error', e.message);
        });
    }
  }
})(FormLogin);

export default FormikApp;
