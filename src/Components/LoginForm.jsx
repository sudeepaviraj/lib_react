import React from 'react'
import { TextField, Button } from '@mui/material'

export default function LoginForm(props) {

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
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
