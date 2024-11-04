import axios from "axios";
import { useState } from "react";
import { useNavigation } from "./navigateRouteFn";
import { useLocation } from "react-router-dom";

const Update = () => {
  const { navigateTo } = useNavigation();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2]
  const [book, setBook] = useState({
    title: '',
    descrpt: '',
    price: null,
    cover: '',
    
  })
  const handlechange = (e) => {
    setBook(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleClick = (e) => {
    
    try {
      axios.put('https://backendbookdb.onrender.com/books/'+bookId, book)
      navigateTo('/books')
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input type="text"  placeholder="title" onChange={handlechange} name="title" />
      <input type="text"  placeholder="descrpt" onChange={handlechange} name="descrpt"/>
      <input type="number"  placeholder="price" onChange={handlechange} name="price"/>
      <input type="text" placeholder="cover" onChange={handlechange} name="cover" />
      <button onClick={handleClick} >UPDATE</button>
    </div>
  )
};

export default Update;
