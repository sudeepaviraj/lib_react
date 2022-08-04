import React,{useEffect, useState} from 'react'
import Button from "@mui/material/Button"
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

export default function EditBook() {

  var book_id = useParams();

  const [ButtonStat,SetButtonStat] = useState(false);

  const [SingleBookData,SetSingleBookData] = useState()

  const SingleBook =  async() =>{
   await axios.get(`https://peaceful-woodland-66033.herokuapp.com/book/${book_id["id"]}`)
   .then(async (res)=>{
    SetSingleBookData(res.data)
   })
  }
  
  const EditBookData = useFormik({
    initialValues:{
      title:null,
      author:null,
      isbn:null,
      publisher:null
    }
  })

  const UpdateBook = () =>{
    SetButtonStat(true)
  }

  useEffect(()=>{
    SingleBook()

  },[SingleBookData])

  const SubmitHandler = (e) =>{
    e.preventDefault()
    UpdateBook()
    SetSingleBookData()
  }

  return (
    <React.Fragment>

        <div className="container mt-5">
          { SingleBookData &&
            <div className="form-group d-flex justify-content-center">
                <div className="col-4">
                <form onSubmit={SubmitHandler}>
                  <h3 className='text-center'>Edit Exiting Book</h3>
                <TextField defaultValue={SingleBookData.title} onChange={EditBookData.handleChange} fullWidth className='text_input my-2' name='title' label={"Book Name"}/>
                <br/>
                <TextField defaultValue={SingleBookData.isbn} onChange={EditBookData.handleChange} fullWidth className='text_input my-2' name='isbn' label={"Book ISBN"}/>
                <br/>
                <TextField defaultValue={SingleBookData.author} onChange={EditBookData.handleChange} fullWidth className='text_input my-2' name='author' label={"Book Author"}/>
                <br/>
                <TextField defaultValue={SingleBookData.publisher} onChange={EditBookData.handleChange} fullWidth className='text_input my-2' name='publisher' label={"Book Publisher"}/>
                <br/>
                <div className='d-flex justify-content-center'>
                <Button disabled={ButtonStat} variant="outlined" type="submit" className="">Submit</Button>
                </div>
                </form>
                </div>
            </div>
          } 
        </div>

    </React.Fragment>
  )
}
