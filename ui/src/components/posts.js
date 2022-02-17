import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { format, parseISO } from "date-fns";

import PostService from "../services/post.service"; 


const Post = (props) => (

  <div className="card" style={{ display: 'block'}}>
    <div className="card-body">
      <h5>{props.post.user.username}</h5>
        <cite>{format(parseISO(props.post.dateposted), "MM/dd/yyyy hh:mm aaaaa'm'")}</cite>
        <br/>
        <br/>
      <p className="card-text">{props.post.post_content}</p>
      <div className="row">
        <div style={{ margin: 'auto'}} className="col"><p>{props.post.likes} Likes</p></div>
        <div className="col"><a href="#" className="btn btn-primary float-end">Like</a></div>
      </div>
      
    </div>
  </div>
 );


export default function Posts() {
  
  const [posts, setPosts] = useState([]);
  
  // This method fetches the records from the database.
  useEffect(() => {

    // const getPosts = async e => {
    //   e.preventDefault();

    //   const token = await AuthService.login(username,password);

    //   // validate token // display error message (setMessage)

    //   AuthService.setToken(token);
    //   //setIsLoading(false)
    // }

    async function getPosts() {
      const posts = await PostService.getPosts();
  
      // check for errors // display errors
        
      setPosts(posts);
    }
  
    getPosts();  
    return;

  }, [posts.length]);


  
  // // This method will delete a record
  // async function deleteRecord(id) {
  //   await fetch(`http://localhost:5000/${id}`, {
  //     method: "DELETE"
  //   });
  
  //   const newRecords = records.filter((el) => el._id !== id);
  //   setRecords(newRecords);
  // }
  
  // This method will map out the records on the table
  function postsList() {
    return posts.map((post) => {
      return (
        <Post
          post={post}
          //deleteRecord={() => deleteRecord(record._id)}
          key={post._id}
        />
      );
    });
  }
  
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div className="col">
        <div className="card-container">
          {postsList()}
        </div>
      </div>
    </div>
  );
 }