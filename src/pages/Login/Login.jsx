import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup ,login} from '../../config/firebase'

const Login = () => {

   const [currState,setCurrentState]=useState('Sign Up');
   const [userName,setUserName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');

   const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (currState === 'Sign Up') {
      await signup(userName, email, password);
    } else {
      await login(email, password);
    }
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className='login'>
      <img src={assets.logo_big} alt='' className='logo'/>
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState==='Sign Up'? <input onChange={(e)=>setUserName(e.target.value)} value={userName} type='text' placeholder='username' className='form-input' required />:null }
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' placeholder='Email Address' className='form-input'required/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='password' className='form-input'required/>
        <button type='submit'>{currState==='Sign Up'?'Create account':'Login now'}</button>
        <div className="login-term">
          <input type='checkbox'/>
          <p>Agree to the terms and policy.</p>
        </div>
        <div className="login-forgot">
          {
            currState==='Sign Up'
            ?<p className='login-toggle'>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>
            :<p className='login-toggle'>Create an account? <span onClick={()=>setCurrentState('Sign Up')}>click here</span></p>

          }
          
        </div>
      </form>

    </div>
  )
}

export default Login