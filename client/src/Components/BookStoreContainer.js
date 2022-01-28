import Book from './BookStoreContainer.js';

const BookStoreContainer = (props) => {

    const {books} = props;
    console.log(books);
  
    return (
      <div>
          {typeof books !== 'undefined' &&
          <span>Books:</span>}
        <div className='BookStoreContainer'>
          {typeof books !== 'undefined' && books.length > 0 && books.map(book => (  
            <Book data={book} key={book.id}></Book>
          ))}
        </div>
      </div>
    );
  };

  export default BookStoreContainer;