import axios from "axios";
import { useState } from "react";
import { useNavigation } from "./navigateRouteFn";

const Add = () => {
  const { navigateTo } = useNavigation();
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
      axios.post('https://backendbookdb.onrender.com/books', book)
      navigateTo('/books')
      
    } catch (error) {
      console.log(error);
    }
  }
  console.log(book);
  return (
    <div className="form">
      <h1>Add new Book</h1>
      <input type="text"  placeholder="title" onChange={handlechange} name="title" />
      <input type="text"  placeholder="descrpt" onChange={handlechange} name="descrpt"/>
      <input type="number"  placeholder="price" onChange={handlechange} name="price"/>
      <input type="text" placeholder="cover" onChange={handlechange} name="cover" />
      <button onClick={handleClick} >ADD</button>
    </div>
  )
};

export default Add;
