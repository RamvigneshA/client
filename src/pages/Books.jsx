import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from './navigateRouteFn';
import { PulseLoader } from 'react-spinners';
import cover from './coverImage.jpeg';
const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo } = useNavigation();
  useEffect(() => {
    const fetchAllBooks = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('https://backendbookdb.onrender.com/books');
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading indicator to false after fetching data
      }
    };
    fetchAllBooks();
  }, []);
  const handleDelete = async (id) => {
    try {
      // Optimistic update: Remove the book from the local state immediately
      setBooks(books.filter((book) => book.id !== id));

      // Send the delete request to the server
      await axios.delete(`https://backendbookdb.onrender.com/books/${id}`);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display an error message or revert the optimistic update
      // setBooks(prevBooks => [...prevBooks, { id, ...book }]); // Revert the deletion
    }
  };

  return (
    <div>
      <h1>BOOK STORE DATABASE</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <PulseLoader color="#36D7B7" size={15} loading={isLoading} />
        </div>
      ) : (
        <>
          <div className="books">
            {books.map((book) => {
              return (
                <div key={book.id} className="book">
                  {book.cover && <img src={cover} alt="" />}
                  <h2>{book.title}</h2>
                  <p>{book.descrpt}</p>
                  <span>Rs.{book.price}/-</span>
                  <button
                    className="delete"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update"
                    onClick={() => navigateTo(`/update/${book.id}`)}
                  >
                    Update
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigateTo('/add')}>Add new book</button>
        </>
      )}
    </div>
  );
};

export default Books;
