//show dp of user who created post
//userprofile - show all post of current user

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const AddPost = () => {

    let [post, setPost] = useState({
        userID: "",userProfile : "",username:"", image: "", caption: "",
    });
    let [user, setUser] = useState();

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:3001/users").then(async (res) => {
                let userRecord = await res.json();
                setUser(userRecord);
                toast("Getting user record..")
            }).catch((err) => {
                toast.error(err);
            })
        }
        getUser();
    }, [setUser]);

    const getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPost({
            ...post, [name]: value,
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(post);
        fetch("http://localhost:3001/post", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(post),
        }).then(async (res) => {
            let postData = await res.json();
            setPost(postData);
            toast("Post Created Successfully..");
            setPost({
                userID: "", image: "", caption: "",
            })
        }).catch((err) => {
            toast.error(err.message);
        })

    }

    return (
        <>
            <div className="container py">
                <div className="login-title text-center">

                </div>
                <div>
                    <div className="row justify-content-center">
                        <form className="col-4  border border-dark border-2 p-5 border-opacity-25 border-radius-5" method="post" onSubmit={(e) => submitForm(e)}>
                            <h2 className="fw-bold text-dark text-center">Add Post</h2>
                            <div className="form-group mt-5 mb-4">
                                <select class="form-control" name="userID" id="input-select" onChange={(e) => getInputValue(e)}>
                                    <option>--Select User--</option>
                                    {user && user.map((value, index) => {
                                        return (
                                            <option value={value.id}>{value.username}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {/* //for profile photo : same as subcategory data. */}
                            <div className="form-group mb-4">
                                <input type="text" name="userprofile" value={post.userProfile} className="form-control" placeholder="Userprofile" onChange={(e) => getInputValue(e)} />
                            </div>
                            <div className="form-group mb-4">
                                <input type="text" name="username" value={post.username} className="form-control" placeholder="Username" onChange={(e) => getInputValue(e)} />
                            </div>
                            <div className="form-group mb-4">
                                <input type="text" name="image" value={post.image} className="form-control" placeholder="Image" onChange={(e) => getInputValue(e)} />
                            </div>
                            <div className="form-group mb-4">
                                <input type="text" name="caption" value={post.caption} className="form-control" placeholder="Caption" onChange={(e) => getInputValue(e)} />
                            </div>
                            <button className="btn btn-primary w-100"><i className="fa-solid fa-plus mx-2"></i>Create Post</button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}