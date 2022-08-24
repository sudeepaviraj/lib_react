import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'

export default function HomePage2() {

    const [BookData, SetBookData] = useState([])

    const BookDataReq = async () => {
        await axios.get("http://127.0.0.1:8000/books", {
            headers: {
                'x-auth_token': "Sudeepa"
            }
        }).then((res) => {
            SetBookData(res.data.allbooks)
            console.log(res.data.allbooks);
        })
    }

    useEffect(() => {
        BookDataReq()
    }, [])

    const cols = [{
        name: "Book Name",
        selector: row => row.title
    },
    {
        name: "Book Author",
        selector: row => row.author
    },
    {
        name: "Book ISBN",
        selector: row => row.isbn
    },
    {
        name: 'Actions',
        button: true,
        cell: row => (
            <React.Fragment>
                <button className='btn btn-sm btn-primary mx-2' onClick={() => { EditBook(row) }}>
                    <i className="fa-solid fa-pencil"></i>
                </button>
                <button className='btn btn-sm btn-danger' onClick={() => { DeleteAction(row) }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </React.Fragment>
        )
    }
    ]

    const DeleteAction = (row) => {
        Swal.fire({
            title: `Are You Sure Wanna Delete ${row.title}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Deleted");
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const EditBook = async (row) => {
        const { value: formValues } = await Swal.fire({
            title: `Edit ${row.title}`,
            html:
                `<input id="swal-input1" class=" my-2 form-control" value="${row.title}">` +
                `<input id="swal-input2" class=" my-2 form-control" value="${row.author}">` +
                `<input id="swal-input3" class=" my-2 form-control" value="${row.isbn}">`,
            focusConfirm: false,
            preConfirm: () => {
                const dataSet = {
                    title: document.getElementById('swal-input1').value,
                    author: document.getElementById('swal-input2').value,
                    isbn: document.getElementById('swal-input3').value
                }
                return dataSet
            }
        })

        if (formValues.title !== row.title || formValues.author !== row.author || formValues.isbn != row.isbn) {
            Swal.fire({
                title:"Updated !",
                text:"Data Updated Successfully !",
                icon:'success'
            })
            console.log(formValues,row);
        }
    }

    const CreateBook = async () => {
        const { value: formValues } = await Swal.fire({
            title: `Create A New Book`,
            html:
                `<input id="swal-input1" class=" my-2 form-control" placeholder="Book Name" >` +
                `<input id="swal-input2" class=" my-2 form-control" placeholder="Book Author" >` +
                `<input id="swal-input3" class=" my-2 form-control" placeholder="Book ISBN" >`,
            focusConfirm: false,
            preConfirm: () => {
                const dataSet = {
                    title: document.getElementById('swal-input1').value,
                    author: document.getElementById('swal-input2').value,
                    isbn: document.getElementById('swal-input3').value
                }
                return dataSet
            }
        })

        if (formValues.title !== '' && formValues.author !== '' && formValues.isbn !== '') {
            Swal.fire({
                title:"Saved !",
                text:"Data Saved Successfully !",
                icon:'success'
            })
        }
        else{
            Swal.fire({
                title:"Data Not Saved !",
                text:"Data Not Inserted !",
                icon:'warning'
            })
        }
    }

    let FilterdBook = []

    const filtertext = (e) => {
        if (e.target.value.length >= 3) {
            BookData.filter((book) => {
                if (book.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                    if (!FilterdBook.includes(book)) {
                        FilterdBook = [...FilterdBook, book]
                        console.log(FilterdBook);
                    }
                }
                SetBookData(FilterdBook)
                return FilterdBook
            })
        }
        else {
            BookDataReq()
        }
    }
    return (
        <React.Fragment>
            <div className='container my-2'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <button onClick={CreateBook} className='btn btn-sm btn-success'>
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                    <div className="input-group mb-3 w-25">
                        <input type="text" className="form-control" onChange={filtertext} placeholder="Search By Name..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                    </div>
                </div>
                <DataTable columns={cols} data={BookData} />
            </div>
        </React.Fragment>
    )
}

