import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from './navigateRouteFn';
import cover from './coverImage.jpeg'
const Books = () => {
  const [books, setBooks] = useState([]);
  const { navigateTo } = useNavigation();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('https://backendbookdb.onrender.com/books');
        console.log(res.data)
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete("https://backendbookdb.onrender.com/books/" + id);
      window.location.reload()
    } catch (error) {console.log(error)}
  };

  return (
    <div>
      <h1>BOOK STORE DATABASE</h1>
      <div className="books">
        {books.map((book) => {
          return (
            <div key={book.id} className="book">
              {book.cover && <img src={cover} alt="" />}
              <h2>{book.title}</h2>
              <p>{book.descrpt}</p>
              <span>Rs.{book.price}/-</span>
              <button className="delete" onClick={()=>handleDelete(book.id)}>
                Delete
              </button>
              <button className="update" onClick={()=>navigateTo(`/update/${book.id}`)}>Update</button>
            </div>
          );
        })}
      </div>
      <button onClick={() => navigateTo('/add')}>Add new book</button>
    </div>
  );
};

export default Books;
