import React,{useEffect, useState} from 'react'
import Button from "@mui/material/Button"
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditBook() {

  const nav = useNavigate()

  var book_id = useParams();

  const [ButtonStat,SetButtonStat] = useState(false);

  const [SingleBookData,SetSingleBookData] = useState()

  const SingleBook =  async() =>{
   await axios.get(`http://127.0.0.1:8000/book/${book_id["id"]}`)
   .then(async (res)=>{
    SetSingleBookData(res.data)
    console.log("Req Sent")
   })
  }
 
  const EditBookData = useFormik({
    initialValues:{

    }
  })

  const UpdateBook = async () =>{
    if(EditBookData.values.title || EditBookData.values.isbn || EditBookData.values.author  ||EditBookData.values.publisher )
    {
      await axios.put(`http://127.0.0.1:8000/book/update/${SingleBookData._id}`,EditBookData.values)
      .then((res)=>{
        Swal.fire({
          title:"Update Success",
          text:"Book Data Updated Successfully!",
          icon:"success"
        })
      })
    SetButtonStat(true)
    nav("/home")
    }
    else{
      Swal.fire({
        title:"Data Not Updated !",
        text:"Nothing Changed !",
        icon:"warning"
      })
    SetButtonStat(true)
    nav("/home")
    }
    
  }

  useEffect(()=>{
    SingleBook()
  },[])

  const SubmitHandler = (e) =>{
    e.preventDefault()
    UpdateBook()
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
