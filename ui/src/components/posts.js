import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import PostService from "../services/post.service"; 


const Post = (props) => (
  <tr>
      <td>{props.post.postid}</td>
      <td>{props.post.dateposted}</td>
      <td>{props.post.post_content}</td>            
      <td>
        <button className="btn btn-link">Like</button>
      </td>
  </tr>
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
      <h3>Post List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Date</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{postsList()}</tbody>
      </table>
    </div>
  );
 }