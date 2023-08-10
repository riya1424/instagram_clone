import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    let navigate = useNavigate();
    let[user , setUser] = useState({
        username : "", password : "",
    })

    const getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user , [name] : value,
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/users?username="+user.username+"&password="+user.password,{
            method : "GET",
            headers : {"Content-type" : "application/json"},
        }).then(async(res)=>{
            let record = await res.json();
            sessionStorage.setItem('status',true)
            sessionStorage.setItem("user",JSON.stringify(record[0].id));
            navigate("/home");
        }).catch((err)=>{
            toast.warning(err.message);
           navigate("/");
        })
    }

    return(
        <>
        <div className="container py">
            <div className="login-title text-center">
            </div>
            <div className="">
                <div className="login-form row justify-content-center">
                    <form className="col-4  border border-dark border-2 p-5 border-opacity-25 border-radius-5" method="post" onSubmit={(e)=>submitForm(e)}>
                        <div className="d-flex justify-content-center">
                            <img src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.png" width="150px" />
                        </div>
                       <div className="form-group mt-5 mb-4">
                            <input type="text" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" onChange={(e)=>getInputValue(e)}/>
                        </div>
                        <div className="form-group mb-4">
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>getInputValue(e)}/>
                        </div>
                        <button className="btn btn-primary w-100">Login</button><br/><br/><hr/><br/>
                        <p className="text-center text-muted">Don't have an account?<Link to="/signup" className="mx-1 fw-semibold"> Sign Up</Link></p>
                    </form>

                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
    )
}