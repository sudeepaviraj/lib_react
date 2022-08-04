import React, { useState , useEffect} from 'react'
import { Button } from '@mui/material'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'

export default function HomePage(props) {
    const [Books,SetBooks] = useState([])
    const locate = useLocation();
    if("login_stat" in sessionStorage){
        if (locate.state.login_stat === true){
            sessionStorage.setItem("login_stat",locate.state.login_stat);
        }
    }
    const GetBooks = async () => {
        await axios.get("https://peaceful-woodland-66033.herokuapp.com/books")
        .then(async(res)=>{
            SetBooks(res.data.allbooks)
            
        })
    }
    useEffect(() => {
      GetBooks()
      console.log(Books)
    }, [])
  return (
    
    <React.Fragment>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-lg-4'>
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
                <div className='col-lg-8 my-2'>
                    <div>
                        <Link to={"/new"}>
                        <button className='btn btn-sm btn-success'>
                        <i className="fa-solid fa-circle-plus"></i>
                        </button>
                        </Link>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Books.length>0 &&
                            Books.map((book,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>
                                            <Link to={"/edit/"+book._id} className='btn btn-sm btn-primary'>
                                            <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <a href='/' className='mx-2 btn btn-sm btn-danger'>
                                            <i className="fa-solid fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>

  )}