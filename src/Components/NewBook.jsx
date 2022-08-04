import React from 'react'
import Button from "@mui/material/Button"
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function NewBook() {

  const NewBookData = useFormik({
    initialValues:{
      title:null,
      author:null,
      isbn:null,
      publisher:null
    }
  })

  const SaveBook = async() =>{
    axios.post("https://peaceful-woodland-66033.herokuapp.com/book/save",NewBookData.values)
    .then((res)=>{
      if(res.data.status){
        Swal.fire({
          title:"Success !",
          text:res.data.msg,
          icon:"success"
        })
        NewBookData.values=null;
      }
    })
    .catch((err)=>{
      if(err){
        Swal.fire({
          title:"Failed !",
          text:"Book Not Added!",
          icon:"error",
          footer:err
        })
      }
    })
  }

  const SubmitHandler = (e) =>{
    e.preventDefault()
    SaveBook()
    e.target.reset()
  }

  return (
    <React.Fragment>

        <div className="container mt-5">
            <div className="form-group d-flex justify-content-center">
                <div className="col-4">
                <form onSubmit={SubmitHandler}>
                  <h3 className='text-center'>Create A New Book</h3>
                <TextField onChange={NewBookData.handleChange} fullWidth className='text_input my-2' name='title' label={"Book Name"}/>
                <br/>
                <TextField onChange={NewBookData.handleChange} fullWidth className='text_input my-2' name='isbn' label={"Book ISBN"}/>
                <br/>
                <TextField onChange={NewBookData.handleChange} fullWidth className='text_input my-2' name='author' label={"Book Author"}/>
                <br/>
                <TextField onChange={NewBookData.handleChange} fullWidth className='text_input my-2' name='publisher' label={"Book Publisher"}/>
                <br/>
                <div className='d-flex justify-content-center'>
                <Button variant="outlined" type="submit" className="">Submit</Button>
                </div>
                </form>
                </div>
            </div>
        </div>

    </React.Fragment>
  )
}
