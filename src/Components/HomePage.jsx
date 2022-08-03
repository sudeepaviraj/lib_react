import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function HomePage(props) {
    const [Books,SetBooks] = useState([])
    const locate = useLocation();
    sessionStorage.setItem("login_stat",locate.state.login_stat);
    (async () =>{
        await axios.get("http://127.0.0.1:8000/books")
        .then((res)=>{
            SetBooks(res.data.allbooks[0])
            console.log(Books.length)
        });
    })()
  return (
    
    <React.Fragment>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-4'>
                    <div className='d-flex-row profile-card border p-3'>
                        <div className='d-flex justify-content-center'>
                            <img alt='user_logo' src='https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' width={150} className='rounded rounded-circle'/>
                        </div>
                        <div className='d-flex justify-content-between mt-3'>
                        <p className='text-start'>Name</p>
                        <p className='text-end'>:</p>
                        <p className='text-end'>{JSON.parse(sessionStorage.getItem('login_info'))['name']}</p>
                        </div>
                        <div className='d-flex justify-content-between my-2'>
                        <p className='text-start'>User Name</p>
                        <p className='text-end'>:</p>
                        <p className='text-end'>{JSON.parse(sessionStorage.getItem('login_info'))['username']}</p>
                        </div>
                        <div className='d-flex justify-content-between my-2'>
                        <p className='text-start'>Email</p>
                        <p className='text-end'>:</p>
                        <p className='text-end'>{JSON.parse(sessionStorage.getItem('login_info'))['email']}</p>
                        </div>
                        <Button fullWidth type='submit' onClick={()=>{sessionStorage.removeItem('login_stat')}} variant="outlined">LogOut</Button>
                    </div>
                </div>
                <div className='col-8'>
                    <div>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Books.length>0 &&
                            Books.map((book)=>{
                                return(
                                    <tr>
                                        <td>{book.isbn}</td>
                                        <td>{book.name}</td>
                                        <td>{book.name}</td>
                                    </tr>
                                    )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>

  )
}
