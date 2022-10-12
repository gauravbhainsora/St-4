import React, { useState, useEffect } from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('books');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  const [books, setbooks] = useState(getDatafromLS());

  // input field states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  // form submit event
  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    // creating an object
    let book = {
      title,
      author,
      isbn
    }
    setbooks([...books, book]);
    setTitle('');
    setAuthor('');
    setIsbn('');
  }

  // delete book from LS
  const deleteBook = (isbn) => {
    const filteredBooks = books.filter((element, index) => {
      return element.isbn !== isbn
    })
    setbooks(filteredBooks);
  }

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books])

  return (
    <div className='wrapper'>
      <h1>Ticket booking</h1>
      <p>Book your tickets online</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
            onSubmit={handleAddBookSubmit}>
            <label>Name</label>
            <input type="text" className='form-control' required
              onChange={(e) => setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Phone no.</label>
            <input type="text" className='form-control' required
              onChange={(e) => setAuthor(e.target.value)} value={author}></input>
            <br></br>
            <label>Train no.</label>
            <input type="text" className='form-control' required
              onChange={(e) => setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              Book Ticket
            </button>
          </form>
        </div>

        <div className='view-container'>
          {books.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Train no.</th>
                    <th>Name</th>
                    <th>Phone no.</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook} />
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
              onClick={() => setbooks([])}>Remove All</button>
          </>}
          {books.length < 1 && <div>No tickets booked yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
