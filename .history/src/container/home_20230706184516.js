import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {

	let[userLogin , setUserLogin] = useState();
	//userLogin
    useEffect(()=>{
        const getUserLogin = () => {
            let userID = sessionStorage.getItem('user');
            console.log(userID);
            if(userID){
                fetch("http://localhost:3001/users/"+userID,{
                    method : "GET",
                    headers : {"Content-type" : "application/json"},
                }).then(async(res)=>{
                    let userRecord = await res.json();
					toast("getting user record");
                    setUserLogin(userRecord);
                }).catch((err)=>{
                    toast.warning(err.message);
                })
            }
        }
        getUserLogin();
    },[setUserLogin])
   

	//get all post
	let[post,setPost] = useState();
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


	let[like,setLike] = useState(false);// by default false
	const likePost = () => {
		setLike(!like);//value is true
		// console.log(!like);
		(!like ? toast.success("Post Liked") :
		toast.warning("Post Unliked."))
	}


	return (
		<>
			<div className="container py-5" style={{ "paddingLeft": "400px" }}>

				{/* story  */}

				<div className="row">
					<div className="story mx-3">
						<div className="image">
							{userLogin ? <img src={userLogin.dp} /> :
							<img src="" />
							}
							
							</div>
						<div className="content py-2">
							{ userLogin ? 
								<small className="">{userLogin.username}</small> 
								: 
								<small className="text-center">user</small>
							}
						</div>
					</div>
				</div><br /><br /><hr />

				{/* post  */}

				<div className="row py-5">
					{post && post.map((value,index)=>{
						return(
							<div className="post">
						<div className="d-flex align-middle">
							<div className="story-post">
								<div className="image"><img src={value.userProfile} /></div>
							</div>
							<div className="post-content pt-2 px-3">
								<h5>{value.username}
								</h5>
							</div>
						</div>
						<div className="post-img py-4">
							<img src={value.image} width="500px" className="rounded-1" />
						</div>
						<div className="buttons py-2">
							<i className={like ? 'fa-solid fa-heart fs-4 px-2' : 'fa-regular fa-heart fs-4 px-2'} onClick={()=>likePost()}></i>
							<i className="fa-regular fa-comment fs-4 px-2"></i>
						</div>
						<div className="description">
							<p className="pt-2 ps-2">{value.caption}</p>
						</div>
						<input className="p-1" type="text" placeholder="Add a comment...." style={{"background" : "transparent" , "border" : "none"}} /><br/><br/>
							</div>
						)
					})}
				</div>
			</div>
			<ToastContainer/>
		</>
	)
}