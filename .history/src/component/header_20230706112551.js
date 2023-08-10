import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export const Header = () => {

    let[userLogin , setUserLogin] = useState();

    useEffect(()=>{
        const getUserLogin = () => {
            let userID = sessionStorage.getItem('user');
            // console.log(userID);
            if(userID){
                fetch("http://localhost:3001/users/"+userID,{
                    method : "GET",
                    headers : {"Content-type" : "application/json"},
                }).then(async(res)=>{
                    let userRecord = await res.json();
                    console.log(userRecord)
                    setUserLogin(userRecord);
                }).catch((err)=>{
                    toast.warning(err.message);
                })
            }
        }
        getUserLogin();
    },[setUserLogin])
   

    const signOut = () => {
        window.location = "/";
        sessionStorage.setItem('status',false);
        sessionStorage.setItem('user',"")
    }

    return (
        <>

            <div>
                {/* theme  */}
                <main className="d-flex position-fixed" style={{"flex" : "1"}}>
                    <div className="d-flex flex-column p-3 bg-light">
                        <a href="/" className="d-flex align-items-center justify-content-center mb-5 mb-md-0 me-md-auto p-4">
                            <img src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png" width="150px"/>
                        </a><br/><br/>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item fs-6 fw-bold mb-3">
                                <Link to="/home" href="#" className="nav-link text-dark" aria-current="page">
                                <i class="fa-solid fa-house mx-3 fs-4"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item fs-6 fw-normal mb-3">
                                <a href="#" className="nav-link text-dark" aria-current="page">
                                <i class="fa-solid fa-magnifying-glass mx-3 fs-4"></i>
                                    Search
                                </a>
                            </li>
                            <li className="nav-item fs-6 fw-normal mb-3">
                                <Link to="/addPost" href="#" className="nav-link text-dark" aria-current="page">
                                <i class="fa-solid fa-square-plus mx-3 fs-4"></i>
                                    Create
                                </Link>
                            </li>
                            <li className="nav-item fs-6 fw-normal mb-3">
                                <a href="#" className="nav-link text-dark" aria-current="page">
                                <i class="fa-regular fa-heart mx-3 fs-4"></i>
                                    Notifications
                                </a>
                            </li>
                            <li className="nav-item fs-6 fw-normal mb-3">
                                <a href="#" className="nav-link text-dark" aria-current="page">
                                <i class="fa-brands fa-facebook-messenger mx-3 fs-4"></i>
                                    Chat
                                </a>
                            </li>
                            <li className="nav-item fs-6 fw-normal mb-3">
                            {userLogin ? 
                            (
                                <Link to="/profile" href="#" className="nav-link text-dark" aria-current="page"><i class="fa-solid fa-user mx-3 fs-4"></i>{userLogin.fullname}</Link>
                            
                            ) : 
                            (
                                <a href="#" className="nav-link text-dark" aria-current="page"><i class="fa-solid fa-user mx-3 fs-4"></i>Profile</a>
                            
                            ) 
                            }
                            </li>
                        </ul>
                        <hr />
                        <div className="dropdown">
                            <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle text-dark" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-bars fs-4 mx-3"></i>
                                <strong>More</strong>
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="#">New Account</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a onClick={()=>signOut()} className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="b-example-divider b-example-vr" />
                </main>
            </div>
            <ToastContainer/>
        </>
    )

}