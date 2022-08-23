import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'

export default function HomePage2() {

    const [BookData,SetBookData] = useState([])

    const BookDataReq = async () =>{
        await axios.get("http://127.0.0.1:8000/books",{headers:{
            'x-auth_token':"Sudeepa"
        }}).then((res)=>{
            SetBookData(res.data.allbooks)
            console.log(res.data.allbooks);
        })
    } 

    useEffect(()=>{
        BookDataReq()
    },[])

    const Delete = (id) => {
        alert(`Are You Sure Wanna Delete ${id}`)
    }

    const cols = [{
        name:"Book Name",
        selector:row=>row.title
    },
    {
        name:"Book Author",
        selector:row=>row.author
    },
    {
        name:"Book ISBN",
        selector:row=>row.isbn
    },
    {
        name:"Actions",
        selector:row=>row.isbn
    },
    {
        name: 'Actions',
		button: true,
		cell: row => (
        <React.Fragment>
        <button className='btn btn-sm btn-primary mx-2' onClick={()=>{}}>
            <i className="fa-solid fa-pencil"></i>
        </button>
        <button className='btn btn-sm btn-danger' onClick={()=>{Delete(row._id)}}>
            <i className="fa-solid fa-trash"></i>
        </button>
        </React.Fragment>
        )
    }
]

    let FilterdBook = []

    const filtertext = (e) =>{
        BookData.filter((book)=>{
            if(book.title.includes(e.target.value)){
                FilterdBook = [...FilterdBook,book]
                return book
            }
        })
        console.log(FilterdBook);
    }
  return (
    <React.Fragment>
        <DataTable columns={cols} data={BookData}/>
        <input type={'text'} onChange={filtertext} />
    </React.Fragment>
  )
}

