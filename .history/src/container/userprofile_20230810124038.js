import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserProfile = () => {

    let [userLogin, setUserLogin] = useState();
    let [post, setPost] = useState();

    useEffect(() => {
        const getUserLogin = () => {
            let userID = sessionStorage.getItem('user');
            // console.log(userID);
            if (userID) {
                fetch("http://localhost:3000/users/" + userID, {
                    method: "GET",
                    headers: { "Content-type": "application/json" },
                }).then(async (res) => {
                    let userRecord = await res.json();
                    console.log(userRecord);
                    setUserLogin(userRecord);
                }).catch((err) => {
                    toast.warning(err.message);
                })
            }
        }
        getUserLogin();
    }, [setUserLogin]);

    //get post of current users only.
    useEffect(()=>{
        const getPost = () => {
            let userID = sessionStorage.getItem('user');
            // console.log(userID);
            if(userID){
                fetch("http://localhost:3001/post").then(async(res)=>{
                    let postRecord = await res.json();
                    console.log(postRecord);
                    setPost(postRecord);
                }).catch((err)=>{
                    toast.warning(err.message);
                })
            }
        }
        getPost();
    },[setPost])
    return (
        <>
            <div className="container py" style={{ "paddingLeft": "200px" }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="story-user">
                        <div className="image">
                            {userLogin ?
                                <img src={userLogin.dp} />
                                :
                                <img src="" />
                            }
                        </div>
                        {userLogin ?
                            <h5 className="mt-4 text-center">{userLogin.username}</h5>
                            :
                            <h5 className="mt-4 text-center">user</h5>}

                    </div>
                </div><br /><br />

                <div className="w-50 border border-1 my-4 border-dark border-opacity-75" style={{ "marginLeft": "300px" }}></div>
                <div className="d-flex justify-content-center py-4">
                    <p className="text-muted fs-5"><i class="fa-solid fa-list mx-2 text-dark fs-5" />All Post</p>
                </div>
                <div className="row justify-content-center align-items-center" style={{ "marginLeft": "100px" }}>
                    {post && post.filter((pv,pi)=>{
                        if(userLogin.id == pv.userID){
                            return pv;
                        }
                    }).map((value,id)=>{
                        return(
                            <div className="post-img py-4 col-4">
                                <img src={value.image} width="100%" height="100%" className="rounded-1" />
                            </div>  
                        )
                    })}
                </div>
            </div>
        </>
    )
}