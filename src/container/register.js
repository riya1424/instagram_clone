import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const Register = () => {

    let navigate = useNavigate();
    let[signup , setSignup] = useState({
        fullname : "", username : "", email : "", password : "", dp : ""
    })

    const getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSignup({
            ...signup , [name] : value,
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(signup);
        fetch("http://localhost:3000/users",{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(signup),
        }).then(async(res)=>{
            let record = await res.json();
            setSignup(record);
            toast("Registered Successfully..");
            setSignup({
                fullname : "", username : "", email : "", password : "",
            })
            navigate("/");
        }).catch((err)=>{
            toast.error(err.message);
        })
    }

    return(
        <>
        <div className="container py">
            <div className="login-title text-center">
            <h2 className="fw-bold pb-5 text-dark">Register Yourself</h2>
            </div>
            <div>
                <div className="row justify-content-center">
                    <form className="col-4  border border-dark border-2 p-5 border-opacity-25 border-radius-5" method="post" onSubmit={(e)=>submitForm(e)}>
                        <div className="d-flex justify-content-center">
                            <img alt="logo" src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png" width="150px" />
                        </div>
                        <div className="form-group mt-5 mb-4">
                            <input type="email" name="email" value={signup.email} className="form-control" placeholder="Mobile Phone or Email" onChange={(e)=>getInputValue(e)}/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="text" name="fullname" value={signup.fullname} className="form-control" placeholder="Full Name" onChange={(e)=>getInputValue(e)}/>
                        </div>
                        <div>
                            <input type="text" name="dp" value={signup.dp} className="form-control" placeholder="Profile Photo" onChange={(e)=>getInputValue(e)}/>
                        </div>
                       <div className="form-group mb-4">
                            <input type="text" name="username" value={signup.username} className="form-control" placeholder="Username" onChange={(e)=>getInputValue(e)}/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="password" name="password" value={signup.password} className="form-control" placeholder="Password" onChange={(e)=>getInputValue(e)}/>
                        </div>
                        <button className="btn btn-primary w-100">Register</button>
                    </form>

                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
    )
}