import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function SideBar() {

    nav  = useNavigate()

    const LogoutFunc = () =>{
        sessionStorage.clear()
        nav('/')
    }
    
    const [RawData,SetRawData] = useState({})

    useEffect(()=>{
        if("_auth" in sessionStorage){
            let raw_data = jwt_decode(sessionStorage.getItem('_auth'))
            SetRawData(raw_data)
        }
    },[])
    

    return (
        <nav className="container navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SJC</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown dropdown-sm">
                            <img width={50} src={RawData?.picture} className="nav-link dropdown-toggle rounded-circle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a onClick={LogoutFunc} className="dropdown-item" href="#">Log Out<i class="fa-solid fa-power-off mx-3"></i></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
