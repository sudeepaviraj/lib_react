import React from 'react'
import { TextField, Button } from '@mui/material'
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'


export default function LoginForm(props) {

  const handleFalure = (res) =>{
    console.log(res)
  } 

  const handleLogin = (data) => {
    console.log(data);
    let user = jwt_decode(data.credential)
    console.log(user)
  }

  useEffect(()=>{
    /*global google*/
    google.accounts.id.initialize({
      client_id:"138417375141-g2t8me114h04cjh90n1tjtf02phsou6e.apps.googleusercontent.com",
      callback:handleLogin
    })
    google.accounts.id.renderButton(
      document.getElementById("butt"),
      {theme:"outline"}
    )
  },[])

  return (
    <React.Fragment>
      <div className='container my-5'>
        <div className='d-flex justify-content-center form-group'>
          <div className=' border rounded rounded-lg p-5'>
            <form className='justify-content-center' onSubmit={props.butt}>
              <h3 className='text-center'>Login</h3>
              <div className='d-flex justify-content-center my-3'>
                <img alt='user_logo' src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' width={100} />
              </div>
              <TextField required={true} onChange={props.form.handleChange} name='username' margin='dense' fullWidth id="username" label="Username" variant="outlined" />
              <TextField required={true} onChange={props.form.handleChange} type={"password"} name="pass" margin='dense' fullWidth id="password" label="Password" variant="outlined" />
              <div className='d-flex justify-content-center my-2'>
                <Button disabled={props.stat} type='submit' variant="outlined">Login</Button>
              </div>
              <div id='butt' className='d-flex justify-content-center my-2'>

              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
