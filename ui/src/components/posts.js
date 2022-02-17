import React, { useEffect, useState } from "react";
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
        <div style={{ margin: 'auto'}} className="col"><p>{props.post.likeCount} Likes</p></div>
        <div className="col">
          <a className="btn btn-primary float-end"
            onClick={() => {props.likePost(props.post._id);}}>Like</a>
        </div>
      </div>      
    </div>
  </div>
 );


export default function Posts() {
  
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {

    async function getPosts() {
      var posts = await PostService.getPosts();
  
      // check for errors // display errors
        
      setPosts(posts);
    }
  
    getPosts();  
    return;

  }, [posts.length]);


  
  
  async function likePost(id) {
    var res = await PostService.likePost(id)

    if (res.error) { console.log(res.error); }

    // check for errors // display errors
  
    var posts = await PostService.getPosts();
    
    // check for errors // display errors

    setPosts(posts);
  }
  
  // map posts 
  function postsList() {
    return posts.map((post) => {
      return (
        <Post
          post={post}
          likePost={() => likePost(post._id)}
          key={post._id}
        />
      );
    });
  }
  
  // container for posts page
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