import { useState, useRef, useEffect, useReducer } from "react";
import{db} from "./firebaseinit";
import { collection,doc, addDoc,getDocs,onSnapshot,deleteDoc } from "firebase/firestore"; 

import React from "react";

function blogsReducer(state, action) {

//depending upon what type of action is getting performed we are going to return the next state, if it is (ADD) then we are going to return the next state which will add the blogs to blogs[] and same for remove

//action is coming from dispatch function

switch(action.type){
  case "ADD":
    return [action.blog,...state];//returning an array 
    //if type is coming from action then return will also come from action, here state is blogs(...rest operator on state) , whatevere there is in the state (i.e old value) that will also get added 

    case "REMOVE":

    return state.filter((blog,index)=>index!==action.index);

    default:
      return [];
}
}

export default function Blog() {
  // we can also assign an object to a state

  const [formData, setFormData] = useState({ title: "", content: "" });

  const titleRef = useRef(null);

  function initialFocus() {
    titleRef.current.focus();
  }

  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");---->now we are using const[formData,setFormData]=useState({title:"",content:""});

   const [blogs, setBlogs] = useState([]);// ------>*************
  //c below  👇👇👇👇👇👇

  ///since the above state object blogs is being used alot of times by event handlers like onClick onSubmit Add and delete therefore to organise it i am commenting it out and am using useReducer()
  //c below  👇👇👇
  //const [blogs, dispatch] = useReducer(blogsReducer, []); //reducerfucn,intialArg(empty array )

  useEffect(() => initialFocus(), []);

  //setting up title
  useEffect(() => {
    if (blogs.length && blogs[0].title !== "") {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blogs!!";
    }
  }, [blogs]);




//for firbase render

useEffect(()=>{

  ///using getDocs()
//   async function fetchData(){
// const snapShot=await getDocs(collection(db,"blogs"));//returns a subarray-->all documents 
// //inside snapshots we have docs which contails array of data 
// const blogs=snapShot.docs.map((doc)=>{
//   return {
//     id:doc.id,
//     ...doc.data()
//     //everything except id ... doc.data()-->blogs , blogs (id + data)
//   }
// })
// console.log(blogs);
// //now we have everything in blogs that we neeed
// setBlogs(blogs);

//   }
// fetchData();


// Now using snapShot method 👇👇👇
const unsub=onSnapshot(collection(db,"blogs"),(snapshot)=>{

  const blogs=snapshot.docs.map((doc)=>{

    return{
id:doc.id,
...doc.data()

    }
  })
  console.log(blogs);
  setBlogs(blogs);


})



},[]);/// intial render 





  //   populating it with empty array --> on submiting , it stores title and content of the blog

  // Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e) {
    e.preventDefault();


    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);-->using unsub

    
// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "blogs"), {
  title: formData.title,//data which you want to pass on to the data
  content: formData.content,
  createdOn:new Date()
});
console.log("Document written with ID: ", docRef.id);



setFormData({ title: "", content: "" });


 



    // setBlogs({title,content});
    // this above is wrong because-->we are setting blog to object and setBlog is array ...see below

    // setBlogs([{ title, content }, ...blogs]);

    ///reducer function dont require setBlogs anymore ....

    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]); it's alternative is dispatch C below
    // 👇👇
    //dispatch({type:"ADD",blog:{title: formData.title, content: formData.content}});///what we want to add inside key called blog(rand key)

    //    setTitle("");
    //    setContent("");
    setFormData({ title: "", content: "" });

    titleRef.current.focus();
    //above approach is using rest operator
    console.log(blogs);
  }

  async function removeBlog(i) {
     //setBlogs(blogs.filter((blog, index) => i !== index));// 👇
    //dispatch({type:"REMOVE",index:i});

    const docRef=doc(db,"blogs",i);
    await deleteDoc(docRef);
    // learn --> why async



    titleRef.current.focus();
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
              //   earlier we were just assigning string to title i.e setTitle(e.target.value) but now since setFormData contains object therefore we have to do {title: e.target.value(value fetched on submiting )}
              ref={titleRef}
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              required
              className="input content"
              placeholder="Content of the Blog goes here.."
              //   value={content}
              //   onChange={(e) => setContent(e.target.value)}
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />
      <h2>Blogs</h2>
      {/* Section where submitted blogs will be displayed */}

      {/* <h3>{title}</h3>
      <div>---------------------->old method 
        <p>{content}</p>
  </div>*/}

      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <div className="blog-btn">
            <button onClick={() => removeBlog(blog.id)} className="btn remove">
              {/* earlier blog.id was i (index number ) */}
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
