import React, { useState , useEffect} from 'react'
import { Button } from '@mui/material'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


export default function HomePage(props) {
    const [Books,SetBooks] = useState([])
    //const locate = useLocation();
    let nav = useNavigate();
    const [Load,IsLoaded] = useState(true);
    const GetBooks = async () => {
        await axios.get("http://127.0.0.1:8000/books",{headers:{
            'x-auth_token':"Sudeepa"
        }})
        .then(async(res)=>{
            SetBooks(res.data.allbooks)
        })
        IsLoaded(false)
    }
    useEffect(() => {
    if(!"auth" in sessionStorage){
        alert("auth Failed")
    }
    GetBooks()
    },[])

    const DeleteSelected = async (id) => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/book/delete/${id}`)
              Swal.fire(
                'Deleted!',
                'Your record has been deleted.',
                'success'
              )
              GetBooks()
            }
          })
    }

    const Logout = () => {
        sessionStorage.clear()
        nav("/")
    }
    if(!("auth" in sessionStorage)){
        nav("/")
    }

    if("auth" in sessionStorage){
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
                        <p className='text-end'>{JSON.parse(sessionStorage.getItem('ref'))['name']}</p>
                        </div>
                        <div className='d-flex justify-content-between my-2'>
                        <p className='text-start'>User Name</p>
                        <p className='text-end'>:</p>
                        <p className='text-end'>{JSON.parse(sessionStorage.getItem('ref'))['username']}</p>
                        </div>
                        <div className='d-flex justify-content-between my-2'>
                        <p className='text-start'>Email</p>
                        <p className='text-end'>:</p>
                        <p className='text-end'>{JSON.parse(sessionStorage.getItem('ref'))['email']}</p>
                        </div>
                        <Button fullWidth type='submit' onClick={Logout} variant="outlined">LogOut</Button>
                    </div>
                </div>

                {Load &&
                <div className='container d-flex justify-content-center my-2'>
                    <div className=''>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className='' >Waiting For Network...</span>
                    </div>
                </div> 
                }
                
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
                            {Books?.length>0 &&
                            Books?.map((book,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>
                                            <Link to={"/edit/"+book._id} className='btn btn-sm btn-primary'>
                                            <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <button onClick={()=>DeleteSelected(book._id)} className='mx-2 btn btn-sm btn-danger'>
                                            <i className="fa-solid fa-trash"></i>
                                            </button>
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
    )
    }
    }
