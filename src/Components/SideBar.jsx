import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'


export default function SideBar() {
    
    const [RawData,SetRawData] = useState({})

    useEffect(()=>{
        if("_auth" in sessionStorage){
            let raw_data = jwt_decode(sessionStorage.getItem('_auth'))
            SetRawData(raw_data)
            console.log(RawData);
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
                        <li className="nav-item dropdown">
                            <img width={50} className="nav-link dropdown-toggle rounded-circle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
