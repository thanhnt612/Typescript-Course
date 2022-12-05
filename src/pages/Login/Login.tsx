import React from 'react'
import {useFormik,FormikProps} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { loginApi } from '../../redux/reducer/userReducer';

type Props = {}

export type UserLogin = {email:string,password:string}
export default function Login({}: Props) {

  const dispatch:DispatchType = useDispatch();
  const frm:FormikProps<UserLogin> = useFormik<UserLogin>({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:Yup.object().shape({
      email:Yup.string().required('email is invalid'),
      password:Yup.string().required('password is invalid'),
    }),
    onSubmit:(values:UserLogin) => {
      const action = loginApi(values);
      dispatch(action);
    }
  });

  return (
    <form className='container' onSubmit={frm.handleSubmit}>
      <h3>Login</h3>
      <div className='form-group'>
        <p>username</p>
        <input className='form-control' name="email" onBlur={frm.handleBlur} onChange={frm.handleChange} />
        {frm.errors.email && <div className="text text-danger">{frm.errors.email}</div>}
      </div>
      <div className='form-group'>
        <p>password</p>
        <input className='form-control' name="password" type="password" onBlur={frm.handleBlur} onChange={frm.handleChange} />
        {frm.errors.password && <div className="text text-danger">{frm.errors.password}</div>}
      </div>
      <div className='form-group'>
        <button className='btn btn-success' type='submit'>Submit</button>
      </div>
    </form>
  )
}