import React, { Component, useContext, useState } from 'react'
import Backdrop from '../Navbar/Backdrop/Backdrop.js'
import './PostForm.css'
import { AuthContext } from '../../Context/AuthContext.js';
import { PostContext } from '../../Context/PostContext.js';
import axios from 'axios'
const PostForm = (props) => {

    const [authState,changeAuthState]=useState(AuthContext);
    
    const [PostState, setPostState] = useState(
        {
            Author: '',
            Text: '',
            Image: ''
        })


    const changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const { Author, Text, Image } = PostState;
        setPostState({
            Author, Image, [name]: e.target.value
        })

    }
    const fileSelectedHandler = (e) => {
        const { name, value } = e.target;
        const { Author, Text, Image } = PostState;
        setPostState({
            Author, Text, [name]: e.target.files[0]
        })
    }
    const SubmitHandler = (e) => {
        e.preventDefault()
        
        const obj = new FormData()
        obj.append('postImage',PostState.Image,PostState.Image.name)
        obj.append('Author',PostState.Author)
        obj.append('Content',PostState.Text)
        obj.append('Id', authState.Id)
        obj.append('Name', authState.Name)
        obj.append('Date', new Date().toLocaleDateString())
        console.log(PostState.Image)
        console.log(PostState.Text)
        axios.post('http://192.168.43.60:8080/posts/create_post',obj).then(res=>{
        props.history.push("/");
    }).catch(err=>{
        alert("something went wrong")
    })

    }
    let wrapper = "postform-wrapper";
    let postwrapper = "postwrapper";
    let Back
    const [On, setOn] = useContext(PostContext)
    const backDropHandler = (e) => {
        setOn(!On)
    }
    if (On) {
        postwrapper = "postwrapper open"
        wrapper = "postform-wrapper open"
        Back = <Backdrop backdrophandler={backDropHandler} />
    }
    return (
        <React.Fragment>

            <div className={postwrapper}>
                <div className={wrapper} >
                    <h1>Create Post</h1>
                    <form onSubmit={SubmitHandler}>
                        <textarea className="form-control" name="Text" rows="5" placeholder="Enter Text Here.. " value={PostState.Text} onChange={changeHandler}></textarea>
                        <input type='file' name="Image" onChange={fileSelectedHandler} className="form-control my-2" />
                        <button type="submit" className="btn btn-primary">Post</button>
                    </form>
                </div>
            </div>
            {Back}

        </React.Fragment>


    )
}
export default PostForm
