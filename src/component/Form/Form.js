import React from 'react';
import { Field, Form, withFormik } from 'formik';
import Yup from 'yup';
import * as firebase from 'firebase';

import './Form.css';

class FormLogin extends React.Component {
  state = {
    mode: 'login'
  }
  changeModeHandler = () => {
    let mode = this.state.mode === 'login' ? 'signUp' : 'login'
    this.setState({
      mode
    })
  }
  render() {
    let confirmPass = <div>
      {this.props.touched.confirmPassword && this.props.errors.confirmPassword && <p>{this.props.errors.confirmPassword}</p>}
      <Field type='password' name='confirmPassword' placeholder='Confirm Password' />
    </div>
    return (
      <div className='AppForm'>
        <Form className='Form' >
          <div>
            {this.props.touched.email && this.props.errors.email && <p>{this.props.errors.email}</p>}
            <Field type='email' name='email' placeholder='Email' />
          </div>
          <div>
            {this.props.touched.password && this.props.errors.password && <p>{this.props.errors.password}</p>}
            <Field type='password' name='password' placeholder='Password' />
          </div>
          {this.state.mode === 'signUp' ? confirmPass : null}
          <button disabled={this.props.isSubmitting}>{this.state.mode === 'login' ? 'Login' : 'Sign Up'}</button>
          <button type='button' onClick={this.changeModeHandler} >Switch to {this.state.mode === 'login' ? 'Sign Up' : 'Login'}</button>
        </Form>
      </div>
    )
  }
}
Yup.addMethod(Yup.mixed, 'sameAs', function (ref, message) {
  return this.test('sameAs', message, function (value) {
    const other = this.resolve(ref);
    return !other || !value || value === other;
  })
})

const FormikApp = withFormik({
  mapPropsToValues({ email, password, confirmPassword }) {
    return {
      email: email || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required'),
    confirmPassword: Yup.string().sameAs(Yup.ref('password'), "Password doesn't match")
  }),



  handleSubmit(values, { resetForm, setErrors, setFieldError, setSubmitting }) {
    const auth = firebase.auth();

    if (values.confirmPassword) {
      auth.createUserWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          resetForm();
          setSubmitting(false);
          console.log('Submitted', res);
        })
        .catch((e) => {
          console.log(e);
          setFieldError('email', e.message);
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
        });
    }


  }
})(FormLogin);

export default FormikApp;
