import {useState} from 'react';
import axios from 'axios';

const BookStoreControlsContainer = (props) => {

    //const {todoLists} = props;

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('test');
    const [price, setPrice] = useState('test');
    const [books, setBooks] = useState([]);

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    }

    const handleAuthorChange = (event) => {
      setAuthor(event.target.value);
    }

    const handlePriceChange = (event) => {
      setPrice(event.target.value);
    }

    const handleAddBtn = () => {
        const id = Math.floor(Math.random() * 100);
      axios.post('http://localhost:3001/books', 
      {title: title,
       author: author,
       price: price,
       id: id})
      .then(() => { 
          alert('success post') 
        })
      console.log(title);
      console.log(author);
      console.log(price);
    }

    const handleGetBtn = (event) => {
        axios.get("http://localhost:3001/books")
      .then((response) => {
          //console.log(response);
          setBooks(response.data);
      })
    }

    const handleDeleteBtn = (event) => {
      console.log(event.target.id);
      axios.delete(`http://localhost:3001/books`, 
      {data: {id: parseInt(event.target.id)}}).then(() => { alert('success delete') })
    }
  
    return (
      <div style={{border: '1px solid gray'}}>
        Add new book:
        <ul style={{listStyleType: 'none'}}>
          <li style={{marginTop: '5px'}}>Title: <input type='text' id='title' name='title' style={{width: '200px'}} onKeyUp={handleTitleChange} /></li>
          <li style={{marginTop: '5px'}}>Author: <input type='text' id='author' name='author' style={{width: '200px'}} onKeyUp={handleAuthorChange} /></li>
          <li style={{marginTop: '5px'}}>Price: <input type='text' id='price' name='price' style={{width: '50px'}} onKeyUp={handlePriceChange} /></li>
        </ul>

        <button onClick={handleGetBtn}>Get Books</button> &nbsp;
        <button onClick={handleAddBtn}>Add Book</button>

        {books.map(book => (
            <div key={book.id} style={{margin: 'auto', width: '700px', border: '1px solid gray'}}>
              Book name: {book.title} &nbsp;
              Author: {book.author} &nbsp;
              Price: {book.price} &nbsp;
              ID: {book.id} &nbsp;
              <a href='#' id={book.id} onClick={handleDeleteBtn}>Delete</a>
            </div>
        ))}
        
      </div>
    );
  };

  export default BookStoreControlsContainer;