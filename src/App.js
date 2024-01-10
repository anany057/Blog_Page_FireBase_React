import React from "react";

import Blog from "./Components/Blog";

function App() {
  return (
    <>
      <Blog />
    </>
  );
}

export default App;


// const[blogs,setBlogs]=useState([]);
//handleOnSubmit=(e)=>{e.preventDefault(); setBlogs([{title,content}],...blogs)} , blogs.map((blog,i)=>(<div className="blog" key={i}> <h3>blogs.title<h3>))
